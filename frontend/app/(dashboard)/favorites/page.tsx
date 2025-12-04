"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import FavoriteMatchesSection from "@/src/components/Favorites/FavoriteMatchesSection";
import FavoriteTeamsSection from "@/src/components/Favorites/FavoriteTeamsSection";


export default function Favorites() {

    return (



        <div className={styles.page}>
                <TitleWithButtons
                    title="My Favorites"
                    buttons={["Favorite Matches", "Favorite Teams"]}
                />
            <FavoriteMatchesSection />
            <FavoriteTeamsSection />
        </div>
    )
}