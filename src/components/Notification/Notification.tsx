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
    describedById?: string;
}

const Notification = ({ type, variant, message, size = "default", describedById }: NotificationProps) => {
    const { typeStyle } = typeStyles[type];
    const { variantStyle } = variantStyles[variant];
    const role = variant === "error" ? "alert" : "status";
    const ariaLive = variant === "error" ? "assertive" : "polite";
    const tabIndex = variant === "error" ? 0 : undefined;
    const ariaDescribedBy = type === "inline" && describedById ? describedById : undefined;

    return (
        <div
            className={`${typeStyle} ${variantStyle} ${size === "small" ? styles.small : ""}`}
            role={role}
            aria-live={ariaLive}
            aria-describedby={ariaDescribedBy}
            tabIndex={tabIndex}
        >
            <Icon name={iconMapping[variant]} size={size === "small" ? 20 : 24} color="default" aria-hidden="true" />
            <Text variant="sm">{type === "inline" ? <strong>{message}</strong> : message}</Text>
        </div>
    );
};

export default Notification;
