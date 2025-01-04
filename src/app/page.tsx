"use client";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

import { loadTheme } from "@/utils/theme";
import { useEffect } from "react";

const Home = () => {
    const breadcrumbs = [{ label: "Home", href: "/" }];

    useEffect(() => {
        loadTheme();
    }, []);

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </main>
    );
};

export default Home;
