import React from "react";
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
                        <td key={`skin-lesion-image-${index}`} className={styles.tableData}>
                            <Image
                                alt={`Hautläsion-${index}`}
                                src="/images/logos/scd-logo.svg"
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
