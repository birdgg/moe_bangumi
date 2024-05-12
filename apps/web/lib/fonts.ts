import { Manrope, Noto_Serif_SC } from "next/font/google";

export const fontSans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const fontSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Noto Serif SC"],
});
