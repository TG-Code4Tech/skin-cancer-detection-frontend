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
    text: string;
    classname?: string;
}

const Text = ({ variant, text, classname = "" }: TextProps) => {
    const { textStyle } = variantStyles[variant];

    return <p className={`${textStyle} ${classname}`}>{text}</p>;
};

export default Text;
