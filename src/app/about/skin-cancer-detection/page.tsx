"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading/Heading";
import Text from "@/components/Text/Text";
import styles from "./page.module.css";
import Link from "@/components/Link/Link";

const SkinCancerDetection = () => {
    const [isLoading, setIsLoading] = useState(true);

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
            <article className={styles.article}>
                <section className={styles.section}>
                    <Heading as="h1" variant="md" headingText="Über Skin Cancer Detection" />
                    <Text variant="md">
                        Skin Cancer Detection ist eine "innovative" Webanwendung, die im Rahmen einer Bachelorabeit an
                        der AKAD University entwickelt wurde, um das Bewusstsein für die Hautkrebsvorsorge zu schärfen
                        und bei der Früherkennung zu unterstützen. Mit moderner Technologie möchten wir Menschen helfen,
                        schnell eine erste, unverbindliche Einschätzung zu einer gegebenen Hautläsion zu erhalten, um
                        die Wartezeit zum nächsten Termin bei Ihrem Dermatologen zu verkürzen.
                    </Text>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <Heading as="h2" variant="md" headingText="Die Vision" />
                    <Text variant="md">
                        Unsere Vision ist eine Welt, in der Hautkrebs frühzeitig erkannt und behandelt wird, wodurch die
                        Sterblichkeitsrate signifikant reduziert wird. Wir sind davon überzeugt, dass Aufklärung und
                        regelmäßige Hautchecks neben den eigenverantwortlichen Selbstmaßnahmen der Schlüssel zur
                        Prävention sind.
                    </Text>
                    <Link href="/home" mode="default" linkText="Mehr über Hautkrebs erfahren" />
                    <article className={styles.valuesArticle}>
                        <section className={styles.valueSection}>
                            <Heading as="h3" variant="sm" headingText="Früherkennung verbessern" />
                            <Text variant="md">
                                Wir möchten moderne Technologie nutzen, um die Früherkennung von Hautlrebs zu
                                verbessern. Hierzu nutzen wir die Möglichkeit und die Stärken von einer künstlichen
                                Intelligenz.
                            </Text>
                        </section>
                        <section className={styles.valueSection}>
                            <Heading as="h3" variant="sm" headingText="Inklusion" />
                            <Text variant="md">
                                Wir sind der Meinung, dass jeder uneingeschränkt selbstständig regelmäßige Hautchecks
                                durchführen können sollte. Aus diesem Grund legen wir besonderen Wert auf eine
                                zugängliche, benutzerfreundliche und barrierefreie Plattform.
                            </Text>
                        </section>
                        <section className={styles.valueSection}>
                            <Heading as="h3" variant="sm" headingText="Flexibilität" />
                            <Text variant="md">
                                Die Wartezeiten bei Dermatologen sind oft monatelang. Wir möchten eine erste
                                Einschätzung jederzeit ermöglichen und somit die Wartezeit für eine erste Einschätzung
                                verkürzen.
                            </Text>
                        </section>
                    </article>
                </section>
            </article>

            <article className={styles.article}>
                <section className={styles.section}>
                    <Heading as="h2" variant="md" headingText="Technologie und Methoden" />
                    <Text variant="md">
                        Skin Cancer Detection verwendet moderne Machine-Learning-Algorithmen, Bildverarbeitungstechniken
                        und ein Convolutional Neural Network, um Hautläsionen zu analysierenund das Hautkrebsrisiko zu
                        bewerten. Wir verwenden ein VGG16-Modell und haben es mit über 30000 Bildern trainiert, um eine
                        hohe Genauigkeit zu gewährleisten.
                    </Text>
                </section>
            </article>
            <article className={styles.article}>
                <section className={styles.section}>
                    <Heading as="h2" variant="md" headingText="Kontaktieren Sie uns" />
                    <Text variant="md">
                        Haben Sie Fragen oder möchten Sie mehr über Skin Cancer Detection erfahren? Kontaktieren Sie uns
                        gerne über unser <Link href="/contact" linkText="Kontaktformular" />.
                    </Text>
                </section>
            </article>
        </div>
    );
};

export default SkinCancerDetection;
