
import type { ReactNode } from "react";
import "../app/globals.css";


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
            <main className="page-content">{children}</main>
        </div>
        </body>
        </html>
    );
}