import type { Metadata } from "next";
import "./globals.css";

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
      <body className=" bg-astraOffWhite">{children}</body>
    </html>
  );
}
