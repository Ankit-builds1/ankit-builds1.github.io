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
  demoHref?: string;
  status?: "ongoing";
};

export const projects: Project[] = [
  {
    title: "Sleep Stage Detection & Clinical Report Generation",
    emoji: "💤",
    blurb:
      "Two-level TCN for held-out-subject sleep-stage classification, with 88.29% train accuracy and 87.02% validation accuracy at the best checkpoint.",
    details:
      "Trained on SHHS1 (100 subjects, 98,985 epochs) and validated on held-out SHHS2 subjects (52 subjects, 66,853 epochs) using EEG/EOG signals resampled to 125 Hz and filtered with a 4th-order Butterworth bandpass (0.5–45 Hz). The two-level TCN uses segment and epoch encoders with dilations 1/2/4; inverse-frequency class weights and WeightedRandomSampler address class imbalance. The best checkpoint reached 88.29% train accuracy and 87.02% validation accuracy; the official held-out classification report rounds to 87% accuracy, with REM recall of 0.82. Mistral-7B-Instruct-v0.2 runs in 4-bit NF4 quantization and generates three-paragraph clinical reports from sleep efficiency, TST, WASO, and REM% metrics, alongside a hybrid 0–100 sleep score.",
    tags: ["Python", "PyTorch", "TCN", "MNE", "SciPy", "Mistral 7B", "HuggingFace"],
    href: "https://github.com/Ankit-builds1/sleep-quality-stage-detection",
    demoHref: "https://huggingface.co/spaces/Ankit-builds/deepSleep-AI",
  },
  {
    title: "Hierarchical Agentic Malware Classification",
    emoji: "🦠",
    blurb:
      "Hierarchical malware classification using engineered image features, Random Forest, XGBoost, and confidence-aware ensemble decisions.",
    details:
      "Stage-1 RF + XGBoost classifiers handle high-confidence cases; a meta-model decides escalation on a leak-free split; Stage-2 ResNet-18 CNN handles ambiguous inputs. 5-fold stratified cross-validation across all stages. Deployed behind a FastAPI inference endpoint.",
    tags: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "NumPy", "Pandas", "Matplotlib"],
    href: "https://github.com/Ankit-builds1/hierarchical-agentic-malware-classification",
    demoHref: "https://huggingface.co/spaces/AnkitsProject12/malware-classifier",
  },
  {
    title: "CyberWatch AI",
    emoji: "🛡️",
    blurb:
      "Local, terminal-first cybersecurity toolkit for phishing URLs, harmful text, network flows, malware families, and zero-day anomalies.",
    details:
      "Runs six local inference pipelines through a Docker CLI, with XGBoost, LSTM, Random Forest, 1D-CNN, BERT, Isolation Forest, and Autoencoder models. Includes optional Windows live monitoring through Scapy and Npcap.",
    tags: ["Python", "Docker", "XGBoost", "LSTM", "BERT", "Scapy", "Npcap", "Cybersecurity"],
    href: "https://github.com/Ankit-builds1/Cyberwatch_ai",
  },
  {
    title: "ShadowGuard AI",
    emoji: "🔐",
    blurb:
      "Local AI privacy firewall that scans prompts, repositories, folders, and Git changes for secrets, PII, and prompt injection.",
    details:
      "Includes a Docker-first CLI, FastAPI local API, Next.js dashboard, SQLite history, Live Guard, Git pre-commit and pre-push hooks, public repository monitoring, PDF reports, and a Chrome Manifest V3 extension.",
    tags: ["Docker", "Next.js", "FastAPI", "SQLite", "Chrome MV3", "Python", "Cybersecurity"],
    href: "https://github.com/Ankit-builds1/shadowai-guardian",
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
    grade: "CGPA 8.58",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    school: "Dhabaleswar Institute of Polytechnic, Cuttack",
    board: "SCTE&VT Odisha",
    period: "2024",
    grade: "72%",
  },
  {
    degree: "Class X",
    school: "Biswanath Bidya Pitha, Athagarh",
    board: "BSE Odisha",
    period: "2021",
    grade: "70%",
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
