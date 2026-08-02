export const profile = {
  name: "Ankit Dash",
  monogram: "AD",
  roles: [
    "AI Engineer",
    "ML Engineer",
  ],
  location: "Bhubaneswar, India",
  bio: "Final-year B.Tech CSE (DAML) student at CUTM Bhubaneswar. I build AI and ML systems end-to-end — from data and modeling through to production — and care about clean pipelines, honest evaluation, and inference that holds up under load.",
  email: "005ankitdash@gmail.com",
  phone: "+91 8480212936",
  github: "https://github.com/Ankit-builds1",
  linkedin: "https://www.linkedin.com/in/ankitdash-edu",
  resume: "/resume.pdf",
} as const;

export type Project = {
  title: string;
  emoji: string;
  blurb: string;
  details: string;
  tags: string[];
  href?: string;
  status?: "ongoing";
};

export const projects: Project[] = [
  {
    title: "Sleep Stage Detection & Clinical Report Generation",
    emoji: "🧠",
    blurb:
      "TCN pipeline classifying EEG sleep stages with 87% cross-dataset accuracy — with a critical 125Hz resampling bug fix that rescued accuracy from 47%.",
    details:
      "Trained a Temporal Convolutional Network on the SHHS1 dataset and cross-validated on unseen SHHS2 data. Fixed a critical resampling bug that lifted accuracy from 47% → 87%. Integrated Mistral 7B (4-bit NF4) to auto-generate 3-paragraph clinical sleep reports from model predictions.",
    tags: ["PyTorch", "TCN", "EEG", "Mistral 7B", "HuggingFace", "GenAI"],
    href: "https://github.com/ankit848-ai/sleep-quality-stage-detection",
  },
  {
    title: "Hierarchical Agentic Malware Classification",
    emoji: "🛡️",
    blurb:
      "3-stage agentic pipeline (RF + XGBoost → Decision Engine → ResNet-18 CNN) classifying 25 malware families with confidence-aware escalation.",
    details:
      "Stage-1 RF + XGBoost classifiers handle high-confidence cases; a meta-model decides escalation on a leak-free split; Stage-2 ResNet-18 CNN handles ambiguous inputs. 5-fold stratified cross-validation across all stages. Deployed behind a FastAPI inference endpoint.",
    tags: [
      "PyTorch",
      "ResNet-18",
      "XGBoost",
      "RandomForest",
      "FastAPI",
      "Cybersecurity",
    ],
    href: "https://github.com/ankit848-ai/hierarchical-agentic-malware-classification",
  },
  {
    title: "CyberWatch AI",
    emoji: "CW",
    blurb:
      "Local-first AI cybersecurity suite for detecting network intrusions, phishing URLs, malware families, harmful text, and zero-day anomalies without sending prediction data to the cloud.",
    details:
      "Combines XGBoost, LSTM, RF/XGBoost, 1D-CNN, BERT, Isolation Forest, and Autoencoder models with a CLI, Streamlit dashboard, FastAPI endpoints, and optional live packet monitoring through Scapy/Npcap.",
    tags: ["Python", "XGBoost", "PyTorch", "Transformers", "FastAPI", "Streamlit", "Cybersecurity"],
  },
  {
    title: "ShadowGuard AI",
    emoji: "SG",
    blurb:
      "Local-first AI safety workspace that inspects prompts and public GitHub repositories for secrets, PII, and prompt injection, then returns policy-guided allow, warn, or block decisions.",
    details:
      "Built with a Next.js frontend, FastAPI backend, SQLite persistence, and Chrome MV3 extension, with safe rewriting, repository scanning, privacy-risk tracking, and PDF audit reports.",
    tags: ["Next.js", "TypeScript", "FastAPI", "SQLite", "Chrome MV3", "Scikit-learn", "Cybersecurity"],
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  status?: "current" | "completed";
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Generative AI Engineer",
    org: "Infotact Solutions",
    period: "Aug 2026 – Present",
    status: "current",
    description:
      "Selected as an Associate L1 - Generative AI intern at Infotact Solutions, working on real-world Generative AI applications.",
  },
  {
    role: "AI/ML Intern",
    org: "Labmentix",
    period: "Jul 2026 – Present",
    status: "current",
    description: "Currently working as an AI/ML Intern at Labmentix.",
  },
  {
    role: "Agentic AI Engineer Intern",
    org: "ApexDevs",
    period: "May 2026 – Jul 2026",
    status: "completed",
    description:
      "Worked on real-world agentic AI projects and guided tasks in the Agentic AI Engineer domain, with daily updates and weekly milestone reports.",
  },
  {
    role: "Data Science Intern",
    org: "The Developers Arena",
    period: "May 2026 – Aug 2026",
    status: "completed",
    description:
      "Completing self-paced data science modules with real-world project development, weekly task submissions, and a structured curriculum with automated progress tracking.",
  },
  {
    role: "Machine Learning Intern",
    org: "EdiGlobe",
    period: "Jun 2025 – Jul 2025",
    status: "completed",
    description:
      "Designed end-to-end ML pipelines (preprocessing, feature engineering, model training); built time-series forecasting models evaluated on RMSE and ROC-AUC.",
  },
];

