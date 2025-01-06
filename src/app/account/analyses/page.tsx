"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import SubNavigation from "@/components/SubNavigation/SubNavigation";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import { isAuthenticated } from "@/utils/authentication";
import { deleteCookie, getCookie } from "@/utils/cookie";
import AnalysesTable from "@/components/AnalysesTable/AnalysesTable";
import { Analysis } from "@/types/globalTypes";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Spinner from "@/components/Spinner/Spinner";
import { fetchUserData } from "@/services/userService";
import { fetchAllAnalyses } from "@/services/analysisService";

const Analyses = () => {
    const [userData, setUserData] = useState<Record<string, string>>({});
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Meine Analysen", href: "/account/analyses" },
    ];
    const subNavigationLinks = [
        {
            href: "/account/analyses",
            linkText: "Meine Analysen",
            ariaLabel: "Gehen Sie zu Ihren durchgeführten Analysen",
            active: true,
        },
        {
            href: "/account/profile",
            linkText: "Persönliche Angaben",
            ariaLabel: "Gehen Sie zu Ihren persönlichen Angaben",
        },
    ];

    const getUserData = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");
            return;
        }

        const token = getCookie("jwt_access_token");
        const result = await fetchUserData(token);

        if (result.error) {
            if (result.error === "UNAUTHORIZED") {
                router.push("/login?expired=true");
            } else {
                console.error(result.error);
            }
        } else {
            setUserData(result);
        }
    };

    const getAnalyses = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");
            return;
        }

        const token = getCookie("jwt_access_token");
        const result = await fetchAllAnalyses(token);

        if (result.error) {
            if (result.error === "UNAUTHORIZED") {
                router.push("/login?expired=true");
            } else {
                console.error(result.error);
            }
        } else {
            setAnalyses(result);
        }
    };

    const logout = () => {
        deleteCookie("jwt_access_token");
        router.push("/login");
        return;
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");
            return;
        }

        try {
            getUserData();
            getAnalyses();
        } catch (error) {
            console.error("Es ist ein Fehler beim Abrufen der Daten aufgetreten.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Spinner size="lg" centered={true} />;
    }

    return (
        <div className={styles.pageContainer}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <Heading as="h1" variant="md">
                <span className={styles.greeting}>Willkommen,</span>
                <br />
                {`${userData.first_name} ${userData.last_name}`}
            </Heading>

            <div className={styles.content}>
                <aside className={styles.subNavigation}>
                    <SubNavigation links={subNavigationLinks} />

                    <Divider />

                    <Button variant="default" buttonText="Abmelden" onClick={logout} />
                </aside>

                <div className={styles.mainContent}>
                    <AnalysesTable caption="Ihre bisher durchgeführten Analysen" tableBodyRows={analyses} />
                </div>
            </div>
        </div>
    );
};

export default Analyses;
