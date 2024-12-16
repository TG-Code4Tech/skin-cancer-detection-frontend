import React from "react";
import styles from "./Divider.module.css";

interface DividerProps {
    className?: string;
}

const Divider = ({ className = "" }: DividerProps) => {
    return <hr className={`${styles.divider} ${className}`} />;
};

export default Divider;
