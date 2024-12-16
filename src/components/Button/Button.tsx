import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "secondary" | "warning" | "danger";

const variantStyles = {
    default: {
        buttonStyle: styles.defaultButton,
    },
    primary: {
        buttonStyle: styles.primaryButton,
    },
    secondary: {
        buttonStyle: styles.secondaryButton,
    },
    warning: {
        buttonStyle: styles.warningButton,
    },
    danger: {
        buttonStyle: styles.dangerButton,
    },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant;
    buttonText: string;
}

const Button = ({ variant, buttonText, ...props }: ButtonProps) => {
    const { buttonStyle } = variantStyles[variant];

    return (
        <button className={`${styles.button} ${buttonStyle}`} {...props}>
            {buttonText}
        </button>
    );
};

export default Button;
