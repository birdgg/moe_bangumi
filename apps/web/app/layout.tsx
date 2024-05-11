import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moe Bangumi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed w-full py-5 bg-blue-500"></div>
        <div className="flex flex-row h-[200px] pt-[40px]">
          <div className="h-full w-[30px] bg-pink-300"></div>
          {children}
        </div>
      </body>
    </html>
  );
}
