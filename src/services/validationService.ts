export const validatePersonalData = (firstName: string, lastName: string, username: string, email: string) => {
    const inputErrors: Record<string, string> = {};

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

    const isValid = Object.keys(inputErrors).length === 0;

    return { isValid, inputErrors };
};

export const validatePasswords = (newPassword: string, newPasswordConfirmation: string, currentPassword: string) => {
    const passwordErrors: Record<string, string> = {};

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
            passwordErrors.passwordLowercaseLetter = "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.";
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

    const isValid = Object.keys(passwordErrors).length === 0;

    return { isValid, passwordErrors };
};
