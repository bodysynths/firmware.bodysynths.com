import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Body Synths Firmware",
  description: "Body Synths firmware update page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
