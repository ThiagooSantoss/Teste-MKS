import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import ReactQueryProvider from "../../providers/ReactQueryProvider";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "300", "700", "400"] });

export const metadata: Metadata = {
  title: "MKS-Frontend-Challenge",
  description: "Teste MKS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
