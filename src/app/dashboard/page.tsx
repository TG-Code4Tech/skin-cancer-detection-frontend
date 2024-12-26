"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import styles from "./page.module.css";
import Link from "@/components/Link/Link";
import AnalysesTable from "@/components/AnalysesTable/AnalysesTable";
import { Analysis } from "@/types/globalTypes";
import { isAuthenticated } from "@/utils/authentication";
import HorizontalBarChart from "@/components/HorizontalBarChart/HorizontalBarChart";

const Dashboard = () => {
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    let benignDiagnoses = 0;
    let malignantDiagnoses = 0;

    analyses.map((analysis) => {
        if (analysis.result === "benign") {
            benignDiagnoses++;
        } else {
            malignantDiagnoses++;
        }
    });

    const diagnosesData = [
        { label: "gutartig", value: benignDiagnoses },
        { label: "bösartig", value: malignantDiagnoses },
    ];

    const maximum = benignDiagnoses >= malignantDiagnoses ? ++benignDiagnoses : ++malignantDiagnoses;

    console.log("maximum", maximum);

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

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }

        try {
            getAnalyses();
        } catch (error) {
            console.error("Es ist ein Fehler beim Abrufen der Daten aufgetreten.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <section className={styles.recentAnalyses}>
                <Heading as="h1" variant="md" headingText="Aktuelle Analysen" />
                <div className={styles.analysesTable}>
                    <AnalysesTable caption="Ihre bisher durchgeführten Analysen" tableBodyRows={analyses} />
                </div>
            </section>

            <section className={styles.diagnoses}>
                <Heading as="h2" variant="md" headingText="Diagnosen" />
                <HorizontalBarChart
                    data={diagnosesData}
                    xAxisLabel="Anzahl"
                    yAxisLabel="Klassifikation"
                    xAxisMaximum={maximum}
                />
            </section>

            <section className={styles.quickActions}>
                <Heading as="h2" variant="md" headingText="Schnellaktionen" classname={styles.quickActionsHeading} />
                <div className={styles.quickActionsLinkContainer}>
                    <div className={styles.linkContainer}>
                        <Link href="/check-skin" linkText="Analyse durchführen" />
                    </div>
                    <div className={styles.linkContainer}>
                        <Link href="/account/analyses" linkText="Meine Analyse" />
                    </div>
                    <div className={styles.linkContainer}>
                        <Link href="/check-skin" linkText="Einstellungen" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
