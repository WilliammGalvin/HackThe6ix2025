import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thirst for Profit",
  description: "Hackthe6ix 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <nav className="p-4 flex justify-center text-lg">
          <div className="relative max-w-[750px] flex w-full justify-between px-6 items-center overflow-hidden border-1 border-[#292929] rounded-lg shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-[#171717] opacity-35 rounded-lg z-0" />

            <Link href="/" className="text-center py-4 z-10">
              Thirst for Profit
            </Link>

            <ul className="flex gap-x-6 z-10">
              <li>
                <Link href="about">About</Link>
              </li>

              <li>
                <Link href="petition">Petition</Link>
              </li>

              <li>
                <Link href="login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
