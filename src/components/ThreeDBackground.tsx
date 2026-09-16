import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Custom Glowing Particle Texture
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.2, "rgba(0,229,255,0.85)"); // Cyan core
        grad.addColorStop(0.5, "rgba(255,75,0,0.4)");   // Orange glow
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };
    const particleTexture = createParticleTexture();

    // 4. Generate DNA-like Bulging Helical Strands (4 interwoven strands)
    const strandCount = 4;
    const pointsPerStrand = 120;
    const strandsGeometries: THREE.BufferGeometry[] = [];
    const strandsLines: THREE.Line[] = [];

    const strandColors = [
      new THREE.Color("#FF4B00"), // Orange
      new THREE.Color("#00E5FF"), // Cyan
      new THREE.Color("#4F46E5"), // Indigo
      new THREE.Color("#FFB300"), // Gold
    ];

    // Compute coordinate points for 3D helical spirals (bulging profile)
    // twistFactor controls winding tightness (can be animated on scroll!)
    const getHelixCoords = (t: number, strandIdx: number, elapsed: number, twistFactor = 5.0) => {
      const angleOffset = (strandIdx * Math.PI * 2) / strandCount;
      const angle = t * Math.PI * twistFactor + angleOffset + elapsed * 0.15;
      
      // Hourglass bulge radius profile
      const bulge = Math.sin(t * Math.PI); // 0 at ends, 1 in middle
      const radius = 1.8 + bulge * 2.4; 

      const x = Math.cos(angle) * radius;
      const y = (t - 0.5) * 15; // height spans -7.5 to 7.5
      const z = Math.sin(angle) * radius;
      return new THREE.Vector3(x, y, z);
    };

    for (let s = 0; s < strandCount; s++) {
      const points = [];
      for (let i = 0; i < pointsPerStrand; i++) {
        const t = i / (pointsPerStrand - 1);
        points.push(getHelixCoords(t, s, 0));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: strandColors[s],
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geom, mat);
      scene.add(line);
      strandsGeometries.push(geom);
      strandsLines.push(line);
    }

    // 5. Outer Gyroscope Rings (Giant rotating blueprint cages surrounding the reactor)
    const gyroCount = 2;
    const gyros: THREE.LineLoop[] = [];
    const gyroColors = [0x00E5FF, 0xFF4B00];
    const gyroRadius = 8.5;

    for (let i = 0; i < gyroCount; i++) {
      const points = [];
      const segments = 90;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * gyroRadius, Math.sin(theta) * gyroRadius, 0));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: gyroColors[i],
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
      });
      const loop = new THREE.LineLoop(geom, mat);
      scene.add(loop);
      gyros.push(loop);
    }

    // Tilt outer gyros into perpendicular orientations
    gyros[0].rotation.y = Math.PI / 4;
    gyros[1].rotation.x = Math.PI / 4;

    // 6. Horizontal Scanning Blueprint Rings
    const ringCount = 3;
    const rings: THREE.LineLoop[] = [];
    const ringYPositions = [-3.5, 0, 3.5];
    const ringRadii = [2.8, 4.2, 2.8];

    for (let i = 0; i < ringCount; i++) {
      const points = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * ringRadii[i], 0, Math.sin(theta) * ringRadii[i]));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x00E5FF : 0xFF4B00,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });
      const ringLoop = new THREE.LineLoop(ringGeom, ringMat);
      ringLoop.position.y = ringYPositions[i];
      scene.add(ringLoop);
      rings.push(ringLoop);
    }

    // 7. Dual-Layer Flow Particles (Active lead nodes + trailing dust nodes)
    const particleCount = 440;
    const particlesData: {
      strandIdx: number;
      t: number; // progress (0 to 1)
      speed: number;
      size: number;
      isLead: boolean;
    }[] = [];

    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const strandIdx = i % strandCount;
      const t = Math.random();
      
      // Alternating leads and tails
      const isLead = i % 3 === 0;
      const speed = isLead 
        ? 0.0018 + Math.random() * 0.0015  // Lead moves faster
        : 0.0009 + Math.random() * 0.0012; // Tail drifts slower
      const size = isLead 
        ? 0.14 + Math.random() * 0.08  // Lead is larger
        : 0.05 + Math.random() * 0.05; // Tail is smaller

      particlesData.push({ strandIdx, t, speed, size, isLead });

      const pos = getHelixCoords(t, strandIdx, 0);
      particlePositions[i * 3] = pos.x;
      particlePositions[i * 3 + 1] = pos.y;
      particlePositions[i * 3 + 2] = pos.z;

      const col = strandColors[strandIdx].clone();
      if (!isLead) {
        col.multiplyScalar(0.4); // Dim the tails
      }

      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 8. Global Proximity Laser Web Geometry & Material
    const maxConnections = 150;
    const connectPositions = new Float32Array(maxConnections * 2 * 3);
    const connectColors = new Float32Array(maxConnections * 2 * 3);

    const connectGeometry = new THREE.BufferGeometry();
    connectGeometry.setAttribute("position", new THREE.BufferAttribute(connectPositions, 3));
    connectGeometry.setAttribute("color", new THREE.BufferAttribute(connectColors, 3));

    const connectMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const connectSystem = new THREE.LineSegments(connectGeometry, connectMaterial);
    scene.add(connectSystem);

    // 9. Floating Starfield Dust background
    const dustCount = 60;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustSystem = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustSystem);

    // 10. Interaction States
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let scrollY = 0;
    let targetScrollSpeed = 0;
    let currentScrollSpeed = 0;
    let lastScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      const diff = Math.abs(scrollY - lastScrollY);
      targetScrollSpeed = diff * 0.12;
      lastScrollY = scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 11. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll acceleration decay
      currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * 0.1;
      targetScrollSpeed *= 0.9;

      // Parallax Camera rotation
      targetCameraX = mouseX * 3.5;
      targetCameraY = mouseY * 2.5;

      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.position.z = 16 - scrollY * 0.0012;
      camera.lookAt(0, 0, 0);

      // Winding tightness factor (helix coils tighter as user scrolls down!)
      const twistFactor = 5.0 + Math.min(scrollY * 0.0015, 3.5);

      // Re-calculate helix guide paths
      for (let s = 0; s < strandCount; s++) {
        const geom = strandsGeometries[s];
        const posAttr = geom.attributes.position;
        for (let i = 0; i < pointsPerStrand; i++) {
          const t = i / (pointsPerStrand - 1);
          const pos = getHelixCoords(t, s, elapsedTime, twistFactor);
          
          // Apply mouse deflection warp
          const dx = pos.x - mouseX * 4;
          const dz = pos.z - mouseY * 4;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 3) {
            const push = (3 - dist) * 0.25;
            pos.x += Math.cos(elapsedTime * 2) * push;
            pos.z += Math.sin(elapsedTime * 2) * push;
          }
          posAttr.setXYZ(i, pos.x, pos.y, pos.z);
        }
        posAttr.needsUpdate = true;
      }

      // Update flow particles positions
      const partPosAttr = particleGeometry.attributes.position;
      const partArr = partPosAttr.array as Float32Array;

      const activePositions: THREE.Vector3[] = [];

      for (let i = 0; i < particleCount; i++) {
        const data = particlesData[i];
        
        // Progress speed updates
        data.t += data.speed * (1.0 + currentScrollSpeed * 2.0);
        if (data.t > 1.0) {
          data.t = 0;
        }

        const pos = getHelixCoords(data.t, data.strandIdx, elapsedTime, twistFactor);

        // Magnetic Whirlpool Attractor near Mouse
        const dx = pos.x - mouseX * 6;
        const dz = pos.z - mouseY * 4;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 4.0) {
          const vortexStrength = (4.0 - dist) * 0.35;
          const rx = pos.x - mouseX * 6;
          const rz = pos.z - mouseY * 4;
          pos.x = mouseX * 6 + rx * Math.cos(vortexStrength) - rz * Math.sin(vortexStrength);
          pos.z = mouseY * 4 + rx * Math.sin(vortexStrength) + rz * Math.cos(vortexStrength);
        }

        partArr[i * 3] = pos.x;
        partArr[i * 3 + 1] = pos.y;
        partArr[i * 3 + 2] = pos.z;

        activePositions.push(pos);
      }
      partPosAttr.needsUpdate = true;

      // Dynamic Connective Lasers
      const connPosAttr = connectGeometry.attributes.position;
      const connColAttr = connectGeometry.attributes.color;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i += 3) {
        if (lineIndex >= maxConnections) break;

        const p1 = activePositions[i];
        const nextIdx = (i + 1) % particleCount;
        const p2 = activePositions[nextIdx];
        
        const dist = p1.distanceTo(p2);

        if (dist < 2.8) {
          connPosAttr.setXYZ(lineIndex * 2, p1.x, p1.y, p1.z);
          connPosAttr.setXYZ(lineIndex * 2 + 1, p2.x, p2.y, p2.z);

          const alpha = (1.0 - dist / 2.8) * 0.22;

          const col1 = strandColors[particlesData[i].strandIdx].clone().multiplyScalar(alpha);
          const col2 = strandColors[particlesData[nextIdx].strandIdx].clone().multiplyScalar(alpha);

          connColAttr.setXYZ(lineIndex * 2, col1.r, col1.g, col1.b);
          connColAttr.setXYZ(lineIndex * 2 + 1, col2.r, col2.g, col2.b);

          lineIndex++;
        }
      }

      // Hide unused segments
      for (let i = lineIndex; i < maxConnections; i++) {
        connPosAttr.setXYZ(i * 2, 0, 0, 0);
        connPosAttr.setXYZ(i * 2 + 1, 0, 0, 0);
        connColAttr.setXYZ(i * 2, 0, 0, 0);
        connColAttr.setXYZ(i * 2 + 1, 0, 0, 0);
      }

      connPosAttr.needsUpdate = true;
      connColAttr.needsUpdate = true;

      // Spin horizontal blueprint rings
      rings.forEach((ring, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        ring.rotation.y = elapsedTime * 0.25 * dir;
      });

      // Spin outer Gyroscope cages
      gyros[0].rotation.y = elapsedTime * 0.08;
      gyros[0].rotation.z = elapsedTime * 0.04;
      gyros[1].rotation.x = -elapsedTime * 0.06;
      gyros[1].rotation.y = elapsedTime * 0.03;

      // Spin entire particle system
      const baseRotation = 0.05 + currentScrollSpeed * 0.25;
      for (let s = 0; s < strandCount; s++) {
        strandsLines[s].rotation.y = elapsedTime * baseRotation;
      }
      particleSystem.rotation.y = elapsedTime * baseRotation;
      connectSystem.rotation.y = elapsedTime * baseRotation;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      strandsGeometries.forEach((geom) => geom.dispose());
      strandsLines.forEach((line) => {
        (line.material as THREE.Material).dispose();
      });
      gyros.forEach((gyro) => {
        gyro.geometry.dispose();
        (gyro.material as THREE.Material).dispose();
      });
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      particleGeometry.dispose();
      particleTexture.dispose();
      particleMaterial.dispose();
      connectGeometry.dispose();
      connectMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#03050c]"
    />
  );
}
