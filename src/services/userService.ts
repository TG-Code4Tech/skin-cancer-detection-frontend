import { deleteCookie } from "@/utils/cookie";

export const updateFirstName = async (firstName: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("first_name", firstName);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-first-name", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { message: "Persönliche Angaben wurden erfolgreich geändert." };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const updateLastName = async (lastName: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("last_name", lastName);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-last-name", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { message: "Persönliche Angaben wurden erfolgreich geändert." };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const updateEmail = async (email: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("email", email);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-email", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { message: "Persönliche Angaben wurden erfolgreich geändert." };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const updateUsername = async (username: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("email", username);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-username", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { message: "Persönliche Angaben wurden erfolgreich geändert." };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const updatePassword = async (
    newPassword: string,
    newPasswordConfirmation: string,
    currentPassword: string,
    token: string | undefined | null
) => {
    const formData = new FormData();
    formData.append("current_password", currentPassword);
    formData.append("password", newPassword);
    formData.append("password_confirmation", newPasswordConfirmation);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-password", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return { message: "Ihr Passwort wurde erfolgreich geändert." };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const updateTheme = async (theme: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("theme", theme);

    try {
        const response = await fetch("http://127.0.0.1:5000/update-theme", {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { message: "Das Theme wurde erfolgreich geändert.", theme: data.theme };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }

            const errorData = await response.json();
            return { error: errorData.error, check: errorData.check };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const fetchUserData = async (token: string | undefined | null) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/get-user-data", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }
            return { error: "Ein Fehler ist aufgetreten." };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const deleteUser = async (userId: string, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("user_id", userId);

    try {
        const response = await fetch("http://127.0.0.1:5000/delete-account", {
            method: "DELETE",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            deleteCookie("jwt_access_token");
            return { success: true };
        } else {
            if (response.status === 401) {
                return { error: "UNAUTHORIZED" };
            }
            return { error: "Ihr Account konnte nicht gelöscht werden. Bitte versuchen Sie es erneut." };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};
