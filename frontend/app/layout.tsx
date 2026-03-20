import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import ThemeRegistry from "./theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} >
        <ThemeRegistry  >  {children}  </ThemeRegistry>
      </body>
    </html>
  );
}
