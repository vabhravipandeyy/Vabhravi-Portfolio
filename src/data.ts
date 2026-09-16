import { Project, Experience, Certificate, SkillCategory, Education } from "./types";
import vabhravi1 from "../assets/Photos/vabhravi1.jpg";
import vabhravi2 from "../assets/Photos/vabhravi2.jpg";

export const personalInfo = {
  name: "VABHRAVI PANDEY",
  shortName: "Vabhravi P",
  role: "AI / ML ENGINEER & FULL STACK DEVELOPER",
  tagline: "Building intelligent AI applications, RAG pipelines, and scalable backend services.",
  bio: "Hi, I'm Vabhravi Pandey, an AI/ML undergraduate with hands-on experience building full-stack AI applications, RAG pipelines, and scalable backend services. I am currently pursuing a Bachelor's degree in Computer Science and Engineering (specializing in AI & ML) at DIT University. Over the years, I've honed my skills in Python, Generative AI, React.js, FastAPI, and Node.js to engineer dynamic, high-performance systems. I aim to solve complex real-world problems with intelligent, secure, and highly polished digital solutions.",
  email: "vabhravipandeyy@gmail.com",
  web3formsKey: "", // Paste your Web3Forms access key here to receive emails directly (https://web3forms.com)
  googleSheetUrl: "", // Paste your Google App Script Web App URL here to save to Google Sheets
  phone: "+91 7250340347",
  location: "Dehradun / Patna, India",
  resumeUrl: "/Vabhravi_Pandey_Resume.pdf",
  avatarUrl: vabhravi2, // Sitting portrait
  laptopUrl: vabhravi1, // Standing portrait
  socials: {
    github: "https://github.com/vabhravipandeyy",
    linkedin: "https://linkedin.com/in/vabhravi-pandey",
    leetcode: "https://github.com/vabhravipandeyy"
  }
};

