import React from "react";
import styles from "./Badge.module.css";

type BadgeVariant = "default" | "primary" | "important";

const variantStyles = {
    default: {
        badgeStyle: styles.badgeDefault,
    },
    primary: {
        badgeStyle: styles.badgePrimary,
    },
    important: {
        badgeStyle: styles.badgeImportant,
    },
};

interface BadgeProps {
    variant: BadgeVariant;
    text: string;
}

const Badge = ({ variant, text }: BadgeProps) => {
    const { badgeStyle } = variantStyles[variant];

    return <span className={`${styles.badge} ${badgeStyle}`}>{text}</span>;
};

export default Badge;
