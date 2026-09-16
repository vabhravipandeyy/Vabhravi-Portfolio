import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDLoaderAnimationProps {
  progress: number;
}

export default function ThreeDLoaderAnimation({ progress }: ThreeDLoaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 2. Renderer Setup with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Custom Glowing Particle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.2, "rgba(0,229,255,0.8)");
        grad.addColorStop(0.5, "rgba(255,75,0,0.3)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };
    const particleTexture = createCircleTexture();

    // 4. Generate Neural Lattice Nodes
    const nodeCount = 120;
    const maxDistance = 1.7;
    const maxConnections = 600;

    const nodes: {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      color: THREE.Color;
      targetColor: THREE.Color;
      size: number;
    }[] = [];

    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const baseCyan = new THREE.Color("#00E5FF");
    const scanOrange = new THREE.Color("#FF4B00");

    for (let i = 0; i < nodeCount; i++) {
      // Position inside a spherical boundary
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.8; // sphere radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      
      // Slow drift velocity
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      );

      nodes.push({
        pos,
        vel,
        color: baseCyan.clone(),
        targetColor: baseCyan.clone(),
        size: 0.1,
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = baseCyan.r;
      colors[i * 3 + 1] = baseCyan.g;
      colors[i * 3 + 2] = baseCyan.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodeSystem = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodeSystem);

    // 5. Connecting Lines Geometry & Material
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // 6. Floating Starfield Dust background
    const dustCount = 80;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustSystem = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustSystem);

    // 7. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentProgress = progressRef.current;
      const speedMultiplier = 1 + (currentProgress / 100) * 1.5;

      // Scanning line going vertically through the network
      const scanY = Math.sin(elapsedTime * 1.2) * 3.2;

      // Update Node positions & scan color transition
      const nodePosAttr = nodeGeometry.attributes.position;
      const nodeColAttr = nodeGeometry.attributes.color;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        
        // Dynamic drift
        node.pos.addScaledVector(node.vel, speedMultiplier);

        // Boundary check (keep inside sphere)
        if (node.pos.length() > 3.0) {
          node.vel.negate();
        }

        // Write positions back
        nodePosAttr.setXYZ(i, node.pos.x, node.pos.y, node.pos.z);

        // Distance from scanning plane decides the color
        const distFromScan = Math.abs(node.pos.y - scanY);
        if (distFromScan < 0.5) {
          // Glow orange
          node.targetColor.copy(scanOrange);
        } else {
          // Fade back to cyan
          node.targetColor.copy(baseCyan);
        }

        // Interpolate colors smoothly
        node.color.lerp(node.targetColor, 0.08);
        nodeColAttr.setXYZ(i, node.color.r, node.color.g, node.color.b);
      }
      
      nodePosAttr.needsUpdate = true;
      nodeColAttr.needsUpdate = true;

      // Calculate connections & connect lines dynamically
      const linePosAttr = lineGeometry.attributes.position;
      const lineColAttr = lineGeometry.attributes.color;
      let lineIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (lineIndex >= maxConnections) break;

          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = n1.pos.distanceTo(n2.pos);

          if (dist < maxDistance) {
            // Draw connection line
            linePosAttr.setXYZ(lineIndex * 2, n1.pos.x, n1.pos.y, n1.pos.z);
            linePosAttr.setXYZ(lineIndex * 2 + 1, n2.pos.x, n2.pos.y, n2.pos.z);

            // Line opacity based on distance
            const alpha = (1.0 - dist / maxDistance) * 0.4;
            
            // Mix line color based on node colors
            const col1 = n1.color.clone().multiplyScalar(alpha);
            const col2 = n2.color.clone().multiplyScalar(alpha);

            lineColAttr.setXYZ(lineIndex * 2, col1.r, col1.g, col1.b);
            lineColAttr.setXYZ(lineIndex * 2 + 1, col2.r, col2.g, col2.b);

            lineIndex++;
          }
        }
      }

      // Fill remaining line buffers with zero to hide them
      for (let i = lineIndex; i < maxConnections; i++) {
        linePosAttr.setXYZ(i * 2, 0, 0, 0);
        linePosAttr.setXYZ(i * 2 + 1, 0, 0, 0);
        lineColAttr.setXYZ(i * 2, 0, 0, 0);
        lineColAttr.setXYZ(i * 2 + 1, 0, 0, 0);
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      // Rotate the entire group scene slowly
      nodeSystem.rotation.y = elapsedTime * 0.05;
      nodeSystem.rotation.x = elapsedTime * 0.02;
      lineSystem.rotation.y = elapsedTime * 0.05;
      lineSystem.rotation.x = elapsedTime * 0.02;

      // Rotate dust starfield
      dustSystem.rotation.y = -elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
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
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      particleTexture.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1.0 }}
    />
  );
}
