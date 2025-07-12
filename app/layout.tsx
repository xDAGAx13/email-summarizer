// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { TokenProvider } from "../context/TokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Email Summarizer",
  description: "Summarize emails using Gemini AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>
        {children}
        </TokenProvider>
      </body>
    </html>
  );
}
