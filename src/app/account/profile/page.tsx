"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import SubNavigation from "@/components/SubNavigation/SubNavigation";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import { deleteCookie, getCookie } from "@/utils/cookie";
import { isAuthenticated } from "@/utils/authentication";
import RadioField from "@/components/RadioField/RadioField";
import Icon from "@/components/Icon/Icon";

const Profile = () => {
    const [userData, setUserData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState("");
    const router = useRouter();

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
                setSelectedTheme(data.theme);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const logout = () => {
        deleteCookie("jwt_access_token");
        router.push("/login");
    };

    const deleteAccount = async () => {
        const formData = new FormData();
        formData.append("user_id", userData.user_id);

        try {
            const token = getCookie("jwt_access_token");

            const response = await fetch("http://127.0.0.1:5000/delete-account", {
                method: "DELETE",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                deleteCookie("jwt_access_token");
                router.push("/");
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData.message);
            }
        } catch (error) {
            console.error("Login request error:", error);
        }
    };

    const subNavigationLinks = [
        {
            href: "/account/analyses",
            linkText: "Meine Analysen",
            ariaLabel: "Gehen Sie zu Ihren durchgeführten Analysen",
        },
        {
            href: "/account/profile",
            linkText: "Persönliche Angaben",
            ariaLabel: "Gehen Sie zu Ihren persönlichen Angaben",
            active: true,
        },
    ];

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }

        try {
            getUserData();
        } catch (error) {
            console.error("Es ist ein Fehler beim Abrufen der Benutzerdaten aufgetreten.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Persönliche Angaben" />

                        <div className={styles.informationContainer}>
                            <Text variant="md">
                                Vorname: <strong>{userData.first_name}</strong>
                            </Text>
                            <Text variant="md">
                                Nachname: <strong>{userData.last_name}</strong>
                            </Text>
                            <Text variant="md">
                                E-Mail-Adresse: <strong>{userData.email}</strong>
                            </Text>
                            <Text variant="md">
                                Benutzername: <strong>{userData.username}</strong>
                            </Text>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Theme" />

                        <form className={`${styles.informationContainer} ${styles.themeForm}`}>
                            <fieldset className={styles.fieldsetTheme}>
                                <legend>Wählen Sie zwischen einem hellen oder einem dunklen Erscheinungsbild:</legend>

                                <RadioField
                                    id="light-mode"
                                    variant="default"
                                    name="light-mode"
                                    label="Hell"
                                    value="light"
                                    checked={selectedTheme === "light"}
                                    onChange={() => setSelectedTheme("light")}
                                />

                                <RadioField
                                    id="dark-mode"
                                    variant="default"
                                    name="dark-mode"
                                    label="Dunkel"
                                    value="dark"
                                    checked={selectedTheme === "dark"}
                                    onChange={() => setSelectedTheme("dark")}
                                />
                            </fieldset>
                        </form>
                    </section>

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Passwort" />

                        <div className={styles.informationContainer}>
                            <Text variant="md">
                                Passwort: <strong>********</strong>{" "}
                            </Text>

                            <span className={styles.warningMessage}>
                                <Icon name="warning" size={16} color="warning" />
                                <Text
                                    variant="sm"
                                    text="(Die Anzahl der Asterisken korreliert nicht mit Ihrer Passwortlänge)"
                                    classname={styles.passwordHint}
                                />
                            </span>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Account löschen" />

                        <Button
                            variant="default"
                            buttonText="Account löschen"
                            className={styles.deleteAccountButton}
                            onClick={deleteAccount}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
