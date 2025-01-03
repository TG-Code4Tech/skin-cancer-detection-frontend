"use client";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

const Home = () => {
    const breadcrumbs = [{ label: "Home", href: "/" }];

    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </main>
    );
};

export default Home;
