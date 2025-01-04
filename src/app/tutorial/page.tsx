"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import styles from "./page.module.css";
import Link from "@/components/Link/Link";
import Badge from "@/components/Badge/Badge";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { loadTheme } from "@/utils/theme";

const SkinCancerDetection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Anleitung", href: "/tutorial" },
    ];

    useEffect(() => {
        loadTheme();
    }, []);

    useEffect(() => {
        try {
            const mainElement = document.body.querySelector("main");
            mainElement?.classList.add("full-width");
        } catch (error) {
            console.error("Element <main> konnte nicht gefunden werden.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </section>

            <section className={styles.section}>
                <Heading
                    as="h1"
                    variant="md"
                    headingText="Hautanalyse starten: So geht's"
                    classname={styles.pageHeading}
                />
            </section>

            <article className={styles.article}>
                <section className={styles.section}>
                    <div className={styles.screenshot}>
                        <Image
                            src="/images/tutorial/navigate_to_check-skin.png"
                            alt=""
                            layout="responsive"
                            width={16}
                            height={9}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.explanation}>
                        <Heading as="h2" variant="sm" classname={styles.heading}>
                            <Badge variant="primary" text="1" className={styles.badge} /> Link 'Haut prüfen' klicken
                        </Heading>
                        <Text variant="md">
                            Klicken Sie im Header auf den Link 'Haut prüfen', um auf die Seite zur Durchführung einer
                            Hautanalyse zu gelangen.
                        </Text>
                    </div>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <div className={styles.explanation}>
                        <Heading as="h2" variant="sm" classname={styles.heading}>
                            <Badge variant="primary" text="2" className={styles.badge} /> Bild hochladen
                        </Heading>
                        <Text variant="md">
                            Klicken Sie auf den Button 'Bild hochladen', damit sich ein Fenster öffnet, über das sie ein
                            Bild hochladen können. Hierzu wählen Sie ein Bild auf Ihrem Dateisystem aus und bestätigen
                            mit 'OK'.
                        </Text>
                    </div>
                    <div className={styles.screenshot}>
                        <Image
                            src="/images/tutorial/upload_image.png"
                            alt=""
                            layout="responsive"
                            width={16}
                            height={9}
                            className={styles.image}
                        />
                    </div>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <div className={styles.screenshot}>
                        <Image
                            src="/images/tutorial/analyze_skin_lesion.png"
                            alt=""
                            layout="responsive"
                            width={16}
                            height={9}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.explanation}>
                        <Heading as="h2" variant="sm" classname={styles.heading}>
                            <Badge variant="primary" text="3" className={styles.badge} /> Analyse starten
                        </Heading>
                        <Text variant="md">
                            Klicken Sie auf den Button 'Analyse starten', um eine Hautanalyse für ihre Bildauswahl
                            durchzuführen.
                        </Text>
                    </div>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <div className={styles.explanation}>
                        <Heading as="h2" variant="sm" classname={styles.heading}>
                            <Badge variant="primary" text="4" className={styles.badge} /> Ergebnis einsehen
                        </Heading>
                        <Text variant="md">
                            Nachdem die Analyse abgeschlossen ist erhalten Sie eine Diagnose, die entweder 'gutartig'
                            oder 'bösartig' lautet. Sie sehen auch den Konfidenzwert, welcher angibt, wie sicher das
                            Modell bei der korrekten Klassifizierung ist. Basierend auf der Diagnose und dem
                            Konfidenzwert erhalten Sie zusätzlich eine Empfehlung für Ihr weiteres Vorgehen.
                        </Text>
                    </div>
                    <div className={styles.screenshot}>
                        <Image
                            src="/images/tutorial/analysis_result.png"
                            alt=""
                            layout="responsive"
                            width={16}
                            height={9}
                            className={styles.image}
                        />
                    </div>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <div className={styles.screenshot}>
                        <Image
                            src="/images/tutorial/conducted_analyses.png"
                            alt=""
                            layout="responsive"
                            width={16}
                            height={9}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.explanation}>
                        <Heading as="h2" variant="sm" classname={styles.heading}>
                            <Badge variant="primary" text="5" className={styles.badge} /> Neue Analyse starten
                        </Heading>
                        <Text variant="md">
                            Sie können über den Button 'Neue Analyse durchführen' analog dem beschriebenen Prozess eine
                            neues Bild auswählen, um dieses anschließend zu analysieren. Ihre bisher durchgeführten
                            Analysen können Sie in Ihrem Benutzerkonto einsehen.
                        </Text>
                    </div>
                </section>
            </article>
        </div>
    );
};

export default SkinCancerDetection;
