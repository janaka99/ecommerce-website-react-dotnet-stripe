import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/Layouts/Container/Container";
import Footer from "@/components/Layouts/Footer/Footer";
import dynamic from "next/dynamic";
import AuthState from "@/context/AuthContext/AuthState";
import { Suspense } from "react";
import Loading from "@/components/Layouts/Loading/Loading";
import Header from "@/components/Layouts/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Compose from "@/context/Compose";
import CategoryState from "@/context/CategoryContext/CategoryState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className + " bg-white "}>
        <Compose components={[AuthState, CategoryState]}>
          <div className="box-border w-full min-h-[100svh] flex flex-col justify-between overflow-hidden">
            {/* <Suspense fallback={<Loading />}> */}
            <Container>
              <Header />
              {children}
            </Container>
            <Footer />
            {/* </Suspense> */}
          </div>
        </Compose>
        <ToastContainer />
      </body>
    </html>
  );
}
