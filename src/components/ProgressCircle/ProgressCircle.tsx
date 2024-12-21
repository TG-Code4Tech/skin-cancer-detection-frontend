import React, { useEffect, useState } from "react";

interface ProgressCircleProps {
    progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentProgress / 100) * circumference;
    let progressColor;
    let backgroundColor;

    if (document.body.hasAttribute("dark-mode")) {
        progressColor = progress >= 80 ? "#2cc98d" : progress >= 60 ? "f8c462" : "#ec847d";
        backgroundColor = progress >= 80 ? "#0b3223" : progress >= 60 ? "#624104" : "#5f1e1a";
    } else {
        progressColor = progress >= 80 ? "#166446" : progress >= 60 ? "#624104" : "#a0332b";
        backgroundColor = progress >= 80 ? "#bcf0dc" : progress >= 60 ? "#fbda9d" : "#f6c6c3";
    }

    useEffect(() => {
        const animateProgress = () => {
            const current = currentProgress;
            const target = progress;
            const duration = 500;
            const startTime = performance.now();

            const step = (timestamp: number) => {
                const progressPercent = Math.min((timestamp - startTime) / duration, 1);
                const newProgress = current + (target - current) * progressPercent;
                setCurrentProgress(newProgress);

                if (progressPercent < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        animateProgress();
    }, [progress]);

    return (
        <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Fortschritt: ${progress} Prozent`}
        >
            {/* Hintergrundkreis */}
            <circle cx="60" cy="60" r="50" stroke={backgroundColor} strokeWidth="6" fill={backgroundColor} />

            {/* Fortschrittskreis */}
            <circle
                cx="60"
                cy="60"
                r="50"
                stroke={progressColor}
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                }}
            />

            {/* Text (Prozentzahl) im Zentrum des Kreises */}
            <text
                x="50%"
                y="53%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="28"
                fontWeight={700}
                fill={progressColor}
            >
                {progress}%
            </text>
        </svg>
    );
};

export default ProgressCircle;
