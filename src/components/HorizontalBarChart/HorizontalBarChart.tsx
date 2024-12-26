import React, { useEffect, useState } from "react";
import Text from "@/components/Text/Text";
import styles from "./HorizontalBarChart.module.css";

type BarData = {
    label: string;
    value: number;
};

interface HorizontalBarChartProps {
    data: BarData[];
    xAxisLabel: string;
    yAxisLabel: string;
    xAxisMaximum: number;
}

const HorizontalBarChart = ({ data, xAxisLabel, yAxisLabel, xAxisMaximum }: HorizontalBarChartProps) => {
    const [linePositions, setLinePositions] = useState<number[]>([]);
    const [adjustedMax, setAdjustedMax] = useState<number>(xAxisMaximum);

    useEffect(() => {
        // Funktion, um das nächste Vielfache von 2 zu berechnen
        const getNextMultipleOf2 = (num: number) => {
            return Math.ceil(num / 2) * 2;
        };

        // Berechnung der neuen Maximalwert und der Positionen der vertikalen Linien
        const calculateLinePositions = () => {
            const newMax = getNextMultipleOf2(xAxisMaximum);
            setAdjustedMax(newMax);

            const positions = [];
            let value = 2;

            while (value <= newMax) {
                positions.push(value);
                value += 2;
            }

            setLinePositions(positions);
        };

        calculateLinePositions();
    }, [xAxisMaximum]);

    return (
        <div className={styles.barChart}>
            <div className={styles.yAxisValues}>
                {data.map((item, index) => (
                    <Text key={index} variant="sm" text={item.label} classname={styles.yAxisValue} />
                ))}
            </div>

            <div className={styles.chartContainer}>
                <Text variant="sm" text={yAxisLabel} classname={styles.yAxisLabel} />
                <div className={styles.chartAndXAxis}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={styles.bar}
                            style={{ width: `calc(${(item.value / adjustedMax) * 100}% - 8px)` }}
                        >
                            {item.value}
                        </div>
                    ))}

                    <div className={styles.verticalLinesContainer}>
                        {linePositions.map((position, index) => (
                            <div key={index} className={styles.verticalLine}></div>
                        ))}
                    </div>

                    <div className={styles.xAxisValues}>
                        {linePositions.map((position, index) => (
                            <div key={index} className={styles.xAxisValue}>
                                {position}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Text variant="sm" text={xAxisLabel} classname={styles.xAxisLabel} />
        </div>
    );
};

export default HorizontalBarChart;
