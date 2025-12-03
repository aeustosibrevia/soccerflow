"use client";
import { useEffect, useRef, useState } from "react";

export function usePinUnderHeader(headerHeight: number = 110) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [isPinned, setIsPinned] = useState(false);
    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const [initialTop, setInitialTop] = useState<number | null>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const topOnPage = rect.top + window.scrollY;
        setInitialTop(topOnPage);
        setPlaceholderHeight(el.offsetHeight);

        const handleScroll = () => {
            if (initialTop === null) return;

            const shouldPin = window.scrollY + headerHeight >= initialTop;
            setIsPinned(shouldPin);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [initialTop, headerHeight]);

    return {
        wrapperRef,
        isPinned,
        placeholderHeight
    };
}
