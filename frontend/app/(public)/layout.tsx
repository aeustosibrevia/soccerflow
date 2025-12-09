
import type { ReactNode } from "react";
import Header from "@/src/components/Header-Footer/Header";
import Footer from "@/src/components/Header-Footer/Footer";

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

        <div className="page-layout">
            <Header />
            <main className="page-content">{children}</main>
            <Footer />
        </div>

    );
}