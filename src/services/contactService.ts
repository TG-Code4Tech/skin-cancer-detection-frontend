export const sendMessage = async (firstName: string, lastName: string, email: string, matter: string) => {
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
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, errorData };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es erneut." };
    }
};
