import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OnboardingProvider } from "./contexts/OnboardingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "소리 AI - 따뜻한 목소리로 매일을 채웁니다",
  description: "AI 기반 음성 안부 전화 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
