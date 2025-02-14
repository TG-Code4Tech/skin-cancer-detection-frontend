"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Icon from "@/components/Icon/Icon";
import Text from "@/components/Text/Text";
import Notification from "@/components/Notification/Notification";
import { GlobalNotification } from "@/types/globalTypes";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PasswordPolicies from "@/components/PasswordPolicies/PasswordPolicies";
import Spinner from "@/components/Spinner/Spinner";
import { validateRegisterData } from "@/services/validationService";
import { register } from "@/services/authenticationService";

const Register = () => {
    const [notification, setNotification] = useState<GlobalNotification | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Registrierung", href: "/register" },
    ];

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const success = searchParams.get("success");

        if (success === "true") {
            setNotification({ type: "toast", variant: "success", message: "Account erfolgreich gelöscht." });

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

        if (!firstName.trim()) {
            inputErrors.firstName = "Bitte einen Vornamen angeben.";
        }

        if (!lastName.trim()) {
            inputErrors.lastName = "Bitte einen Nachnamen angeben.";
        }

        if (!username.trim()) {
            inputErrors.username = "Bitte einen Benutzernamen angeben.";
        }

        if (!email.trim()) {
            inputErrors.email = "Bitte eine gültige E-Mail-Adresse angeben.";
        }

        if (!password.trim()) {
            inputErrors.password = "Bitte ein gültiges Passwort angeben.";
        } else {
            if (password.length < 8) {
                inputErrors.passwordLength = "Das Passwort muss aus mindestens 8 Zeichen bestehen.";
            }

            if (!/[A-Z]/.test(password)) {
                inputErrors.passwordUppercaseLetter = "Das Passwort muss mindestens einen Großbuchstaben enthalten.";
            }

            if (!/[a-z]/.test(password)) {
                inputErrors.passwordLowercaseLetter = "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.";
            }

            if (!/\d/.test(password)) {
                inputErrors.passwordNumber = "Das Passwort muss mindestens eine Zahl enthalten.";
            }

            if (!/[@$!%*?&#<>|_-]/.test(password)) {
                inputErrors.passwordSpecialCharacters =
                    "Das Passwort muss mindestens eines der folgenden Sonderzeichen enthalten: @$!%*?&#<>|_-.";
            }

            if (!/^[a-zA-Z0-9@$!%*?&#<>|_-]*$/.test(password)) {
                inputErrors.passwordInvalidSpecialCharacters =
                    "Das Passwort darf nur die folgenden Sonderzeichen enthalten: @$!%*?&#<>|_-.";
            }
        }

        if (password !== passwordConfirmation) {
            inputErrors.passwordConfirmation = "Die Passwörter stimmen nicht überein.";
        }

        setErrors(inputErrors);
        const isValid = Object.keys(inputErrors).length === 0;

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { isValid, inputErrors } = validateRegisterData(
            firstName,
            lastName,
            username,
            email,
            password,
            passwordConfirmation
        );
        setErrors(inputErrors);

        if (isValid) {
            const { success, errorData, error } = await register(
                firstName,
                lastName,
                username,
                email,
                password,
                passwordConfirmation
            );

            if (success) {
                router.push("/account/profile?register=true");
                return;
            } else {
                if (errorData) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [errorData.check]: errorData.error,
                    }));
                }
                setNotification({ type: "toast", variant: "error", message: error || "Registrierung fehlgeschlagen." });
                setTimeout(() => setNotification(null), 5000);
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
                <Heading as="h1" variant="md" headingText="Registrieren" />
                <form className={styles.form} onSubmit={handleSubmit}>
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
                                onChange={(event) => setLastName(event.target.value)}
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
                            <label htmlFor="username">
                                Benutzername <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                            {errors.username && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.username}
                                    size="small"
                                    describedById="username"
                                />
                            )}

                            {errors.backend_username && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_username}
                                    size="small"
                                    describedById="username"
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

                            <PasswordPolicies password={password} errors={errors} />
                        </div>

                        <div className={styles.labelInput}>
                            <label htmlFor="password-confirmation">
                                Passwort bestätigen <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="password"
                                id="password-confirmation"
                                name="password-confirmation"
                                value={passwordConfirmation}
                                onChange={(event) => setPasswordConfirmation(event.target.value)}
                                required
                            />

                            <PasswordPolicies
                                password={password}
                                errors={errors}
                                passwordConfirmation={passwordConfirmation}
                                showOnlyPasswordConfirmation={true}
                            />
                        </div>
                    </div>

                    <Button variant="primary" buttonText="Registrieren" type="submit" />
                </form>
                <Divider className={styles.customDivider} />
                <section className={styles.secondarySection}>
                    <Heading as="h2" variant="md" headingText="Sie haben bereits einen Account?" />
                    <Link
                        href="/login"
                        linkText="Zur Anmeldung"
                        mode="default"
                        aria-label="Gehen Sie zur Anmeldung"
                        className={styles.loginLink}
                    />
                </section>
            </div>
        </>
    );
};

export default Register;