export type EducationEntry = {
  degree: string;
  school: string;
  board?: string;
  period: string;
  grade?: string;
};

export const educationHistory: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science (Data Analytics & ML)",
    school: "Centurion University (CUTM), Bhubaneswar",
    period: "Jul 2024 – Present",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    school: "Dhabaleswar Institute of Polytechnic, Cuttack",
    board: "SCTE&VT Odisha",
    period: "2024",
    grade: "79%",
  },
  {
    degree: "Class X",
    school: "Biswanath Bidya Pitha, Athagarh",
    board: "BSE Odisha",
    period: "2021",
    grade: "72%",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "SQL"],
  },
  {
    group: "ML & Deep Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Random Forest",
      "CNN",
      "TCN",
      "ResNet",
      "Vision Transformer (ViT)",
      "U-Net",
      "Transfer Learning",
      "Feature Engineering",
      "Hyperparameter Tuning",
      "Model Evaluation",
    ],
  },
  {
    group: "LLM & Generative AI",
    items: [
      "Large Language Models",
      "LangChain",
      "RAG",
      "HuggingFace Transformers",
      "Mistral-7B",
      "Prompt Engineering",
      "Agentic AI",
      "Multi-Agent Systems",
    ],
  },
  {
    group: "MLOps & Deployment",
    items: ["FastAPI", "Docker", "MLflow", "REST API"],
  },
  {
    group: "Data & Analysis",
    items: [
      "NumPy",
      "Pandas",
      "Time-Series Analysis",
      "EEG Signal Processing (MNE)",
    ],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "GitHub", "Linux", "Jupyter Notebook", "VS Code"],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    title: "Artificial Intelligence Primer Certification",
    issuer: "Infosys Springboard",
    date: "May 2026",
  },
  {
    title: "Principles of Generative AI Certification",
    issuer: "Infosys Springboard",
    date: "May 2026",
  },
  {
    title: "Introduction to Natural Language Processing",
    issuer: "Infosys Springboard",
    date: "May 2026",
  },
  {
    title: "Deep Learning for Developers",
    issuer: "Infosys Springboard",
    date: "May 2026",
  },
  {
    title: "Prompt Engineering",
    issuer: "Infosys Springboard",
    date: "May 2026",
  },
  {
    title: "CUTM Training Program",
    issuer: "GeeksforGeeks",
    date: "March 2026",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle University",
    date: "March 2026",
    credentialId: "326624406OCI25AICFA",
  },
  {
    title: "Machine Learning",
    issuer: "Stanford University",
    date: "December 2025",
    credentialId: "42DI7GT4JFXV",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    date: "December 2025",
    credentialId: "9XIR5UP49XMO",
  },
  {
    title: "5-Day AI Agents Intensive Course",
    issuer: "Google",
    date: "December 2025",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
