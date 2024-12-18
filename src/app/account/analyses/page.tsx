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
import { deleteCookie } from "@/utils/cookie";
import Table from "@/components/AnalysesTable/AnalysesTable";
import AnalysesTable from "@/components/AnalysesTable/AnalysesTable";

interface Analysis {
    image_id: number;
    analysis_date: Date;
    result: string;
    confidence_score: number;
}

const Analyses = () => {
    const [userData, setUserData] = useState<Record<string, string>>({});
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
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
        try {
            const jwtCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt_access_token"));
            const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

            if (!jwtToken) {
                console.error("Kein JWT-Token gefunden");
                return;
            }

            const response = await fetch("http://127.0.0.1:5000/get-user-data", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getAnalyses = async () => {
        const jwtCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt_access_token"));
        const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

        if (!jwtToken) {
            console.error("Kein JWT-Token gefunden");
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/get-all-analyses", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setAnalyses(data);
        }
    };

    const logout = () => {
        deleteCookie("jwt_access_token");
        router.push("/login");
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
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
