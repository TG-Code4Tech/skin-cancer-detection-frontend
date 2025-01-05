import React from "react";
import Icon from "../Icon/Icon";
import { IconSize } from "@/types/globalTypes";
import styles from "./Spinner.module.css";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
    size: SpinnerSize;
    centered?: boolean;
    className?: string;
}

const Spinner = ({ size, centered = false, className = "" }: SpinnerProps) => {
    return (
        <div className={`${styles.spinnerContainer} ${centered ? styles.centered : ""}`}>
            <div className={`${styles.spinner} ${styles[size]} ${className}`}></div>
        </div>
    );
};

export default Spinner;
