import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashGrotesk = localFont({
  src: "./fonts/ClashGrotesk-Regular.woff",
  variable: "--font-clash-grotesk",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Makers Dashboard",
  description: "Fashion for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashGrotesk.variable} antialiased bg-astraOffWhite`}>
        {children}
      </body>
    </html>
  );
}
