export const fetchAllAnalyses = async (token: string | undefined | null) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/get-all-analyses", {
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

export const uploadSkinLesion = async (skinLesionImage: File, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("skin-lesion-image", skinLesionImage);

    try {
        const response = await fetch("http://127.0.0.1:5000/upload-skin-lesion", {
            method: "POST",
            body: formData,
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
            return { error: "Ein Fehler ist beim Hochladen der Hautläsion aufgetreten." };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};

export const analyzeSkinLesion = async (imageId: string, skinLesionImage: File, token: string | undefined | null) => {
    const formData = new FormData();
    formData.append("skin-lesion-image", skinLesionImage);
    formData.append("image_id", imageId);

    try {
        const response = await fetch("http://127.0.0.1:5000/analyze-skin-lesion", {
            method: "POST",
            body: formData,
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
            return { error: "Ein Fehler ist bei der Analyse der Hautläsion aufgetreten." };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Ein unerwarteter Fehler ist aufgetreten." };
    }
};
