"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import SubNavigation from "@/components/SubNavigation/SubNavigation";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import { isAuthenticated } from "@/utils/authentication";
import { deleteCookie, getCookie } from "@/utils/cookie";
import Table from "@/components/AnalysesTable/AnalysesTable";
import AnalysesTable from "@/components/AnalysesTable/AnalysesTable";
import { Analysis } from "@/types/globalTypes";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { loadTheme } from "@/utils/theme";

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

    useEffect(() => {
        loadTheme();
    }, []);

    const getUserData = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");

            return;
        }

        const token = getCookie("jwt_access_token");

        try {
            const response = await fetch("http://127.0.0.1:5000/get-user-data", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                if (response.status === 401) {
                    router.push("/login?expired=true");

                    return;
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getAnalyses = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");

            return;
        }

        const token = getCookie("jwt_access_token");

        try {
            const response = await fetch("http://127.0.0.1:5000/get-all-analyses", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnalyses(data);
            } else {
                if (response.status === 401) {
                    router.push("/login?expired=true");

                    return;
                }
            }
        } catch (error) {
            console.error("Error:", error);
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
