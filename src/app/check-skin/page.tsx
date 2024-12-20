"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Text from "@/components/Text/Text";
import Icon from "@/components/Icon/Icon";
import Badge from "@/components/Badge/Badge";

const CheckSkin = () => {
    const [skinLesionImage, setSkinLesionImage] = useState<File | null>(null);

    const onSkinLesionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSkinLesionImage(event.target.files[0]);
            console.log(skinLesionImage);
        }
    };

    return (
        <div className={styles.container}>
            <Heading as="h1" variant="md" headingText="Analysieren Sie Ihre Hautläsion" />

            <section className={styles.uploadSection}>
                <Heading as="h2" variant="sm" headingText="Hautläsion hochladen" />
                <div className={styles.uploadArea}>
                    <Icon name="upload-image" size={24} color="subtle" classname={styles.uploadIcon} />
                    <Text
                        variant="md"
                        text={skinLesionImage ? skinLesionImage.name : "Keine Datei ausgewählt"}
                        classname={styles.fileName}
                    />

                    <label htmlFor="upload-skin-lesion" className={styles.fileLabel}>
                        <span>Datei auswählen</span>
                        <input
                            aria-label="Datei auswählen"
                            type="file"
                            id="upload-skin-lesion"
                            accept=".jpg,.jpeg,.png"
                            className={styles.fileInput}
                            onChange={onSkinLesionUpload}
                        />
                    </label>
                </div>
                <Text variant="sm">
                    Folgende Datentypen sind erlaubt: <Badge variant="default" text=".jpg" />,
                    <Badge variant="default" text=".jpeg" />,<Badge variant="default" text=".png" />
                </Text>
            </section>
        </div>
    );
};

export default CheckSkin;
