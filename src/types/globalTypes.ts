export type IconName =
    | "account"
    | "menu"
    | "close"
    | "check-circle"
    | "danger"
    | "warning"
    | "upload-image"
    | "delete"
    | "open-in-new"
    | "information-circle"
    | "information-chat";

export type IconSize = 14 | 16 | 18 | 20 | 24 | 28 | 32;

export type Analysis = {
    image_id: number;
    analysis_date: Date;
    result: string;
    confidence_score: number;
};

export type NotificationType = "toast" | "area" | "inline";
export type NotificationVariant = "success" | "error" | "warning" | "information" | "neutral";

export type GlobalNotification = {
    type: NotificationType;
    variant: NotificationVariant;
    message: string;
};
