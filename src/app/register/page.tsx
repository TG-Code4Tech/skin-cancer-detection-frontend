"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Icon from "@/components/Icon/Icon";
import Text from "@/components/Text/Text";
import Notification from "@/components/Notification/Notification";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

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

        if (validateForm()) {
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("password_confirmation", passwordConfirmation);

            try {
                const response = await fetch("http://127.0.0.1:5000/register", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Registered successfully:", data);
                    const { jwt_access_token } = data;
                    document.cookie = `jwt_access_token=${jwt_access_token}; path=/`;
                    router.push("/");
                } else {
                    const errorData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [errorData.check]: errorData.error,
                    }));
                    console.error("Registration failed:", response.statusText);
                }
            } catch (error) {
                console.error("Register request error:", error);
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
                            <Notification type="inline" variant="error" message={errors.firstName} size="small" />
                        )}

                        {errors.backend_first_name && (
                            <Notification
                                type="inline"
                                variant="error"
                                message={errors.backend_first_name}
                                size="small"
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
                            <Notification type="inline" variant="error" message={errors.lastName} size="small" />
                        )}

                        {errors.backend_last_name && (
                            <Notification
                                type="inline"
                                variant="error"
                                message={errors.backend_last_name}
                                size="small"
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
                            <Notification type="inline" variant="error" message={errors.username} size="small" />
                        )}

                        {errors.backend_username && (
                            <Notification
                                type="inline"
                                variant="error"
                                message={errors.backend_username}
                                size="small"
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
                            <Notification type="inline" variant="error" message={errors.email} size="small" />
                        )}

                        {errors.backend_email && (
                            <Notification type="inline" variant="error" message={errors.backend_email} size="small" />
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

                        <div className={styles.passwordPolicies}>
                            <span className={styles.passwordPolicy}>
                                {!errors.passwordLength && password.length === 0 && (
                                    <figure className={styles.passwordPolicyIndicator}></figure>
                                )}
                                {!errors.passwordLowercaseLetter && /[a-z]/.test(password) && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                                {errors.passwordLowercaseLetter ||
                                    (password.length > 0 && !/[a-z]/.test(password) && (
                                        <Icon name="danger" size={18} color="danger" />
                                    ))}
                                <Text
                                    variant="sm"
                                    text="Mindestens ein Kleinbuchstabe"
                                    classname={
                                        errors.passwordLowercaseLetter ||
                                        (password.length > 0 && !/[a-z]/.test(password))
                                            ? styles.errorText
                                            : password.length > 0 && /[a-z]/.test(password)
                                            ? styles.successText
                                            : styles.defaultText
                                    }
                                />
                            </span>

                            <span className={styles.passwordPolicy}>
                                {!errors.passwordLength && password.length === 0 && (
                                    <figure className={styles.passwordPolicyIndicator}></figure>
                                )}
                                {!errors.passwordUppercaseLetter && /[A-Z]/.test(password) && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                                {errors.passwordUppercaseLetter ||
                                    (password.length > 0 && !/[A-Z]/.test(password) && (
                                        <Icon name="danger" size={18} color="danger" />
                                    ))}
                                <Text
                                    variant="sm"
                                    text="Mindestens ein Großbuchstabe"
                                    classname={
                                        errors.passwordUppercaseLetter ||
                                        (password.length > 0 && !/[A-Z]/.test(password))
                                            ? styles.errorText
                                            : password.length > 0 && /[A-Z]/.test(password)
                                            ? styles.successText
                                            : styles.defaultText
                                    }
                                />
                            </span>

                            <span className={styles.passwordPolicy}>
                                {!errors.passwordLength && password.length === 0 && (
                                    <figure className={styles.passwordPolicyIndicator}></figure>
                                )}
                                {!errors.passwordNumber && /\d/.test(password) && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                                {errors.passwordNumber ||
                                    (password.length > 0 && !/\d/.test(password) && (
                                        <Icon name="danger" size={18} color="danger" />
                                    ))}
                                <Text
                                    variant="sm"
                                    text="Mindestens eine Zahl"
                                    classname={
                                        errors.passwordNumber || (password.length > 0 && !/\d/.test(password))
                                            ? styles.errorText
                                            : password.length > 0 && /\d/.test(password)
                                            ? styles.successText
                                            : styles.defaultText
                                    }
                                />
                            </span>

                            <span className={styles.passwordPolicy}>
                                {!errors.passwordLength && password.length === 0 && (
                                    <figure className={styles.passwordPolicyIndicator}></figure>
                                )}
                                {!errors.passwordSpecialCharacters && /[@$!%*?&#<>|_-]/.test(password) && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                                {errors.passwordSpecialCharacters ||
                                    (password.length > 0 && !/[@$!%*?&#<>|_-]/.test(password) && (
                                        <Icon name="danger" size={18} color="danger" />
                                    ))}
                                <Text
                                    variant="sm"
                                    text="Mindestens eines dieser erlaubten Sonderzeichen: @$!%*?&#<>|_-"
                                    classname={
                                        errors.passwordSpecialCharacters ||
                                        (password.length > 0 && !/[@$!%*?&#<>|_-]/.test(password))
                                            ? styles.errorText
                                            : password.length > 0 && /[@$!%*?&#<>|_-]/.test(password)
                                            ? styles.successText
                                            : styles.defaultText
                                    }
                                />
                            </span>

                            <span className={styles.passwordPolicy}>
                                {!errors.passwordLength && password.length === 0 && (
                                    <figure className={styles.passwordPolicyIndicator}></figure>
                                )}
                                {!errors.passwordLength && password.length >= 8 && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                                {errors.passwordLength ||
                                    (password.length > 0 && password.length < 8 && (
                                        <Icon name="danger" size={18} color="danger" />
                                    ))}
                                <Text
                                    variant="sm"
                                    text="Mindestens 8 Zeichen"
                                    classname={
                                        errors.passwordLength || (password.length > 0 && password.length < 8)
                                            ? styles.errorText
                                            : password.length >= 8
                                            ? styles.successText
                                            : styles.defaultText
                                    }
                                />
                            </span>

                            {errors.backend_password && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_password}
                                    size="small"
                                />
                            )}

                            {errors.backend_password_confirmation && (
                                <Notification
                                    type="inline"
                                    variant="error"
                                    message={errors.backend_password_confirmation}
                                    size="small"
                                />
                            )}
                        </div>
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

                        <span className={styles.passwordPolicy}>
                            {!errors.passwordConfirmation && passwordConfirmation.length === 0 && (
                                <figure className={styles.passwordPolicyIndicator}></figure>
                            )}
                            {!errors.passwordConfirmation &&
                                passwordConfirmation.length > 0 &&
                                password === passwordConfirmation && (
                                    <Icon name="check-circle" size={18} color="success" />
                                )}
                            {errors.passwordConfirmation ||
                                (passwordConfirmation.length > 0 && password !== passwordConfirmation && (
                                    <Icon name="danger" size={18} color="danger" />
                                ))}
                            <Text
                                variant="sm"
                                text="Passwörter müssen übereinstimmen"
                                classname={
                                    errors.passwordConfirmation ||
                                    (passwordConfirmation.length > 0 && password !== passwordConfirmation)
                                        ? styles.errorText
                                        : passwordConfirmation.length > 0 && password === passwordConfirmation
                                        ? styles.successText
                                        : styles.defaultText
                                }
                            />
                        </span>

                        {errors.backend_password_confirmation && (
                            <Notification
                                type="inline"
                                variant="error"
                                message={errors.backend_password_confirmation}
                                size="small"
                            />
                        )}
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
    );
};

export default Register;
