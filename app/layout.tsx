import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import RouteToaster from "@/components/providers/RouteToaster";
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
      <head>
        <link
          rel="preconnect"
          href="https://logged-assets.s3.amazonaws.com"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <RouteToaster />
      </body>
    </html>
  );
}
