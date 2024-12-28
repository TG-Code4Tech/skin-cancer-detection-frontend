import React, { forwardRef } from "react";
import { IconName, IconSize } from "../../types/globalTypes";
import { IconColor } from "../../enums/globalEnums";
import Icon from "../Icon/Icon";
import styles from "./IconButton.module.css";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconName: IconName;
    iconSize: IconSize;
    iconColor: keyof typeof IconColor;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ iconName, iconSize, iconColor, ...props }: IconButtonProps, ref) => {
        return (
            <button className={styles.iconButton} {...props}>
                <Icon name={iconName} size={iconSize} color={iconColor} />
            </button>
        );
    }
);

export default IconButton;
