import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_Components/Header";
import { ThemeProvider } from "./_Components/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Artistly",
  description: "Connect, showcase, and collaborate with artists worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white light:bg-[#fff] light:text-black`}
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
