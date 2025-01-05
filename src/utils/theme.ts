import { Theme } from "@/types/globalTypes";

export const setTheme = (theme: Theme) => {
    if (theme === "dark") {
        document.body.setAttribute("data-dark-mode", "true");
    } else {
        document.body.removeAttribute("data-dark-mode");
    }
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Strict`;
};
