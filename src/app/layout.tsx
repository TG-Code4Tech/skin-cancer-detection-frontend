import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Skin Cancer Detection",
    description: "Skin Cancer Detection ist eine Webanwendung zur Hautkrebsanalyse",
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="de">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
