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
    title: "SpeakSense — Hybrid Speech Intelligence",
    emoji: "🎙️",
    blurb:
      "Multi-modal speech AI combining HuBERT-Large, DistilBERT & Mistral 7B for real-time emotion detection, intent classification, and empathetic response generation.",
    details:
      "Fine-tuning HuBERT-Large on RAVDESS (90.09% acc, cross-evaluated on CREMA-D) and DistilBERT on Banking77 (85.3% F1), with a confidence-aware hybrid risk-scoring layer. Ablation shows ~279% BLEU improvement from emotion-conditioned prompting. Deploying on HuggingFace Spaces.",
    tags: ["HuBERT", "Whisper", "DistilBERT", "Mistral 7B", "Gradio", "NLP"],
    status: "ongoing",
  },
  {
    title: "CMFD — Copy-Move Forgery Detection",
    emoji: "🔍",
    blurb:
      "Pixel-level image forensics using EfficientNetB4 + 3-layer ViT + Attention U-Net — targeting Dice 0.891 on CoMoFoD with Grad-CAM explainability.",
    details:
      "Hybrid segmentation architecture: EfficientNetB4 backbone, a 3-layer Vision Transformer for long-range dependencies, and an Attention U-Net decoder trained with BCE + Dice + Focal loss. Cross-evaluating on CASIA v2 and DEFACTO; Grad-CAM heatmaps for forensic explainability. Deploying on HuggingFace Spaces.",
    tags: [
      "TensorFlow",
      "EfficientNetB4",
      "ViT",
      "Attention U-Net",
      "Grad-CAM",
      "OpenCV",
    ],
    status: "ongoing",
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Agentic AI Engineer Intern",
    org: "ApexDevs",
    period: "May 2026 – Jun 2026",
    current: true,
    description:
      "Working on real-world agentic AI projects and guided tasks in the Agentic AI Engineer domain — submitting daily updates and weekly milestone reports.",
  },
  {
    role: "Data Science Intern",
    org: "The Developers Arena",
    period: "May 2026 – Aug 2026",
    current: true,
    description:
      "Completing self-paced data science modules with real-world project development, weekly task submissions, and a structured curriculum with automated progress tracking.",
  },
  {
    role: "Machine Learning Intern",
    org: "EdiGlobe",
    period: "Jun 2025 – Jul 2025",
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
  { href: "#certifications", label: "Certs" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
