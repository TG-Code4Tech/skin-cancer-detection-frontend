"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Link from "@/components/Link/Link";
import Text from "@/components/Text/Text";
import Notification from "@/components/Notification/Notification";
import { GlobalNotification } from "@/types/globalTypes";

const Contact = () => {
    const [notification, setNotification] = useState<GlobalNotification | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, seetLastName] = useState("");
    const [email, setEmail] = useState("");
    const [matter, setMatter] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const inputErrors: any = {};

        if (!firstName.trim()) {
            inputErrors.firstName = "Geben Sie bitte Ihren Vornamen an.";
        }

        if (!lastName.trim()) {
            inputErrors.lastName = "Geben Sie bitte Ihren Nachnamen an.";
        }

        if (!email.trim()) {
            inputErrors.email = "Geben Sie bitte Ihre E-Mail-Adresse an.";
        }

        if (!matter.trim()) {
            inputErrors.matter = "Schildern Sie bitte Ihr Anliegen.";
        }

        setErrors(inputErrors);
        const isValid = Object.keys(inputErrors).length === 0;
        console.log(isValid);
        console.log(errors);

        return isValid;
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("email", email);
            formData.append("matter", matter);

            try {
                const response = await fetch("http://127.0.0.1:5000/contact-us", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    setNotification({
                        type: "toast",
                        variant: "success",
                        message: "Nachricht erfolgreich übermittelt.",
                    });
                } else {
                    setNotification({
                        type: "toast",
                        variant: "error",
                        message: "Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es erneut.",
                    });

                    const errorData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [errorData.check]: errorData.error,
                    }));
                }
            } catch (error) {
                console.error("Send request error:", error);
            }
        } else {
            setNotification({
                type: "toast",
                variant: "error",
                message: "Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es erneut.",
            });
        }
    };

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Lädt...</div>;
    }

    return (
        <>
            {notification && (
                <Notification type={notification.type} variant={notification.variant} message={notification.message} />
            )}

            <div className={styles.container}>
                <Heading as="h1" variant="md" headingText="Kontaktieren Sie uns!" />
                <Text variant="md" text="Bitte füllen Sie das folgende Formular aus." />
                <Heading as="h2" variant="sm" headingText="Kontaktformular" />
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.inputFields}>
                        <div className={styles.labelInput}>
                            <label htmlFor="first-name">
                                Vorname <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                            {errors.firstName && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.firstName}
                                    size="small"
                                    describedById="first-name"
                                />
                            )}

                            {errors.backend_first_name && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_first_name}
                                    size="small"
                                    describedById="first-name"
                                />
                            )}
                        </div>

                        <div className={styles.labelInput}>
                            <label htmlFor="last-name">
                                Nachname <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                value={lastName}
                                onChange={(event) => seetLastName(event.target.value)}
                                required
                            />
                            {errors.lastName && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.lastName}
                                    size="small"
                                    describedById="last-name"
                                />
                            )}

                            {errors.backend_last_name && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_last_name}
                                    size="small"
                                    describedById="last-name"
                                />
                            )}
                        </div>

                        <div className={styles.labelInput}>
                            <label htmlFor="email">
                                E-Mail-Adresse <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            {errors.email && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.email}
                                    size="small"
                                    describedById="email"
                                />
                            )}

                            {errors.backend_email && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_email}
                                    size="small"
                                    describedById="email"
                                />
                            )}
                        </div>

                        <div className={styles.labelInput}>
                            <label htmlFor="matter">
                                Ihr Anliegen <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                id="matter"
                                name="matter"
                                rows={5}
                                onChange={(event) => setMatter(event.target.value)}
                                required
                            >
                                {matter}
                            </textarea>
                            {errors.matter && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.matter}
                                    size="small"
                                    describedById="matter"
                                />
                            )}

                            {errors.backend_matter && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_matter}
                                    size="small"
                                    describedById="matter"
                                />
                            )}
                        </div>

                        <div className={styles.privacyPolicyContainer}>
                            <input
                                type="checkbox"
                                id="privacy-policy"
                                name="privacy-policy"
                                className={styles.privacyPolicyInput}
                                required
                            />

                            <label htmlFor="privacy-policy" className={styles.privacyPolicyLabel}>
                                Ich habe die <Link href="/privacy-policy" linkText="Datenschutzhinweise" /> zur Kenntnis
                                genommen.<span className={styles.required}>*</span>
                            </label>
                        </div>
                    </div>

                    <Button variant="primary" buttonText="Nachricht senden" type="submit" />
                </form>
            </div>
        </>
    );
};

export default Contact;
