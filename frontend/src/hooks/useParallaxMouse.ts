import { useEffect, useRef } from "react";

export const useParallaxMouse = (maxX = 40, maxY = 20) => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let raf = 0;
        let targetX = 0, targetY = 0;

        const onMouseMove = (e: MouseEvent) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            targetX = (e.clientX / w - 0.5) * maxX;
            targetY = (e.clientY / h - 0.5) * maxY;
            if (!raf) tick();
        };

        const tick = () => {
            raf = requestAnimationFrame(() => {
                if (elementRef.current) {
                    elementRef.current.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.1)`;
                }
                raf = 0;
            });
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [maxX, maxY]);

    return elementRef;
};
