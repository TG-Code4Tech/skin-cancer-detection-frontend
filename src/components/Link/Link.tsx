import React from "react";
import { IconName, IconSize } from "../../types/globalTypes";
import { IconColor } from "../../enums/globalEnums";
import Icon from "../Icon/Icon";
import styles from "./Link.module.css";

const modeStyles = {
    sleek: {
        linkStyle: styles.sleekLink,
    },
    subtle: {
        linkStyle: styles.subtleLink,
    },
    default: {
        linkStyle: styles.defaultLink,
    },
};

type IconPosition = "left" | "right";
type LinkMode = "default" | "sleek" | "subtle";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    linkText: string;
    iconName?: IconName;
    iconSize?: IconSize;
    iconColor?: keyof typeof IconColor;
    iconPosition?: IconPosition;
    mode?: LinkMode;
    className?: string;
}

const Link = ({
    href,
    linkText,
    iconName,
    iconSize = 24,
    iconColor = "default",
    iconPosition = "left",
    mode = "default",
    className = "",
    ...rest
}: LinkProps) => {
    const { linkStyle } = modeStyles[mode] || modeStyles.default;

    if (!iconName) {
        return (
            <a href={href} className={`${linkStyle} ${className}`} {...rest}>
                {linkText}
            </a>
        );
    }

    switch (iconPosition) {
        case "left":
            return (
                <a href={href} className={`${linkStyle} ${styles.linkWithIcon} ${className}`} {...rest}>
                    <Icon name={iconName} size={iconSize} color={iconColor} />
                    <span>{linkText}</span>
                </a>
            );
        case "right":
            return (
                <a href={href} className={`${linkStyle} ${styles.linkWithIcon} ${className}`} {...rest}>
                    <span>{linkText}</span>
                    <Icon name={iconName} size={iconSize} color={iconColor} />
                </a>
            );
        default:
            return null;
    }
};

export default Link;
