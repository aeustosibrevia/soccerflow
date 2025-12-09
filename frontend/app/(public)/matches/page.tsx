"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import MatchesSection from "@/src/components/Matches/MatchesSection";
import Image from "next/image";

const myMatchFilters = [
    {
        key: "date",
        placeholder: "Date",
        options: [],
    },
    {
        key: "tournament",
        placeholder: "Select Tournament",
        options: [
            { id: 1, label: "Premier League" },
            { id: 2, label: "La Liga" }
        ],

    },
    {
        key: "team",
        placeholder: "Choose Team",
        options: [
            { id: 1, label: "Chelsea" },
            { id: 2, label: "Barcelona" }
        ],

    },

    {
        key: "sort",
        placeholder: "Sort By",
        options: [
            { id: 1, label: "Newest" },
            { id: 2, label: "Oldest" }
        ],

    }

];


export default function Matches() {
    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="All matches"
                buttons={["Previous Matches", "Today's Matches", "Upcoming Matches"]}
                filters={myMatchFilters}

            />




            <div className={styles.sectionHeader}>
                <div className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Today's Matches</h2>

                <div className={`${styles.arrow} ${styles.arrowRight}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>
            </div>

            <MatchesSection />





            <div className={styles.sectionHeader}>
                <div className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Upcoming Matches</h2>

                <div className={`${styles.arrow} ${styles.arrowRight}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>
            </div>

            <MatchesSection />





            <div className={styles.sectionHeader}>
                <div className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Previous Matches</h2>

                <div className={`${styles.arrow} ${styles.arrowRight}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>
            </div>

            <MatchesSection />
        </div>
    )
}