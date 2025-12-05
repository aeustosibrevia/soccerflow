"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import AdminTeamsSection from "@/src/components/Admin/AdminTeamsSection";
import AdminMatchesSection from "@/src/components/Admin/AdminMatchesSection";

export default function Admin() {
    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="Administrator Panel"
                buttons={["Matches", "Teams"]}

            />



            <AdminMatchesSection />

            <AdminTeamsSection />





        </div>
    )
}