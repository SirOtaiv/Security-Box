import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoaderContextProvider } from "@/components/contexts/LoaderContext";
import { Suspense } from "react";
import AuthProvider from "../components/contexts/AuthContext";
import SessionProvider from "../components/contexts/SessionContext";
import DialogContextProvider from "../components/contexts/DialogContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Security Box",
  description: "Generated by Otavio Rau",
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
        <Suspense>
          <LoaderContextProvider>
            <AuthProvider>
              <SessionProvider>
                <DialogContextProvider>
                  {children}
                </DialogContextProvider>
              </SessionProvider>
            </AuthProvider>
          </LoaderContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
