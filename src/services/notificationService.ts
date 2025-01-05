import { GlobalNotification } from "@/types/globalTypes";

export const getNotificationFromUrl = (searchParams: URLSearchParams): GlobalNotification | null => {
    const success = searchParams.get("success");
    const registration = searchParams.get("register");

    if (success === "true") {
        return { type: "toast", variant: "success", message: "Anmeldung erfolgreich." };
    }

    if (registration === "true") {
        return { type: "toast", variant: "success", message: "Registrierung erfolgreich." };
    }

    return null;
};
