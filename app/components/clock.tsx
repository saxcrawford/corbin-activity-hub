"use client";

import { useState, useEffect } from "react";

interface ClockProps {
    format?: string;
    ticking?: boolean;
    className?: string;
}

const Clock = ({ format = "h:mm:ssa", ticking = true, className = "" }: ClockProps) => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        if (!ticking) return;

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [ticking]);

    const formatTime = (date: Date, formatString: string): string => {
        const hours12 = date.getHours() % 12 || 12;
        const hours24 = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';

        return formatString
            .replace('h', hours12.toString())
            .replace('H', hours24.toString().padStart(2, '0'))
            .replace('mm', minutes)
            .replace('ss', seconds)
            .replace('a', ampm);
    };

    return (
        <span className={className}>
      {formatTime(time, format)}
    </span>
    );
};

export default Clock;