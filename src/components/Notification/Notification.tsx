import React from "react";
import { IconName, NotificationType, NotificationVariant } from "../../types/globalTypes";
import Icon from "../Icon/Icon";
import Text from "@/components/Text/Text";
import styles from "./Notification.module.css";

type NotificationSize = "small" | "default";

const typeStyles = {
    toast: {
        typeStyle: styles.toastNotification,
    },
    area: {
        typeStyle: styles.areaNotification,
    },
    inline: {
        typeStyle: styles.inlineNotification,
    },
};

const variantStyles = {
    success: {
        variantStyle: styles.success,
    },
    error: {
        variantStyle: styles.error,
    },
    warning: {
        variantStyle: styles.warning,
    },
    information: {
        variantStyle: styles.information,
    },
    neutral: {
        variantStyle: styles.neutral,
    },
};

const iconMapping: Record<NotificationVariant, IconName> = {
    success: "check-circle",
    error: "danger",
    warning: "warning",
    information: "information-circle",
    neutral: "information-chat",
};

interface NotificationProps {
    type: NotificationType;
    variant: NotificationVariant;
    message: string;
    size?: NotificationSize;
}

const Notification = ({ type, variant, message, size = "default" }: NotificationProps) => {
    const { typeStyle } = typeStyles[type];
    const { variantStyle } = variantStyles[variant];

    return (
        <span className={`${typeStyle} ${variantStyle} ${size === "small" ? styles.small : ""}`}>
            <Icon name={iconMapping[variant]} size={size === "small" ? 20 : 24} color="default" />
            <Text variant="sm">{type === "inline" ? <strong>{message}</strong> : message}</Text>
        </span>
    );
};

export default Notification;
