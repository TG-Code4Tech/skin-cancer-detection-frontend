export type IconName =
    | "account"
    | "menu"
    | "close"
    | "check-circle"
    | "report"
    | "warning"
    | "upload-image"
    | "delete"
    | "open-in-new";

export type IconSize = 14 | 16 | 18 | 20 | 24 | 28 | 32;

export type Analysis = {
    image_id: number;
    analysis_date: Date;
    result: string;
    confidence_score: number;
};
