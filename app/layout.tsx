import type { Metadata } from "next";
import { Exo_2, DM_Sans, JetBrains_Mono } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankit Dash · ML / NLP / GenAI Engineer",
  description:
    "Final-year B.Tech CSE (DAML) student building multimodal AI systems across speech, vision, and biomedical signals.",
  keywords: [
    "Ankit Dash",
    "Machine Learning",
    "NLP",
    "GenAI",
    "Portfolio",
    "PyTorch",
    "HuggingFace",
  ],
  authors: [{ name: "Ankit Dash" }],
  openGraph: {
    title: "Ankit Dash · ML / NLP / GenAI Engineer",
    description: "Multimodal AI across speech, vision, and biomedical signals.",
    type: "website",
  },
};

const themeInitScript = `
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="noise min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <AnimatedBackground />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
