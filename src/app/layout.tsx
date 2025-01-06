import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Skin Cancer Detection",
    description: "Skin Cancer Detection ist eine Webanwendung zur Hautkrebsanalyse",
};

export default function RootLayout({ children }: RootLayoutProps) {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme")?.value || "light";

    return (
        <html lang="de">
            <body data-dark-mode={theme === "dark" ? "true" : undefined}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
