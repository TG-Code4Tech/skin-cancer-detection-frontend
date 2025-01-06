"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import styles from "./page.module.css";
import Link from "@/components/Link/Link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Spinner from "@/components/Spinner/Spinner";

const Impressum = () => {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Impressum", href: "/impressum" },
    ];

    return (
        <div className={styles.container}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <Heading as="h1" variant="md" headingText="Impressum" />

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="Verantwortlich für den Inhalt" />
                <Text variant="md">
                    Diese Webanwendung wurde im Rahmen einer Bachelorarbeit an der AKAD University erstellt und ist
                    nicht öffentlich zugänglich. Der{" "}
                    <Link
                        href="https://github.com/TG-Code4Tech/skin-cancer-detection-frontend"
                        target="_blank"
                        linkText="Frontend-Quellcode"
                        iconName="open-in-new"
                        iconPosition="right"
                        iconColor="brand"
                        iconSize={18}
                        className={styles.link}
                    />{" "}
                    und der
                    <Link
                        href="https://github.com/TG-Code4Tech/skin-cancer-detection-backend"
                        target="_blank"
                        linkText="Backend-Quellcode"
                        iconName="open-in-new"
                        iconPosition="right"
                        iconColor="brand"
                        iconSize={18}
                        className={styles.link}
                    />{" "}
                    können auf Github eingesehen und heruntergeladen werden. Die Webanwendung dient ausschließlich zu
                    Studienzwecken und der Demonstration der entwickelten Techniken zur Hautkrebsanalyse.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="Kontakt" />
                <Text variant="md">
                    Zu Fragen oder Anmerkungen zu dieser Webanwendung nutzen Sie bitte dieses{" "}
                    <Link href="/contact" linkText="Kontaktformular" />.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="Hinweis" />
                <Text variant="md">
                    Diese Webanwendung wurde mit höchster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                    Aktualität der Inhalte wird keine Gewähr übernommen. Diese Webanwendung dient rein zu Studienzwecken
                    und soll keinen Ersatz für professionelle medizinische Beratung, Diagnose oder Behandlung
                    darstellen.
                </Text>
            </section>
        </div>
    );
};

export default Impressum;
