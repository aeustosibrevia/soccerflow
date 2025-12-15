import styles from "./TournamentSection.module.css";
import {NoteButton} from "@/src/components/ui/NoteButton";

type Tournament = {
    id: number;
    name: string;
    season: string;
    status: string;
    teamsCount: number;
    matchesCount: number;
};

const tournaments: Tournament[] = [
    {
        id: 1,
        name: "Premier League",
        season: "2024/25",
        status: "Ongoing",
        teamsCount: 20,
        matchesCount: 125,
    },
    {
        id: 2,
        name: "La Liga",
        season: "2024/25",
        status: "Ongoing",
        teamsCount: 20,
        matchesCount: 98,
    },
    {
        id: 3,
        name: "Champions League",
        season: "2024/25",
        status: "Group Stage",
        teamsCount: 36,
        matchesCount: 45,
    },
];

export default function TournamentsSection() {
    return (
        <section className={styles.section}>

            <div className={styles.contentContainer}>
                <div className={styles.tableHeader}>
                    <span style={{textAlign: 'center'}}>Tournament</span>
                    <span style={{textAlign: 'center'}}>Season</span>
                    <span style={{textAlign: 'center'}}>Status</span>
                    <span style={{textAlign: 'center'}}>Teams</span>
                    <span style={{textAlign: 'center'}}>Matches</span>
                    <span></span>
                </div>

                <div className={styles.listWrapper}>
                    {tournaments.map((t) => (
                        <div key={t.id} className={styles.card}>
                            <div className={styles.tournamentGrid}>
                                <span className={styles.chip}>{t.name}</span>
                                <span className={styles.chip}>{t.season}</span>
                                <span className={styles.chip}>{t.status}</span>
                                <span className={styles.chip}>{t.teamsCount}</span>
                                <span className={styles.chip}>{t.matchesCount}</span>
                                <div className={styles.actions}>
                                    <NoteButton className={styles.moreInfoBtn}>
                                        More info
                                    </NoteButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}