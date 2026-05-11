import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
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
    description:
      "Multimodal AI across speech, vision, and biomedical signals.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
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
