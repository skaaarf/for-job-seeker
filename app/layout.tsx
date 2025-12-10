import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "味方くん - AIキャリアコーチ",
  description: "就活生のための自己理解・キャリア設計支援アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans anti-aliased bg-background text-foreground flex min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Sidebar />
        <main className="flex-1 relative overflow-y-auto h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
