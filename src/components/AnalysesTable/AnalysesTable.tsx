import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AnalysesTable.module.css";
import Badge from "../Badge/Badge";

interface Analysis {
    image_id: number;
    analysis_date: Date;
    result: string;
    confidence_score: number;
}

interface AnalysesTableProps {
    caption: string;
    tableBodyRows: Analysis[];
}

const AnalysesTable = ({ caption, tableBodyRows }: AnalysesTableProps) => {
    const [images, setImages] = useState<{ [key: number]: string }>({});
    
    useEffect(() => {
        const fetchImages = async () => {
            const skinLesionUrls: { [key: number]: string } = {};
            for (const analysis of tableBodyRows) {
                try {
                    const jwtCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.trim().startsWith("jwt_access_token"));
                    const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

                    if (!jwtToken) {
                        console.error("Kein JWT-Token gefunden");
                        return;
                    }

                    const response = await fetch(
                        `http://127.0.0.1:5000/get-skin-lesion?image_id=${analysis.image_id}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${jwtToken}`,
                            },
                        }
                    );
                    if (response.ok) {
                        const blob = await response.blob();
                        skinLesionUrls[analysis.image_id] = URL.createObjectURL(blob);
                    } else {
                        console.error("Failed to fetch image", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching image", error);
                }
            }
            setImages(skinLesionUrls);
        };

        fetchImages();
    }, [tableBodyRows]);

    return (
        <table className={styles.table}>
            <caption className={styles.caption}>{caption}</caption>
            <thead className={styles.tableHead}>
                <tr>
                    <th key="skin-lesion-image" scope="col" className={styles.tableHeader}>
                        Hautläsion
                    </th>
                    <th key="analysis-date" scope="col" className={styles.tableHeader}>
                        Datum
                    </th>
                    <th key="diagnosis" scope="col" className={styles.tableHeader}>
                        Diagnose
                    </th>
                    <th key="confidence-score" scope="col" className={styles.tableHeader}>
                        Konfidenzwert
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableBodyRows.map((analysis, index) => (
                    <tr key={index} className={styles.tableRow}>
                        <td
                            key={`skin-lesion-image-${index}`}
                            className={`${styles.tableData} ${styles.skinLesionCell}`}
                        >
                            <Image
                                alt={`Hautläsion-${index}`}
                                src={images[analysis.image_id]}
                                width={100}
                                height={100}
                            />
                        </td>
                        <td key={`analysis-date-${index}`} className={styles.tableData}>
                            {new Date(analysis.analysis_date).toLocaleDateString()}
                        </td>
                        <td key={`diagnosis-${index}`} className={styles.tableData}>
                            <Badge variant="default" text={analysis.result} />
                        </td>
                        <td key={`confidence-score-${index}`} className={styles.tableData}>
                            {analysis.confidence_score}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AnalysesTable;
