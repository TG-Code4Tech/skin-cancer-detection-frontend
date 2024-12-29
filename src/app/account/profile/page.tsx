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
import Modal from "@/components/Modal/Modal";

const Profile = () => {
    const [userData, setUserData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [ispasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isUserDataModalOpen, setIsUserDataModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const validatePersonalData = () => {
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

        setErrors(inputErrors);
        const isValid = Object.keys(inputErrors).length === 0;

        return isValid;
    };

    const onChangePersonalData = async () => {
        if (validatePersonalData()) {
            const jwtCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt_access_token"));
            const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

            if (!jwtToken) {
                console.error("Kein JWT-Token gefunden");
                return;
            }

            if (firstName !== userData.first_name) {
                const updateFirstNameFormData = new FormData();
                updateFirstNameFormData.append("first_name", firstName);

                try {
                    const response = await fetch("http://127.0.0.1:5000/update-first-name", {
                        method: "PUT",
                        body: updateFirstNameFormData,
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            if (lastName !== userData.last_name) {
                const updateLastNameFormData = new FormData();
                updateLastNameFormData.append("last_name", lastName);

                try {
                    const response = await fetch("http://127.0.0.1:5000/update-last-name", {
                        method: "PUT",
                        body: updateLastNameFormData,
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            if (email !== userData.email) {
                const updateEmailFormData = new FormData();
                updateEmailFormData.append("email", email);

                try {
                    const response = await fetch("http://127.0.0.1:5000/update-email", {
                        method: "PUT",
                        body: updateEmailFormData,
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            if (username !== userData.username) {
                const updateUsernameFormData = new FormData();
                updateUsernameFormData.append("username", username);

                try {
                    const response = await fetch("http://127.0.0.1:5000/update-username", {
                        method: "PUT",
                        body: updateUsernameFormData,
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }

            await getUserData();
            setIsUserDataModalOpen(false);
        }
    };

    const validatePasswords = () => {
        const passwordErrors: any = {};

        if (!currentPassword.trim()) {
            passwordErrors.currentPassword = "Bitte Ihr aktuelles Passwort angeben.";
        }

        if (!newPassword.trim()) {
            passwordErrors.newPassword = "Bitte ein gültiges neues Passwort angeben.";
        } else {
            if (newPassword.length < 8) {
                passwordErrors.passwordLength = "Das Passwort muss aus mindestens 8 Zeichen bestehen.";
            }

            if (!/[A-Z]/.test(newPassword)) {
                passwordErrors.passwordUppercaseLetter = "Das Passwort muss mindestens einen Großbuchstaben enthalten.";
            }

            if (!/[a-z]/.test(newPassword)) {
                passwordErrors.passwordLowercaseLetter =
                    "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.";
            }

            if (!/\d/.test(newPassword)) {
                passwordErrors.passwordNumber = "Das Passwort muss mindestens eine Zahl enthalten.";
            }

            if (!/[@$!%*?&#<>|_-]/.test(newPassword)) {
                passwordErrors.passwordSpecialCharacters =
                    "Das Passwort muss mindestens eines der folgenden Sonderzeichen enthalten: @$!%*?&#<>|_-.";
            }

            if (!/^[a-zA-Z0-9@$!%*?&#<>|_-]*$/.test(newPassword)) {
                passwordErrors.passwordInvalidSpecialCharacters =
                    "Das Passwort darf nur die folgenden Sonderzeichen enthalten: @$!%*?&#<>|_-.";
            }
        }

        if (currentPassword === newPassword) {
            passwordErrors.matchingPasswords = "Ihr neues Passwort darf nicht Ihr aktuelles Passwort sein.";
        }

        if (newPassword !== newPasswordConfirmation) {
            passwordErrors.newPasswordConfirmation = "Die neuen Passwörter stimmen nicht überein.";
        }

        setErrors(passwordErrors);
        const isValid = Object.keys(passwordErrors).length === 0;

        return isValid;
    };

    const onChangePassword = async () => {
        if (validatePasswords()) {
            const formData = new FormData();
            formData.append("password", newPassword);

            try {
                const jwtCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt_access_token"));
                const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

                if (!jwtToken) {
                    console.error("Kein JWT-Token gefunden");
                    return;
                }

                const response = await fetch("http://127.0.0.1:5000/update-password", {
                    method: "PUT",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setIsPasswordModalOpen(false);
                }
            } catch (error) {
                console.error("Error:", error);
            }

            await getUserData();
        }
    };

    const onChangeTheme = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        formData.append("theme", event.target.value);

        try {
            const jwtCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("jwt_access_token"));
            const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

            if (!jwtToken) {
                console.error("Kein JWT-Token gefunden");
                return;
            }

            const response = await fetch("http://127.0.0.1:5000/update-theme", {
                method: "PUT",
                body: formData,
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedTheme(data.theme);

                if (data.theme === "dark") {
                    document.body.setAttribute("data-dark-mode", "true");
                } else {
                    document.body.removeAttribute("data-dark-mode");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }

        await getUserData();
    };

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
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setUsername(data.username);
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

    const onDeleteAccount = async () => {
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
                            <div className={styles.userInformation}>
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
                            <Button
                                variant="default"
                                buttonText="Angaben ändern"
                                className={styles.updateDataButton}
                                onClick={() => setIsUserDataModalOpen(true)}
                            />
                        </div>

                        <Modal
                            variant="warning"
                            buttonText="Angaben ändern"
                            isOpen={isUserDataModalOpen}
                            title="Persönliche Angaben ändern"
                            onClose={() => setIsUserDataModalOpen(false)}
                            onConfirm={onChangePersonalData}
                            onAbort={() => {
                                setFirstName(userData.first_name);
                                setLastName(userData.last_name);
                                setEmail(userData.email);
                                setUsername(userData.username);
                                setIsUserDataModalOpen(false);
                            }}
                        >
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
                                    {errors.firstName && <p>{errors.firstName}</p>}
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
                                    {errors.lastName && <p>{errors.lastName}</p>}
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
                                    {errors.username && <p>{errors.username}</p>}
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
                                    {errors.email && <p>{errors.email}</p>}
                                </div>
                            </div>
                        </Modal>
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
                                    onChange={onChangeTheme}
                                />

                                <RadioField
                                    id="dark-mode"
                                    variant="default"
                                    name="dark-mode"
                                    label="Dunkel"
                                    value="dark"
                                    checked={selectedTheme === "dark"}
                                    onChange={onChangeTheme}
                                />
                            </fieldset>
                        </form>
                    </section>

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Passwort" />

                        <div className={styles.passwordContainer}>
                            <div className={styles.passwordInformation}>
                                <Text variant="md">
                                    Passwort: <strong>********</strong>
                                </Text>

                                <Button
                                    variant="default"
                                    buttonText="Passwort ändern"
                                    className={styles.updateDataButton}
                                    onClick={() => setIsPasswordModalOpen(true)}
                                />
                            </div>

                            <span className={styles.warningMessage}>
                                <Icon name="warning" size={16} color="warning" />
                                <Text
                                    variant="sm"
                                    text="Die Anzahl der Asterisken korreliert nicht mit Ihrer Passwortlänge"
                                    classname={styles.passwordHint}
                                />
                            </span>
                        </div>

                        <Modal
                            variant="warning"
                            title="Passwort ändern"
                            buttonText="Passwort ändern"
                            isOpen={ispasswordModalOpen}
                            onClose={() => setIsPasswordModalOpen(false)}
                            onConfirm={onChangePassword}
                        >
                            <div className={styles.inputFields}>
                                <div className={styles.labelInput}>
                                    <label htmlFor="current-password">
                                        Aktuelles Passwort <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="current-password"
                                        name="current-password"
                                        value={currentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value)}
                                        required
                                    />
                                    {errors.currentPassword && (
                                        <span className={styles.errorMessage}>
                                            <Icon name="danger" size={18} color="danger" />
                                            <Text
                                                variant="sm"
                                                text={errors.currentPassword}
                                                classname={styles.errorText}
                                            />
                                        </span>
                                    )}
                                </div>

                                <div className={styles.labelInput}>
                                    <label htmlFor="new-password">
                                        Neues Passwort <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        name="new-password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                        required
                                    />

                                    <div className={styles.passwordPolicies}>
                                        <span className={styles.passwordPolicy}>
                                            {!errors.passwordLength && newPassword.length === 0 && (
                                                <figure className={styles.passwordPolicyIndicator}></figure>
                                            )}
                                            {!errors.passwordLowercaseLetter && /[a-z]/.test(newPassword) && (
                                                <Icon name="check-circle" size={18} color="success" />
                                            )}
                                            {errors.passwordLowercaseLetter ||
                                                (newPassword.length > 0 && !/[a-z]/.test(newPassword) && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                            <Text
                                                variant="sm"
                                                text="Mindestens ein Kleinbuchstabe"
                                                classname={
                                                    errors.passwordLowercaseLetter ||
                                                    (newPassword.length > 0 && !/[a-z]/.test(newPassword))
                                                        ? styles.errorText
                                                        : newPassword.length > 0 && /[a-z]/.test(newPassword)
                                                        ? styles.successText
                                                        : styles.defaultText
                                                }
                                            />
                                        </span>

                                        <span className={styles.passwordPolicy}>
                                            {!errors.passwordLength && newPassword.length === 0 && (
                                                <figure className={styles.passwordPolicyIndicator}></figure>
                                            )}
                                            {!errors.passwordUppercaseLetter && /[A-Z]/.test(newPassword) && (
                                                <Icon name="check-circle" size={18} color="success" />
                                            )}
                                            {errors.passwordUppercaseLetter ||
                                                (newPassword.length > 0 && !/[A-Z]/.test(newPassword) && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                            <Text
                                                variant="sm"
                                                text="Mindestens ein Großbuchstabe"
                                                classname={
                                                    errors.passwordUppercaseLetter ||
                                                    (newPassword.length > 0 && !/[A-Z]/.test(newPassword))
                                                        ? styles.errorText
                                                        : newPassword.length > 0 && /[A-Z]/.test(newPassword)
                                                        ? styles.successText
                                                        : styles.defaultText
                                                }
                                            />
                                        </span>

                                        <span className={styles.passwordPolicy}>
                                            {!errors.passwordLength && newPassword.length === 0 && (
                                                <figure className={styles.passwordPolicyIndicator}></figure>
                                            )}
                                            {!errors.passwordNumber && /\d/.test(newPassword) && (
                                                <Icon name="check-circle" size={18} color="success" />
                                            )}
                                            {errors.passwordNumber ||
                                                (newPassword.length > 0 && !/\d/.test(newPassword) && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                            <Text
                                                variant="sm"
                                                text="Mindestens eine Zahl"
                                                classname={
                                                    errors.passwordNumber ||
                                                    (newPassword.length > 0 && !/\d/.test(newPassword))
                                                        ? styles.errorText
                                                        : newPassword.length > 0 && /\d/.test(newPassword)
                                                        ? styles.successText
                                                        : styles.defaultText
                                                }
                                            />
                                        </span>

                                        <span className={styles.passwordPolicy}>
                                            {!errors.passwordLength && newPassword.length === 0 && (
                                                <figure className={styles.passwordPolicyIndicator}></figure>
                                            )}
                                            {!errors.passwordSpecialCharacters &&
                                                /[@$!%*?&#<>|_-]/.test(newPassword) && (
                                                    <Icon name="check-circle" size={18} color="success" />
                                                )}
                                            {errors.passwordSpecialCharacters ||
                                                (newPassword.length > 0 && !/[@$!%*?&#<>|_-]/.test(newPassword) && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                            <Text
                                                variant="sm"
                                                text="Mindestens eines dieser erlaubten Sonderzeichen: @$!%*?&#<>|_-"
                                                classname={
                                                    errors.passwordSpecialCharacters ||
                                                    (newPassword.length > 0 && !/[@$!%*?&#<>|_-]/.test(newPassword))
                                                        ? styles.errorText
                                                        : newPassword.length > 0 && /[@$!%*?&#<>|_-]/.test(newPassword)
                                                        ? styles.successText
                                                        : styles.defaultText
                                                }
                                            />
                                        </span>

                                        <span className={styles.passwordPolicy}>
                                            {!errors.passwordLength && newPassword.length === 0 && (
                                                <figure className={styles.passwordPolicyIndicator}></figure>
                                            )}
                                            {!errors.passwordLength && newPassword.length >= 8 && (
                                                <Icon name="check-circle" size={18} color="success" />
                                            )}
                                            {errors.passwordLength ||
                                                (newPassword.length > 0 && newPassword.length < 8 && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                            <Text
                                                variant="sm"
                                                text="Mindestens 8 Zeichen"
                                                classname={
                                                    errors.passwordLength ||
                                                    (newPassword.length > 0 && newPassword.length < 8)
                                                        ? styles.errorText
                                                        : newPassword.length >= 8
                                                        ? styles.successText
                                                        : styles.defaultText
                                                }
                                            />
                                        </span>

                                        {errors.password && <p>{errors.password}</p>}
                                        {errors.passwordLength && <p>{errors.passwordLength}</p>}
                                        {errors.passwordUppercaseLetter && <p>{errors.passwordUppercaseLetter}</p>}
                                        {errors.passwordLowercaseLetter && <p>{errors.passwordLowercaseLetter}</p>}
                                        {errors.passwordNumber && <p>{errors.passwordNumber}</p>}
                                        {errors.passwordSpecialCharacters && <p>{errors.passwordSpecialCharacters}</p>}
                                        {errors.passwordInvalidSpecialCharacters && (
                                            <p>{errors.passwordInvalidSpecialCharacters}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.labelInput}>
                                    <label htmlFor="new-password-confirmation">
                                        Neues Passwort bestätigen <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password-confirmation"
                                        name="new-password-confirmation"
                                        value={newPasswordConfirmation}
                                        onChange={(event) => setNewPasswordConfirmation(event.target.value)}
                                        required
                                    />

                                    <span className={styles.passwordPolicy}>
                                        {!errors.passwordConfirmation && newPasswordConfirmation.length === 0 && (
                                            <figure className={styles.passwordPolicyIndicator}></figure>
                                        )}
                                        {!errors.passwordConfirmation &&
                                            newPasswordConfirmation.length > 0 &&
                                            newPassword === newPasswordConfirmation && (
                                                <Icon name="check-circle" size={18} color="success" />
                                            )}
                                        {errors.passwordConfirmation ||
                                            (newPasswordConfirmation.length > 0 &&
                                                newPassword !== newPasswordConfirmation && (
                                                    <Icon name="danger" size={18} color="danger" />
                                                ))}
                                        <Text
                                            variant="sm"
                                            text="Passwörter müssen übereinstimmen"
                                            classname={
                                                errors.passwordConfirmation ||
                                                (newPasswordConfirmation.length > 0 &&
                                                    newPassword !== newPasswordConfirmation)
                                                    ? styles.errorText
                                                    : newPasswordConfirmation.length > 0 &&
                                                      newPassword === newPasswordConfirmation
                                                    ? styles.successText
                                                    : styles.defaultText
                                            }
                                        />
                                    </span>

                                    {errors.passwordConfirmation && <p>{errors.passwordConfirmation}</p>}
                                </div>
                            </div>
                        </Modal>
                    </section>

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Account löschen" />

                        <Button
                            variant="default"
                            buttonText="Account löschen"
                            className={styles.deleteAccountButton}
                            onClick={() => setIsDeleteAccountModalOpen(true)}
                        />

                        <Modal
                            variant="danger"
                            buttonText="Account löschen"
                            isOpen={isDeleteAccountModalOpen}
                            title="Sie möchten Ihren Account löschen?"
                            onClose={() => setIsDeleteAccountModalOpen(false)}
                            onConfirm={onDeleteAccount}
                        >
                            <Text variant="md">
                                Wenn Sie Ihren Account löschen gehen alle Ihre Daten verloren. Diese können nicht
                                wiederhergestellt werden.
                                <br />
                                <br />
                                Sind Sie sicher, dass Sie Ihren Account endgültig löschen möchten?
                            </Text>
                        </Modal>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
