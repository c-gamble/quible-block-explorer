import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import QuibleLogo from "./logo.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quible Block Explorer",
  description:
    "QuibleScan is a block explorer for Quible, a decentralized security platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="text-xl font-bold hover:text-blue-600 transition-colors">
                    QuibleScan
                  </h1>
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  href="https://docs.quible.network/product"
                  target="_blank"
                >
                  <Image
                    src={QuibleLogo}
                    alt="Quible Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
