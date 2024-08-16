'use client'
import Header from "@/components/Header/index";
import Loader from "@/components/shared/Loader/index";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageLoaded, setPageLoaded] = useState(false)
  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Zain:wght@200;300;400;700;800;900&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <Loader isAnimationFinish={setPageLoaded}/>
        <Header pageLoaded={pageLoaded}/>  
        {children}
      </body>
    </html>
  );
}
