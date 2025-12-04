"use client";

import styles from "./PageNavButtons.module.css";

type PageNavButtonsProps = {
    label: string;
    onClick?: () => void;
};

export default function PageNavButtons({ label, onClick }: PageNavButtonsProps) {
    return (
        <button className={styles.button} onClick={onClick}>
            {label}
        </button>
    );
}
