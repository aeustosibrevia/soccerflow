"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import AdminTeamsSection from "@/src/components/Admin/AdminTeamsSection";
import AdminMatchesSection from "@/src/components/Admin/AdminMatchesSection";
import Image from "next/image";

export default function Admin() {
    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="Administrator Panel"
                buttons={["Matches", "Teams"]}

            />


            <div className={styles.sectionHeader}>
                <div className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Matches</h2>

                <div className={`${styles.arrow} ${styles.arrowRight}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>
            </div>
            <AdminMatchesSection />

            <AdminTeamsSection />





        </div>
    )
}