"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import Image from "next/image";
import TournamentsSection from "@/src/components/Tournament/TournamentSection";



export default function Favorites() {

    return (



        <div className={styles.page}>
            <TitleWithButtons
                title="Tournaments List"
                buttons={["2023/2024", "2024/2025","2025/2026"]}
            />
            <div className={styles.sectionHeader}>
                <div className={styles.arrow}>
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                </div>

                <h2 className={styles.title}>2025/2026</h2>

                <div className={styles.arrow}>
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                </div>
            </div>

            <TournamentsSection />

        </div>
    )
}