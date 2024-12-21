import React from "react";
import styles from "./Badge.module.css";

type BadgeVariant = "default" | "primary" | "important" | "benign" | "malignant";

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
    benign: {
        badgeStyle: styles.badgeBenign,
    },
    malignant: {
        badgeStyle: styles.badgeMalignant,
    },
};

interface BadgeProps {
    variant: BadgeVariant;
    text: string;
    className?: string;
}

const Badge = ({ variant, text, className = "" }: BadgeProps) => {
    const { badgeStyle } = variantStyles[variant];

    return <span className={`${styles.badge} ${badgeStyle} ${className}`}>{text}</span>;
};

export default Badge;
