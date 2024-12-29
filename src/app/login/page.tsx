"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Text from "@/components/Text/Text";
import Icon from "@/components/Icon/Icon";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const inputErrors: any = {};

        if (!usernameOrEmail.trim()) {
            inputErrors.usernameOrEmail = "Bitte einen Bnutzernamen oder eine E-Mail-Adresse angeben.";
        }

        if (!password.trim()) {
            inputErrors.password = "Bitte ein gültiges Passwort angeben.";
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
                    console.log("Logged in successfully:", data);
                    const { jwt_access_token } = data;
                    document.cookie = `jwt_access_token=${jwt_access_token}; path=/`;
                    router.push("/account/profile");
                } else {
                    const errorData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        backend: errorData.error,
                    }));
                    console.error("Login failed:", response.statusText);
                }
            } catch (error) {
                console.error("Login request error:", error);
            }
        }
    };

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Lädt...</div>;
    }

    return (
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
                            <span className={styles.passwordPolicy}>
                                <Icon name="danger" size={18} color="danger" />
                                <Text variant="sm" text={errors.usernameOrEmail} classname={styles.errorText} />
                            </span>
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
                            <span className={styles.passwordPolicy}>
                                <Icon name="danger" size={18} color="danger" />
                                <Text variant="sm" text={errors.password} classname={styles.errorText} />
                            </span>
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
    );
};

export default Login;
