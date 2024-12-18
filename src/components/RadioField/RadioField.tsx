import React, { useState } from "react";
import styles from "./RadioField.module.css";

type RadioFieldVariant = "default" | "required";

interface RadioFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant: RadioFieldVariant;
    label: string;
    id: string;
    value: string;
}

const RadioField = ({ variant, label, id, value, ...props }: RadioFieldProps) => {
    const [selectedValue, setSelectedValue] = useState("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <span className={styles.radioField}>
            <input
                type="radio"
                id={id}
                value={value}
                checked={selectedValue === value}
                onChange={onChange}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </span>
    );
};

export default RadioField;
