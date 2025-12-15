import styles from "./TournamentSum.module.css";

type Tournament = {
    id: number;
    name: string;
    season: string;
    status: string;
    teamsCount: number;
    matchesCount: number;
    avgGoals: number;
    cards: string;
    cleanSheets: number;
};

const tournaments: Tournament[] = [
    {
        id: 1,
        name: "LaLiga",
        season: "2025/26",
        status: "Ongoing",
        teamsCount: 38,
        matchesCount: 125,
        avgGoals: 125,
        cards: "12/23",
        cleanSheets: 125,
    },
];

export default function TournamentSum() {
    return (
        <section className={styles.section}>
            <div className={styles.contentContainer}>

                <div className={styles.tableHeader}>
                    <span>Tournament</span>
                    <span>Season</span>
                    <span>Status</span>
                    <span>Teams</span>
                    <span>Matches</span>
                    <span>Average<br/>goals per<br/>match</span>
                    <span>Total<br/>yellow/red<br/>cards</span>
                    <span>Clean<br/>sheets</span>
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
                                <span className={styles.chip}>{t.avgGoals}</span>
                                <span className={styles.chip}>{t.cards}</span>
                                <span className={styles.chip}>{t.cleanSheets}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}