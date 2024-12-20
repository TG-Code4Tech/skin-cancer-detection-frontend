"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Link from "@/components/Link/Link";
import Text from "@/components/Text/Text";
import Icon from "@/components/Icon/Icon";
import Badge from "@/components/Badge/Badge";
import IconButton from "@/components/IconButton/IconButton";
import { getCookie } from "@/utils/cookie";

const CheckSkin = () => {
    const [skinLesionImage, setSkinLesionImage] = useState<File | null>(null);
    const [skinLesionThumbnail, setSkinLesionThumbnail] = useState<string | null>(null);

    const onSkinLesionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSkinLesionImage(event.target.files[0]);
            setSkinLesionThumbnail(URL.createObjectURL(event.target.files[0]));
        }
    };

    const resetInput = () => {
        const input = document.getElementById("upload-skin-lesion") as HTMLInputElement;
        if (input) {
            input.value = "";
        }
    };

    const onAnalyzeSkinLesion = async () => {
        if (!skinLesionImage) {
            return;
        }

        const formData = new FormData();
        formData.append("skin-lesion-image", skinLesionImage);

        try {
            const token = getCookie("jwt_access_token");

            const saveResponse = await fetch("http://127.0.0.1:5000/upload-skin-lesion", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (saveResponse.ok) {
                const data = await saveResponse.json();
                console.log("Upload-Ergebnis:", data);

                // Bild nach Upload analysieren
                const imageId = data.image_id;
                formData.append("image_id", imageId);

                const response = await fetch("http://127.0.0.1:5000/analyze-skin-lesion", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Analyseergebnis:", data);
                } else {
                    console.error("Fehler bei der Analyse:", response.statusText);
                }
            } else {
                console.error("Fehler bei Speichern in der Datenbank:", saveResponse.statusText);
            }
        } catch (error) {
            console.error("Request error:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Heading as="h1" variant="md" headingText="Analysieren Sie Ihre Hautläsion" />

            <section className={styles.section}>
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

            {skinLesionThumbnail && (
                <>
                    <Divider />

                    <section className={styles.section}>
                        <Heading as="h2" variant="sm" headingText="Hautläsion prüfen" />

                        <div className={styles.deleteSkinLesionArea}>
                            <Image
                                src={skinLesionThumbnail}
                                alt="Vorschaubild Ihrer hochgeladenen Hautläsion"
                                width={100}
                                height={100}
                            />
                            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "0.25rem" }}>
                                <Text
                                    variant="md"
                                    text={skinLesionImage ? skinLesionImage.name : "Keine Datei ausgewählt"}
                                    classname={styles.fileName}
                                />
                                <Text
                                    variant="sm"
                                    text={
                                        skinLesionImage
                                            ? (skinLesionImage.size / 1024).toFixed(2).replace(".", ",") + " KB"
                                            : ""
                                    }
                                    classname={styles.fileSize}
                                />
                            </div>
                            <IconButton
                                iconName="delete"
                                iconSize={24}
                                iconColor="default"
                                onClick={() => {
                                    setSkinLesionImage(null);
                                    setSkinLesionThumbnail(null);
                                    resetInput();
                                }}
                            />
                        </div>

                        <Button
                            variant="primary"
                            buttonText="Analyse starten"
                            className={styles.analyzeButton}
                            onClick={onAnalyzeSkinLesion}
                        />
                    </section>
                </>
            )}
        </div>
    );
};

export default CheckSkin;
