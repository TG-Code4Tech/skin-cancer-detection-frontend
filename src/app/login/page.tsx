"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Notification from "@/components/Notification/Notification";
import { GlobalNotification } from "@/types/globalTypes";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { loadTheme, setTheme } from "@/utils/theme";
import Spinner from "@/components/Spinner/Spinner";

const Login = () => {
    const [notification, setNotification] = useState<GlobalNotification | null>(null);
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Login", href: "/login" },
    ];

    useEffect(() => {
        loadTheme();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const tokenExpired = searchParams.get("expired");
        const success = searchParams.get("success");

        if (tokenExpired === "true") {
            setNotification({
                type: "toast",
                variant: "error",
                message: "Ihr Authentifizierungs-Token ist abgelaufen. Bitte melden Sie sich erneut an.",
            });

            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }

        if (success === "true") {
            setNotification({ type: "toast", variant: "success", message: "Abmeldung erfolgreich." });

            setTimeout(() => {
                setNotification(null);
            }, 5000);

            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete("success");
            router.replace(cleanUrl.toString());
        }
    }, [searchParams, router]);

    const validateForm = () => {
        const inputErrors: any = {};

        if (!usernameOrEmail.trim()) {
            inputErrors.usernameOrEmail = "Bitte geben Sie Ihren Benutzernamen oder Ihre E-Mail-Adresse an.";
        }

        if (!password.trim()) {
            inputErrors.password = "Bitte geben Sie ein gültiges Passwort an.";
        }

        setErrors(inputErrors);
        const isValid = Object.keys(inputErrors).length === 0;

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("username_or_email", usernameOrEmail);
            formData.append("password", password);

            try {
                const response = await fetch("http://127.0.0.1:5000/login", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const { jwt_access_token, theme } = data;
                    document.cookie = `jwt_access_token=${jwt_access_token}; path=/`;
                    setTheme(theme);
                    router.push("/account/profile?success=true");
                } else {
                    setNotification({ type: "toast", variant: "error", message: "Anmeldung fehlgeschlagen." });

                    const errorData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [errorData.check]: errorData.error,
                    }));
                }
            } catch (error) {
                console.error("Login request error:", error);
            }
        }
    };

    if (isLoading) {
        return <Spinner size="lg" centered={true} />;
    }

    return (
        <>
            {notification && (
                <Notification type={notification.type} variant={notification.variant} message={notification.message} />
            )}

            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.container}>
                <Heading as="h1" variant="md" headingText="Anmelden" />
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputFields}>
                        <div className={styles.labelInput}>
                            <label htmlFor="username-or-email">
                                Benutzername oder E-Mail <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="username-or-email"
                                name="username-or-email"
                                value={usernameOrEmail}
                                onChange={(event) => setUsernameOrEmail(event.target.value)}
                                required
                            />
                            {errors.usernameOrEmail && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.usernameOrEmail}
                                    size="small"
                                    describedById="username-or-email"
                                />
                            )}

                            {errors.backend_username_or_email && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_username_or_email}
                                    size="small"
                                    describedById="username-or-email"
                                />
                            )}
                        </div>

                        <div className={styles.labelInput}>
                            <label htmlFor="password">
                                Passwort <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            {errors.password && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.password}
                                    size="small"
                                    describedById="password"
                                />
                            )}

                            {errors.backend_password && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_password}
                                    size="small"
                                    describedById="password"
                                />
                            )}
                        </div>
                    </div>

                    <Button variant="primary" buttonText="Anmelden" type="submit" />
                </form>
                <Divider className={styles.customDivider} />
                <section className={styles.secondarySection}>
                    <Heading as="h2" variant="md" headingText="Sind Sie neu bei Skin Cancer Detection?" />
                    <Link
                        href="/register"
                        linkText="Zur Registrierung"
                        mode="default"
                        aria-label="Gehen Sie zur Registrierung"
                        className={styles.registrationLink}
                    />
                </section>
            </div>
        </>
    );
};

export default Login;
