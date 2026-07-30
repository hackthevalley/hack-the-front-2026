import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree-family",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Hack the Valley 11",
  description:
    "Hack the Valley is a 36-hour student-run hackathon hosted at the University of Toronto Scarborough. Open to all skill levels, it brings together hundreds of students to build innovative tech projects, attend workshops, network with mentors, and compete for prizes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            duration: 6000,
            style: {
              background: "#0E0D5B",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}
