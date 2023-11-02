import type { Metadata } from "next";
import "./globals.css";
import { font } from "./theme";

export const metadata: Metadata = {
  title: "Pmdr",
  description: "Fantastic Pomodoro Timer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
