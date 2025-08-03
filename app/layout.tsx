import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import AuthWrapper from "@/utils/AuthWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

const appTitle = "Flight Booker"; // todo: metadata
const appDescription = "Book flights with ease and comfort.";

export const metadata: Metadata = {
  title: appTitle,
  description: appDescription,
  keywords: ["flight", "booking", "airline", "tour"],
  authors: [
    { name: "Mohammad Abdullah Farooqui", url: "https://github.com/mafgit" },
  ],
  creator: "Mohammad Abdullah Farooqui",
  publisher: "Mohammad Abdullah Farooqui",
  openGraph: {
    title: appTitle,
    description: appDescription,
    url: "", // todo: metadata
    siteName: appTitle,
    images: [], // todo: metadata
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appTitle,
    description: appDescription,
    // creator: '@...',
    images: [], // todo: metadata
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <AuthWrapper allowedRoles={['all']}>
          {/* <div className="pt-[50px]"></div> */}
          {children}
          <div className="pt-[50px]"></div>
          <Footer />
        </AuthWrapper>
      </body>
    </html>
  );
}
