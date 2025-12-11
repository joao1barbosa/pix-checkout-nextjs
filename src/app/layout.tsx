import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TransactionProvider } from "@/context/TransactionContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIX Transaction Challenge",
  description: "Fullstack Senior Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TransactionProvider>{children}</TransactionProvider>
        <Toaster />
      </body>
    </html>
  );
}
