export const login = async (usernameOrEmail: string, password: string) => {
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
            const { jwt_access_token } = data;
            document.cookie = `jwt_access_token=${jwt_access_token}; path=/`;
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
) => {
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
            const { jwt_access_token } = data;
            document.cookie = `jwt_access_token=${jwt_access_token}; path=/`;
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, errorData };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};
