"use client";
import styles from "./TitleWithButtons.module.css";
import PageNavButtons from "./PageNavButtons";
import { usePinUnderHeader } from "@/src/hooks/usePinUnderHeader";

type Props = {
    title: string;
    buttons: string[];
    onSelect?: (index: number) => void;
};

export default function TitleWithButtons({ title, buttons, onSelect }: Props) {
    const { wrapperRef, isPinned, placeholderHeight } =
        usePinUnderHeader(110);

    return (
        <>
            <div>
                <h1 className={styles.title}>{title}</h1>

                {isPinned && <div style={{ height: placeholderHeight }} />}

                <div
                    ref={wrapperRef}
                    className={`${styles.wrapper} ${isPinned ? styles.pinned : ""}`}
                >
                    <div className={styles.buttons}>
                        {buttons.map((label, index) => (
                            <PageNavButtons
                                key={index}
                                label={label}
                                onClick={() => onSelect?.(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
