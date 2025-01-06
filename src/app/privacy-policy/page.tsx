"use client";

import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import styles from "./page.module.css";
import Link from "@/components/Link/Link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

const PrivacyPolicy = () => {
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Datenschutz", href: "/privacy-policy" },
    ];

    return (
        <div className={styles.container}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <Heading as="h1" variant="md" headingText="Datenschutzhinweise" />

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="1. Allgemeine Hinweise" />
                <Text variant="md">
                    Diese Datenschutzerklärung informiert Sie über die Datenverarbeitung innerhalb dieser Webanwendung,
                    die im Rahmen einer Bachelorarbeit entwickelt wurde und nicht öffentlich erreichbar ist. Die
                    Anwendung dient ausschließlich zu Studienzwecken und zur Demonstration der Techniken zur
                    Hautanalyse.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="2. Datenerhebnung und -verarbeitung" />
                <Text variant="md">
                    Die Webanwendung selbst erhebt, speichert oder verarbeitet keine personenbezogenen Daten. Die
                    Anwendung stellt lediglich die Funktionalität zur Verfügung, um Hautläsionen zu analysieren. Die
                    eigentliche Datenspeicherung (z.B. Benutzerdaten oder Analyseergebnisse) und -verarbeitung erfolgt
                    ausschließlich auf Systemen, die von den Nutzern selbst eingerichtet und betrieben werden.
                    Entsprechend ist dann diese Datenschutzerklärung anzupassen.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="3. Datenbank und Datenverarbeitung" />
                <Text variant="md">
                    Nutzer, die diese Webanwendung einrichten und verwenden, sind dafür verantwortlich eine Datenbank zu
                    erstellen und zu verwalten, auf der Benutzerdaten und Analyseergebnisse gespeichert werden können.
                    Es liegt in der Verantwortung des Nutzers die geltenden Datenschutzvorschriften zu beachten und die
                    Sicherheit der gespeicherten Daten zu gewährleisten.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="4. Keine Erhebung von personenbezogenen Daten" />
                <Text variant="md">
                    Die Webanwendung erhebt oder verarbeitet keine personenbezogenen Daten. Alle Daten, die verabeitet
                    werden, hängen von der Konfiguration und Verwaltung durch den jeweiligen Nutzer ab und dieser ist
                    für die Einhaltung der Datenschutzbestimmungen verantwortlich.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="5. Weitergabe von Daten" />
                <Text variant="md">
                    Die Anwendung gibt keine personenbezogenen Daten an Dritte weiter, da keine solchen Daten erfasst
                    oder verarbeitet werden. Jegliche Datenverarbeitung und -weitergabe obliegt dem Nutzer, der die
                    Anwendung lokal einrichtet und betreibt.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="6. Kontakt" />
                <Text variant="md">
                    Bei Fragen und Anmerkungen zu dieser Webanwendung oder zur Datenschutzpraxis können Sie uns über
                    dieses <Link href="/contact" linkText="Kontaktformular" /> erreichen.
                </Text>
            </section>

            <section className={styles.section}>
                <Heading as="h2" variant="sm" headingText="7. Änderung der Datenschutzerklärung" />
                <Text variant="md">
                    Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte
                    rechtliche Anforderungen oder Änderungen an der Anwendung anzupassen. Die jeweils aktuellste Version
                    der Datenschutzerklärung ist auf dieser Webseite verfügbar.
                </Text>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
