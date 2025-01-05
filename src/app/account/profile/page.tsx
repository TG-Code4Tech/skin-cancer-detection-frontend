"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import SubNavigation from "@/components/SubNavigation/SubNavigation";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import Notification from "@/components/Notification/Notification";
import { deleteCookie, getCookie } from "@/utils/cookie";
import { isAuthenticated } from "@/utils/authentication";
import RadioField from "@/components/RadioField/RadioField";
import Icon from "@/components/Icon/Icon";
import Modal from "@/components/Modal/Modal";
import { GlobalNotification, Theme } from "@/types/globalTypes";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { loadTheme, setTheme } from "@/utils/theme";
import PasswordPolicies from "@/components/PasswordPolicies/PasswordPolicies";
import { getNotificationFromUrl } from "@/services/notificationService";
import { removeUrlSearchParams } from "@/services/urlService";
import { validatePasswords, validatePersonalData } from "@/services/validationService";
import {
    deleteUser,
    fetchUserData,
    updateEmail,
    updateFirstName,
    updateLastName,
    updatePassword,
    updateTheme,
    updateUsername,
} from "@/services/userService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Profile = () => {
    const [notification, setNotification] = useState<GlobalNotification | null>(null);
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
    const searchParams = useSearchParams();
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Mein Profil", href: "/account/profile" },
    ];
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
        loadTheme();
    }, []);

    useEffect(() => {
        const notification = getNotificationFromUrl(searchParams);

        if (notification) {
            setNotification(notification);
            setTimeout(() => setNotification(null), 5000);
            removeUrlSearchParams(router, ["success", "register"]);
        }
    }, [searchParams, router]);

    const handleUpdateResponse = (
        result: { message?: string; error?: string; check?: string; theme?: Theme },
        fallbackMessage: string
    ) => {
        if (result.message) {
            setNotification({ type: "toast", variant: "success", message: result.message! });

            if (result.theme) {
                setSelectedTheme(result.theme);
                setTheme(result.theme);
                loadTheme();
            }
        } else if (result.error === "UNAUTHORIZED") {
            router.push("/login?expired=true");
        } else {
            setNotification({ type: "toast", variant: "error", message: fallbackMessage });

            if (result.check) {
                setErrors((prevErrors) => ({ ...prevErrors, [result.check!]: result.error ?? "" }));
            }
        }

        setTimeout(() => setNotification(null), 5000);
    };

    const onChangePersonalData = async () => {
        const { isValid, inputErrors } = validatePersonalData(firstName, lastName, username, email);
        setErrors(inputErrors);

        if (isValid) {
            if (isAuthenticated() === false) {
                router.push("/login?expired=true");
                return;
            }

            const token = getCookie("jwt_access_token");
            const fallbackMessage = "Persönliche Angaben konnten nicht oder nicht alle geändert werden.";

            if (firstName !== userData.first_name) {
                const result = await updateFirstName(firstName, token);
                handleUpdateResponse(result, fallbackMessage);
            }

            if (lastName !== userData.last_name) {
                const result = await updateLastName(lastName, token);
                handleUpdateResponse(result, fallbackMessage);
            }

            if (username !== userData.username) {
                const result = await updateUsername(username, token);
                handleUpdateResponse(result, fallbackMessage);
            }

            if (email !== userData.email) {
                const result = await updateEmail(email, token);
                handleUpdateResponse(result, fallbackMessage);
            }

            await getUserData();
            setIsUserDataModalOpen(false);
        }
    };

    const onChangePassword = async () => {
        const { isValid, passwordErrors } = validatePasswords(newPassword, newPasswordConfirmation, currentPassword);
        setErrors(passwordErrors);

        if (isValid) {
            if (!isAuthenticated()) {
                router.push("/login?expired=true");
                return;
            }

            const token = getCookie("jwt_access_token");
            const fallbackMessage = "Ihr Passwort konnte leider nicht geändert werden.";

            const result = await updatePassword(newPassword, newPasswordConfirmation, currentPassword, token);
            handleUpdateResponse(result, fallbackMessage);

            await getUserData();
        }
    };

    const onChangeTheme = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");

            return;
        }

        const token = getCookie("jwt_access_token");
        const fallbackMessage = "Das Theme konnte leider nicht geändert werden.";

        const result = await updateTheme(event.target.value, token);
        handleUpdateResponse(result, fallbackMessage);

        await getUserData();
    };

    const getUserData = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");
            return;
        }

        const token = getCookie("jwt_access_token");
        const result = await fetchUserData(token);

        if (result.error) {
            if (result.error === "UNAUTHORIZED") {
                router.push("/login?expired=true");
            }
        } else {
            setUserData(result);
            setFirstName(result.first_name);
            setLastName(result.last_name);
            setEmail(result.email);
            setUsername(result.username);
            setSelectedTheme(result.theme);
        }
    };

    const logout = () => {
        deleteCookie("jwt_access_token");
        router.push("/login?success=true");
    };

    const onDeleteAccount = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");

            return;
        }

        const token = getCookie("jwt_access_token");
        const result = await deleteUser(userData.user_id, token);

        if (result.success) {
            router.push("/login?success=true");
        } else {
            if (result.error) {
                setNotification({ type: "toast", variant: "error", message: result.error });
                setTimeout(() => setNotification(null), 5000);
            }
        }
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");
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
        <>
            {notification && (
                <Notification type={notification.type} variant={notification.variant} message={notification.message} />
            )}

            <Breadcrumbs breadcrumbs={breadcrumbs} />

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
                                </div>
                            </Modal>
                        </section>

                        <section className={styles.section}>
                            <Heading as="h2" variant="sm" headingText="Theme" />

                            <form className={`${styles.informationContainer} ${styles.themeForm}`}>
                                <fieldset className={styles.fieldsetTheme}>
                                    <legend>
                                        Wählen Sie zwischen einem hellen oder einem dunklen Erscheinungsbild:
                                    </legend>

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

                                <Notification
                                    type="area"
                                    variant="warning"
                                    message="Die Anzahl der Asterisken korreliert nicht mit Ihrer Passwortlänge"
                                />
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
                                            <Notification
                                                type="inline"
                                                variant="error"
                                                message={errors.currentPassword}
                                                size="small"
                                                describedById="current-password"
                                            />
                                        )}

                                        {errors.backend_current_password && (
                                            <Notification
                                                type="inline"
                                                variant="error"
                                                message={errors.backend_current_password}
                                                size="small"
                                                describedById="current-password"
                                            />
                                        )}
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label htmlFor="password">
                                            Neues Passwort <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                            required
                                        />

                                        <PasswordPolicies password={newPassword} errors={errors} />
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label htmlFor="password-confirmation">
                                            Neues Passwort bestätigen <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="password"
                                            id="password-confirmation"
                                            name="password-confirmation"
                                            value={newPasswordConfirmation}
                                            onChange={(event) => setNewPasswordConfirmation(event.target.value)}
                                            required
                                        />

                                        <PasswordPolicies
                                            password={newPassword}
                                            errors={errors}
                                            passwordConfirmation={newPasswordConfirmation}
                                            showOnlyPasswordConfirmation={true}
                                        />
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
        </>
    );
};
