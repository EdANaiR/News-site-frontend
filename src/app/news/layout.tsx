import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Güncel Manşet - Son Dakika Haberler, Güncel Haberler",
  description: "En güncel haberler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
