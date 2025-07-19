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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex w-full justify-between py-2 px-6 items-center">
          <Link href="/" className="text-center py-4">
            Thirst for Profit
          </Link>

          <ul className="flex gap-x-4">
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
        </nav>

        {children}
      </body>
    </html>
  );
}
