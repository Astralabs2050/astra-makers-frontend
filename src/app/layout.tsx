import type { Metadata } from "next";
import "./globals.css";
import QueryClientProviderWrapper from "@/helpers/QueryClientWrapper";
import { Toaster } from "react-hot-toast";

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
      <body className=" bg-astraOffWhite">
        {" "}
        <QueryClientProviderWrapper>
          <Toaster position="top-center" />
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
