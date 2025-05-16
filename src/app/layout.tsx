import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/SIdebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Work Tracker",
  description: "Employee Work Tracker App",
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
        <div className="flex h-screen overflow-x-hidden bg-[url('/dark-bg.jpg')] backdrop-blur-md bg-cover bg-center">
          {/* Sidebar */}
          <div className="w-1/5 text-white bg-white/5 rounded-lg p-4 m-5">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col flex-1 overflow-x-auto">
            {/* Navbar jika ada nanti bisa ditambahkan di sini */}
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
