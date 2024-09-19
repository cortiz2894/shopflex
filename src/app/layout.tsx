'use client'
import Footer from "@/components/Footer/index";
import Header from "@/components/Header/index";
import Loader from "@/components/shared/Loader/index";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import { useParams } from "next/navigation";
import Cursor from "@/components/shared/Cursor";
import toast, { Toaster } from 'react-hot-toast';
import { ProductVaul } from "@/components/ProductVaul";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams<{ tag: string; item: string }>()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300)
	}, [params])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Zain:wght@200;300;400;700;800;900&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <Loader/>
        <Header/>  
          {children}
        <Footer />
        <Cursor />
        <Toaster
          position="top-right"
          containerStyle={{
            top: 100,
            right: '4%'
          }}
          toastOptions={{
            className: 'z-[999999]'
          }}
        />
        <ProductVaul />
        <div className="exitTransition"></div>
      </body>
    </html>
  );
}
