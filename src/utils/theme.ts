import { Theme } from "@/types/globalTypes";

export const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
};

export const loadTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.setAttribute("data-dark-mode", "true");
    } else {
        document.body.removeAttribute("data-dark-mode");
    }
};
