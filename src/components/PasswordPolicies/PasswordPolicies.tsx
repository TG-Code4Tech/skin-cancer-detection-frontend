import React from "react";
import PasswordPolicy from "../PasswordPolicy/PasswordPolicy";
import Notification from "../Notification/Notification";
import styles from "./PasswordPolicies.module.css";

interface PasswordPoliciesProps {
    password: string;
    errors: {
        hasLowercaseLetter?: boolean;
        hasUppercaseLetter?: boolean;
        hasNumber?: boolean;
        hasSpecialCharacters?: boolean;
        length?: boolean;
        backendError?: string;
    };
    passwordConfirmation?: string;
    showOnlyPasswordConfirmation?: boolean;
}

const PasswordPolicies = ({
    password,
    errors,
    passwordConfirmation,
    showOnlyPasswordConfirmation,
}: PasswordPoliciesProps) => {
    return (
        <div className={`${styles.passwordPolicies} ${password.length === 0 ? styles.passwordEmpty : ""}`}>
            {showOnlyPasswordConfirmation ? (
                <PasswordPolicy
                    message="Passwörter müssen übereinstimmen"
                    isValid={password === passwordConfirmation && passwordConfirmation !== ""}
                />
            ) : (
                <>
                    <PasswordPolicy
                        message="Mindestens einen Kleinbuchstaben angeben"
                        isValid={/[a-z]/.test(password)}
                    />
                    <PasswordPolicy
                        message="Mindestens einen Großbuchstaben angeben"
                        isValid={/[A-Z]/.test(password)}
                    />
                    <PasswordPolicy message="Mindestens eine Zahl angeben" isValid={/\d/.test(password)} />
                    <PasswordPolicy
                        message="Mindestens eines dieser Sonderzeichen angeben: @$!%*?&#<>|_-"
                        isValid={/[@$!%*?&#<>|_-]/.test(password)}
                    />
                    <PasswordPolicy message="Mindestens 8 Zeichen angeben" isValid={password.length >= 8} />
                </>
            )}

            {errors.backendError && (
                <Notification
                    type="inline"
                    variant="error"
                    message={errors.backendError}
                    size="small"
                    describedById={
                        errors.backendError === "Passwörter stimmen nicht überein."
                            ? "password-confirmation"
                            : "password"
                    }
                />
            )}
        </div>
    );
};

export default PasswordPolicies;
