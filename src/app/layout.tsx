import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ViewTransition} from "react";
import ToolBar from "../components/toolbar/ToolBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitPad",
  icons: {
    icon: "/icons/GitPad.png",
    apple: "/icons/GitPad.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ViewTransition enter="slide-in" exit="slide-out">
          {children}
          <ToolBar />
        </ViewTransition>
      </body>
    </html>
  );
}
