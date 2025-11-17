"use client";
import styles from "./TitleWithButtons.module.css";
import PageNavButtons from "./PageNavButtons";

type Props = {
    title: string;
    buttons: string[];
    onSelect?: (index: number) => void;
};

export default function TitleWithButtons({ title, buttons, onSelect }: Props) {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>

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
    );
}
