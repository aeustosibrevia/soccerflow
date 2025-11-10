import { useState } from "react";

export function useCarousel(items: any[]) {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const next = () => {
        setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const goTo = (i: number) => setIndex(i);

    const getVisible = () => {
        const visible = [];
        for (let i = -1; i <= 1; i++) {
            const idx = (index + i + items.length) % items.length;
            visible.push({ id: idx, value: items[idx] });
        }
        return visible;
    };

    const visible = getVisible();

    return { index, prev, next, goTo, visible };
}
