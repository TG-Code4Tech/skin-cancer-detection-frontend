import React from "react";
import styles from "./Text.module.css";

type TextVariant = "sm" | "md" | "lg";

const variantStyles = {
    sm: {
        textStyle: styles.textSm,
    },
    md: {
        textStyle: styles.textMd,
    },
    lg: {
        textStyle: styles.textLg,
    },
};

interface TextProps {
    variant: TextVariant;
    text?: string;
    children?: React.ReactNode;
    classname?: string;
}

const Text = ({ variant, text, children, classname = "" }: TextProps) => {
    const { textStyle } = variantStyles[variant];
    const textContent = text || children;

    return <p className={`${textStyle} ${classname}`}>{textContent}</p>;
};

export default Text;