export const educationList: Education[] = [
  {
    institution: "DIT University",
    degree: "B.Tech Computer Science and Engineering (AI & ML)",
    dateRange: "2023 - 2027",
    location: "Dehradun, India",
    grade: "Specialization: AI & ML",
    details: "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Machine Learning."
  },
  {
    institution: "Notre Dame Academy",
    degree: "High School Diploma",
    dateRange: "2010 - 2022",
    location: "Patna, India",
    grade: "Class 10th & 12th",
    details: "Core subjects: Mathematics, Computer Science, Physics, Chemistry."
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Software Developer Intern",
    company: "Goods and Services Tax Network (GSTN)",
    dateRange: "Jun 2026 - Jul 2026",
    location: "New Delhi, India",
    category: "Software Internship",
    description: "Engineered a fraud-detection system cross-referencing E-Way Bill and FASTag toll transaction data, built on a FastAPI/SQLAlchemy backend with a React and Leaflet dashboard.",
    achievements: [
      "Engineered fraud-detection system cross-referencing E-Way Bill and FASTag toll telemetry with FastAPI/SQLAlchemy backend and React/Leaflet dashboard to visualize vehicle trip routes and toll checkpoints.",
      "Designed a rule-based risk-scoring engine using geospatial calculations (haversine distance, bearing/direction analysis) to detect duplicate e-way bills, impossible average speeds, and route mismatches, classifying vehicles into LOW/MEDIUM/HIGH risk tiers.",
      "Built an internal IT asset management platform (InvenTrack) with React/TypeScript frontend and Express/MongoDB backend, designing database schema, REST API, and JWT-based authentication flow."
    ]
  },
  {
    id: "exp-2",
    title: "Content Head",
    company: "Cyber Gaming Coding Club",
    dateRange: "2025 - Present",
    location: "DIT University, Dehradun",
    category: "Leadership",
    description: "Spearheading technical content creation, organizing hackathons, and leading developer community initiatives.",
    achievements: [
      "Organized national-level Hackathon with 40+ participating teams.",
      "Curated technical content and coding challenges for university-wide tech sessions."
    ]
  },
  {
    id: "exp-3",
    title: "Event Coordinator",
    company: "Youthopia College Fest",
    dateRange: "2025 - 2026",
    location: "DIT University, Dehradun",
    category: "Event Management",
    description: "Managed logistics and technical execution for university flagship events.",
    achievements: [
      "Coordinated 'RoboSoccer' event and technical logistics for campus festival.",
      "Managed venue operations, schedule execution, and hardware allocation."
    ]
  },
  {
    id: "exp-4",
    title: "Content Writer",
    company: "Editorial Board",
    dateRange: "2024 - 2026",
    location: "DIT University, Dehradun",
    category: "Editorial & Media",
    description: "Authored technical articles and reports for university publications.",
    achievements: [
      "Authored articles and official reports for university publications.",
      "Covered emerging AI trends, software engineering topics, and tech events."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "GST Risk Manager",
    subtitle: "Real-Time Fraud Detection & Compliance Platform",
    date: "Aug 2026",
    description: "Architected a real-time GST fraud detection platform integrating FastAPI, React 19, and MySQL to cross-validate E-Way bill declarations against live FASTag RFID toll telemetry, slashing manual tax audit time by 65%.",
    techStack: ["Python", "FastAPI", "React 19", "Isolation Forest", "XGBoost", "RAG", "MySQL", "Docker", "CBIC Statutes Pipeline"],
    achievements: [
      { label: "Audit Time", value: "65% ↓" },
      { label: "Anomaly Accuracy", value: "55% ↑" },
      { label: "Risk Engine Rules", value: "70% + ML" }
    ],
    features: [
      "Architected real-time GST fraud detection platform cross-validating E-Way bill declarations against live FASTag RFID toll telemetry.",
      "Engineered hybrid risk engine combining deterministic compliance rules (70%) with unsupervised Isolation Forest and XGBoost across 14 telemetry features.",
      "Developed AI Risk Copilot leveraging RAG vector pipeline over CBIC tax statutes for automated evidence dockets and case briefs."
    ],
    github: "https://github.com/vabhravipandeyy",
    live: "https://gst-bice-one.vercel.app/login",
    category: "AI Tax Fraud Platform"
  },
  {
    id: "proj-2",
    title: "ClinSight AI",
    subtitle: "Multi-Agent Clinical Intelligence System",
    date: "Mar 2026",
    description: "Designed a multi-agent clinical system to process patient case sheets and generate 60-second pre-consultation briefs, reducing manual review time by 70%.",
    techStack: ["Python", "RAG", "FAISS", "Sentence Transformers", "Next.js", "Flutter"],
    achievements: [
      { label: "Review Time", value: "70% ↓" },
      { label: "Decision Efficiency", value: "60% ↑" },
      { label: "Pre-Consult Brief", value: "<60s" }
    ],
    features: [
      "Multi-agent clinical system to process patient case sheets and generate 60-second pre-consultation briefs.",
      "RAG-based FAISS pipeline with Sentence Transformers for semantic search and clinical insights.",
      "Cross-platform Next.js & Flutter dashboards for clinical decision-support efficiency."
    ],
    github: "https://github.com/vabhravipandeyy",
    live: "https://clinsightai.vercel.app/",
    category: "AI Healthcare Platform"
  },
  {
    id: "proj-3",
    title: "Revia",
    subtitle: "AI Companion & Persona Platform",
    date: "Jul 2026",
    description: "Architected an AI companion platform using LLMs, RAG, and a fully serverless AWS architecture (Lambda, API Gateway, DynamoDB, Cognito), supporting 12+ AI personas and real-time conversations.",
    techStack: ["React.js", "AWS Lambda", "DynamoDB", "Amazon Cognito", "RAG", "Node.js"],
    achievements: [
      { label: "Consistency", value: "65% ↑" },
      { label: "AI Personas", value: "12+ Personas" },
      { label: "Architecture", value: "Serverless AWS" }
    ],
    features: [
      "Fully serverless AWS architecture (Lambda, API Gateway, DynamoDB, Cognito) supporting 12+ AI personas.",
      "Real-time AI conversation engine with LLMs, RAG, multi-agent orchestration, and long-term memory.",
      "Improved conversational consistency by 65% enabling human-like interactive messaging."
    ],
    github: "https://github.com/vabhravipandeyy",
    live: "https://revia-nine.vercel.app/login",
    category: "AI Companion Platform"
  },
  {
    id: "proj-4",
    title: "InvenTrack",
    subtitle: "Internal IT Asset Management Platform",
    date: "Jul 2026",
    description: "Built an internal IT asset management platform with a React/TypeScript frontend and Express/MongoDB backend, designing the database schema, REST API, and JWT-based authentication flow.",
    techStack: ["React.js", "TypeScript", "Express.js", "MongoDB", "Node.js", "JWT"],
    achievements: [
      { label: "Auth Flow", value: "JWT Secured" },
      { label: "Asset Tracking", value: "Real-Time" },
      { label: "API Design", value: "RESTful" }
    ],
    features: [
      "React/TypeScript frontend with responsive asset management dashboards.",
      "Express/MongoDB backend with JWT authentication and secure database schema.",
      "Comprehensive tracking of company hardware, assignment history, and asset allocation."
    ],
    github: "https://github.com/vabhravipandeyy",
    live: "https://github.com/vabhravipandeyy",
    category: "Full Stack Platform"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Generative AI & Machine Learning",
    description: "Building intelligent systems with LLMs, RAG pipelines, and multi-agent frameworks.",
    items: [
      { name: "Python", mastery: 95, description: "Advanced ML scripting, data pipelines & automation" },
      { name: "RAG & Vector DBs", mastery: 94, description: "FAISS, Sentence Transformers & Semantic Search" },
      { name: "Multi-Agent AI", mastery: 92, description: "Orchestration, Autonomous Reasoning & Copilots" },
      { name: "LLMs & Fine-Tuning", mastery: 90, description: "GPT-2 Fine-tuning, Prompt Engineering & Custom Guardrails" },
      { name: "ML Frameworks", mastery: 91, description: "TensorFlow, PyTorch, Keras, CNN & LSTM models" }
    ]
  },
  {
    category: "Full Stack & Web Architectures",
    description: "Crafting scalable backend microservices and modern frontend applications.",
    items: [
      { name: "React.js & HTML/CSS", mastery: 95, description: "React 19, responsive UI & modern component systems" },
      { name: "TypeScript & JavaScript", mastery: 92, description: "Type-safe ES6+ applications & full-stack development" },
      { name: "FastAPI & Python Backend", mastery: 94, description: "High-performance async APIs, SQLAlchemy & Geospatial engines" },
      { name: "Node.js & Express.js", mastery: 90, description: "Scalable REST APIs, middleware & JWT authentication" }
    ]
  },
  {
    category: "Databases & Data Engineering",
    description: "Managing structured & unstructured data with high throughput.",
    items: [
      { name: "SQL & Databases", mastery: 92, description: "MySQL, PostgreSQL, MongoDB & schema optimization" },
      { name: "Data Engineering", mastery: 88, description: "Apache Spark, PySpark, Delta Lake & Azure Data Factory" },
      { name: "Cloud & DevOps", mastery: 86, description: "AWS Lambda, DynamoDB, Cognito, Docker & Git" }
    ]
  }
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "AI Agent Studio & OCI AI Foundations",
    issuer: "Oracle",
    year: "2026",
    description: "Certified in Oracle Cloud Infrastructure AI Foundations and AI Agent Studio for Fusion Application Foundation.",
    badgeText: "Oracle Cert"
  },
  {
    id: "cert-2",
    title: "Building with Claude API",
    issuer: "Anthropic",
    year: "2026",
    description: "Specialized certification in engineering applications and multi-agent workflows using Claude API.",
    badgeText: "Anthropic"
  },
  {
    id: "cert-3",
    title: "AI Fluency: Framework and Foundation",
    issuer: "Anthropic",
    year: "2026",
    description: "Foundational and framework certification in AI fluency, prompt design, and generative system architecture.",
    badgeText: "Anthropic"
  },
  {
    id: "cert-4",
    title: "Generative AI Internship",
    issuer: "Prodigy InfoTech",
    year: "2026",
    description: "Completed hands-on internship in Generative AI development, fine-tuning models, and RAG pipelines.",
    badgeText: "Internship"
  },
  {
    id: "cert-5",
    title: "Data Analysis & Executive Data Science",
    issuer: "The Johns Hopkins University",
    year: "2025",
    description: "Executive certification covering data analysis pipelines, statistical modeling, and data science strategies.",
    badgeText: "JHU Cert"
  },
  {
    id: "cert-6",
    title: "Linux Fundamentals",
    issuer: "Coursera (Learn Quest)",
    year: "2025",
    description: "Comprehensive training in Linux system administration, shell scripting, and command line tools.",
    badgeText: "Linux Cert"
  },
  {
    id: "cert-7",
    title: "Database Management Essentials",
    issuer: "Coursera (University of Colorado)",
    year: "2025",
    description: "Mastery of relational database design, SQL querying, and database architecture.",
    badgeText: "Database"
  },
  {
    id: "cert-8",
    title: "Java Certification",
    issuer: "Learn Tube",
    year: "2024",
    description: "Professional certification in Object-Oriented Programming and Java development.",
    badgeText: "Java Cert"
  }
];
