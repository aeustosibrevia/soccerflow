
import type { ReactNode } from "react";
import "./globals.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export const metadata = {
    title: "Soccer Flow",
    description: "Football stats and live matches",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="uk">
        <body>
        <div className="page-layout">
            <Header />
            <main className="page-content">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    );
}