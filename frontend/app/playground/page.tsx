import styles from "./page.module.css";

import MatchesSection from "@/src/components/Matches/MatchesSection";
import TeamsSection from "@/src/components/Teams/TeamsSection";


export default function Playground() {


    return (
        <div className={styles.page}>

<MatchesSection />

            <TeamsSection />

        </div>
    );
}