"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/TitleWithButtons";



export default function Favorites() {
    return (
        <div className={styles.page}>
            <div>
            <TitleWithButtons
                title="My Favorites"
                buttons={["Favorite Matches", "Favorite Teams"]}
            />
        </div>

        </div>

    )
}