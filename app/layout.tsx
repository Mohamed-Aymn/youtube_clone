import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "YouTube",
    template: "%s - YouTube",
  },
  description: "YouTube browse clone built with Clean Architecture",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--yt-bg)] text-[var(--yt-fg)]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
