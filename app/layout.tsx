import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/lib/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Classroom",
  description: "A next gen classroom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <SocketProvider>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider></body>
        </SocketProvider>
    </html>
  );
}
