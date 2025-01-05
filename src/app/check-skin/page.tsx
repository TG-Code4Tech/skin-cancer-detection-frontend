"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading/Heading";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import Text from "@/components/Text/Text";
import Icon from "@/components/Icon/Icon";
import Badge from "@/components/Badge/Badge";
import IconButton from "@/components/IconButton/IconButton";
import { getCookie } from "@/utils/cookie";
import ProgressCircle from "@/components/ProgressCircle/ProgressCircle";
import Notification from "@/components/Notification/Notification";
import { GlobalNotification } from "@/types/globalTypes";
import { isAuthenticated } from "@/utils/authentication";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { loadTheme } from "@/utils/theme";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";

interface AnalysisResult {
    prediction: string;
    confidence: number;
    recommendation?: string;
}

const CheckSkin = () => {
    const [notification, setNotification] = useState<GlobalNotification | null>(null);
    const [skinLesionImage, setSkinLesionImage] = useState<File | null>(null);
    const [skinLesionThumbnail, setSkinLesionThumbnail] = useState<string | null>(null);
    const [showAnalysisResult, setShowAnalysisResult] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Haut prüfen", href: "/check-skin" },
    ];

    useEffect(() => {
        loadTheme();
        setIsLoading(false);
    }, []);

    const onSkinLesionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSkinLesionImage(event.target.files[0]);
            setSkinLesionThumbnail(URL.createObjectURL(event.target.files[0]));
            setNotification({ type: "toast", variant: "success", message: "Bild erfolgreich hochgeladen." });
        }
    };

    const resetInput = () => {
        const input = document.getElementById("upload-skin-lesion") as HTMLInputElement;

        if (input) {
            input.value = "";
        }
    };

    const onAnalyzeSkinLesion = async () => {
        if (!isAuthenticated()) {
            router.push("/login?expired=true");

            return;
        }

        if (!skinLesionImage) {
            return;
        }

        const token = getCookie("jwt_access_token");

        const formData = new FormData();
        formData.append("skin-lesion-image", skinLesionImage);

        try {
            const saveResponse = await fetch("http://127.0.0.1:5000/upload-skin-lesion", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (saveResponse.ok) {
                const data = await saveResponse.json();
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
                    setAnalysisResult(data);
                    setShowAnalysisResult(true);
                } else {
                    if (response.status === 401) {
                        router.push("/login?expired=true");

                        return;
                    }

                    setNotification({
                        type: "toast",
                        variant: "error",
                        message: "Bei der Analyse ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
                    });
                }
            } else {
                if (saveResponse.status === 401) {
                    router.push("/login?expired=true");

                    return;
                }

                console.error("Fehler bei Speichern in der Datenbank:", saveResponse.statusText);
            }
        } catch (error) {
            console.error("Request error:", error);
        }
    };

    if (isLoading) {
        return <Spinner size="lg" centered={true} />;
    }

    return (
        <>
            {notification && (
                <Notification type={notification.type} variant={notification.variant} message={notification.message} />
            )}

            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.container}>
                <Heading
                    as="h1"
                    variant="md"
                    headingText={showAnalysisResult ? "Ihr Analyseergebnis" : "Analysieren Sie Ihre Hautläsion"}
                />

                {!showAnalysisResult && (
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
                )}

                {!showAnalysisResult && skinLesionThumbnail && (
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
                                        setNotification({
                                            type: "toast",
                                            variant: "success",
                                            message: "Hautläsion erfolgreich entfernt.",
                                        });
                                    }}
                                />
                            </div>

                            <Button variant="primary" buttonText="Analyse starten" onClick={onAnalyzeSkinLesion} />
                        </section>
                    </>
                )}

                {showAnalysisResult && analysisResult && (
                    <section className={styles.section}>
                        <div className={styles.resultItem}>
                            <Heading as="h2" variant="sm" headingText="Diagnose:" />
                            <Badge
                                variant={analysisResult.prediction === "gutartig" ? "benign" : "malignant"}
                                text={analysisResult.prediction}
                                className={styles.badge}
                            />
                        </div>
                        <div className={styles.resultItem}>
                            <Heading as="h2" variant="sm" headingText="Konfidenzwert:" />
                            <ProgressCircle
                                progress={analysisResult.confidence}
                                aria-label={`Konfidenzwert: ${analysisResult.confidence} Prozent`}
                            />
                        </div>
                        <div className={styles.resultItem}>
                            <Heading as="h2" variant="sm" headingText="Empfehlung:" />
                            <Text variant="md" text={analysisResult.recommendation} />
                        </div>
                        <Button
                            variant="primary"
                            buttonText="Neue Analyse starten"
                            onClick={() => {
                                setSkinLesionImage(null);
                                setSkinLesionThumbnail(null);
                                setShowAnalysisResult(false);
                                setAnalysisResult(null);
                            }}
                        />
                    </section>
                )}
            </div>
        </>
    );
};

export default CheckSkin;
