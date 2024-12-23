"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Logo.module.css";

type Context = "default" | "footer";
interface LogoProps {
    context?: Context;
}

const Logo = ({ context = "default" }: LogoProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const bodyObserver = new MutationObserver(() => {
            const isDarkModeActive = document.body.hasAttribute("dark-mode");
            setIsDarkMode(isDarkModeActive);
        });

        bodyObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["dark-mode"],
        });

        setIsDarkMode(document.body.hasAttribute("dark-mode"));

        return () => bodyObserver.disconnect();
    }, []);

    return (
        <a href="/" aria-label="Gehen Sie zur Startseite">
            <Image
                src={
                    !isDarkMode && context === "default"
                        ? "/images/logos/scd-logo.svg"
                        : "/images/logos/scd-logo-dark.svg"
                }
                alt="Skin Cancer Detection Logo"
                width={148}
                height={50}
                className={styles.logoImage}
            />
        </a>
    );
};

export default Logo;
