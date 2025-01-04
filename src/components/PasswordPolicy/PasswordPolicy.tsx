import React from "react";
import Notification from "../Notification/Notification";

interface PasswordPolicyProps {
    message: string;
    isValid: boolean;
}

const PasswordPolicy = ({ message, isValid }: PasswordPolicyProps) => {
    return <Notification type="inline" variant={isValid ? "success" : "error"} message={message} size="small" />;
};

export default PasswordPolicy;
