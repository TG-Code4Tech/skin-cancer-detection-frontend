import React from "react";
import styles from "./Heading.module.css";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingVariant = "sm" | "md" | "lg" | "xl";

const variantStyles = {
    sm: {
        headingStyle: styles.headingSm,
    },
    md: {
        headingStyle: styles.headingMd,
    },
    lg: {
        headingStyle: styles.headingLg,
    },
    xl: {
        headingStyle: styles.headingXl,
    },
};

interface HeadingProps {
    as: HeadingLevel;
    variant: HeadingVariant;
    headingText: string;
}

const Heading = ({ as, variant, headingText }: HeadingProps) => {
    const { headingStyle } = variantStyles[variant];

    switch (as) {
        case "h1":
            return <h1 className={headingStyle}>{headingText}</h1>;
        case "h2":
            return <h2 className={headingStyle}>{headingText}</h2>;
        case "h3":
            return <h3 className={headingStyle}>{headingText}</h3>;
        case "h4":
            return <h4 className={headingStyle}>{headingText}</h4>;
        case "h5":
            return <h5 className={headingStyle}>{headingText}</h5>;
        case "h6":
            return <h6 className={headingStyle}>{headingText}</h6>;
        default:
            return null;
    }
};

export default Heading;
