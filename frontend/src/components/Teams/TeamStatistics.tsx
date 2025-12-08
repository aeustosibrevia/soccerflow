import styles from './TeamStatistics.module.css';

interface SeasonStat {
    id: number;
    season: string;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    scored: number;
    conceded: number;
    cleanSheets: number;
    position: number;
}

export default function TeamStatistics() {

    const statsData: SeasonStat[] = [
        {
            id: 1,
            season: '2025/26',
            matches: 10,
            wins: 7,
            draws: 2,
            losses: 1,
            scored: 24,
            conceded: 8,
            cleanSheets: 5,
            position: 2,
        },
        {
            id: 2,
            season: '2024/25',
            matches: 10,
            wins: 7,
            draws: 2,
            losses: 1,
            scored: 24,
            conceded: 8,
            cleanSheets: 5,
            position: 2,
        },
        {
            id: 3,
            season: '2023/24',
            matches: 10,
            wins: 7,
            draws: 2,
            losses: 1,
            scored: 24,
            conceded: 8,
            cleanSheets: 5,
            position: 2,
        },
    ];

    return (
        <div className={styles.container}>
            {statsData.map((stat) => (
                <div key={stat.id} className={styles.row}>

                    <div className={styles.seasonWrapper}>
                        {stat.season}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Matches<br/>played</span>
                        <span className={styles.value}>{stat.matches}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Wins</span>
                        <span className={styles.value}>{stat.wins}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Draws</span>
                        <span className={styles.value}>{stat.draws}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Losses</span>
                        <span className={styles.value}>{stat.losses}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Goals<br/>scored</span>
                        <span className={styles.value}>{stat.scored}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Goals<br/>conceded</span>
                        <span className={styles.value}>{stat.conceded}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>Clean<br/>sheets</span>
                        <span className={styles.value}>{stat.cleanSheets}</span>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.statItem}>
                        <span className={styles.label}>League<br/>position</span>
                        <span className={styles.value}>{stat.position}</span>
                    </div>

                </div>
            ))}
        </div>
    );
}