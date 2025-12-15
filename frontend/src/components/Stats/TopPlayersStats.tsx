import React from "react";
import styles from "./TopPlayersStats.module.css";
import {NoteButton} from "@/src/components/ui/NoteButton";


type PlayerStat = { id: number; rank: number; name: string; team: string; statValue: string | number; statValue2?: string | number; };
type Category = { id: string; title: string; headerLabels: string[]; isDoubleStat?: boolean; players: PlayerStat[]; };

const statsData: Category[] = [
    {
        id: "scorers",
        title: "Top scorers",
        headerLabels: ["Rank", "Player", "Team", "Goals", ""],
        players: [
            { id: 1, rank: 1, name: "Robert Lewandowski", team: "FC Barcelona", statValue: 24 },
            { id: 2, rank: 2, name: "Kylian Mbappé", team: "Real Madrid", statValue: 20 },
            { id: 3, rank: 3, name: "Ayoze Pérez", team: "Real Betis", statValue: 18 },
            { id: 4, rank: 4, name: "Raphinha", team: "FC Barcelona", statValue: 16 },
        ],
    },
    {
        id: "assists",
        title: "Top assists",
        headerLabels: ["Rank", "Player", "Team", "Assists", ""],
        players: [
            { id: 1, rank: 1, name: "Lamine Yamal", team: "FC Barcelona", statValue: 14 },
            { id: 2, rank: 2, name: "Alex Baena", team: "Villarreal", statValue: 12 },
            { id: 3, rank: 3, name: "Nico Williams", team: "Athletic Club", statValue: 10 },
            { id: 4, rank: 4, name: "Raphinha", team: "FC Barcelona", statValue: 9 },
        ],
    },
    {
        id: "cards",
        title: "Cards",
        headerLabels: ["Rank", "Player", "Team", "Yellow", "Red", ""],
        isDoubleStat: true,
        players: [
            { id: 1, rank: 1, name: "Gavi", team: "FC Barcelona", statValue: 8, statValue2: 1 },
            { id: 2, rank: 2, name: "Ivan Alejo", team: "Cadiz", statValue: 12, statValue2: 0 },
            { id: 3, rank: 3, name: "Djené", team: "Getafe", statValue: 10, statValue2: 1 },
            { id: 4, rank: 4, name: "Sergio Ramos", team: "Sevilla", statValue: 9, statValue2: 2 },
        ],
    },
];

export default function TopPlayersStats() {
    return (
        <section className={styles.section}>
            <div className={styles.timelineContainer}>
                {statsData.map((category) => (
                    <div key={category.id} className={styles.categoryGroup}>

                        <div className={styles.leftColumn}>
                            <div className={styles.timelineLine}></div>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.titleWrapper}>
                                <div className={styles.categoryTitle}>{category.title}</div>
                            </div>
                        </div>

                        <div className={styles.listWrapper}>
                            <div className={`${styles.tableHeader} ${category.isDoubleStat ? styles.gridDouble : styles.gridSingle}`}>
                                {category.headerLabels.map((label, index) => (
                                    <span key={index} style={{ textAlign: "center" }}>
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <div className={styles.playersList}>
                                {category.players.map((p) => (
                                    <div key={p.id} className={styles.card}>
                                        <div className={`${styles.playerGrid} ${category.isDoubleStat ? styles.gridDouble : styles.gridSingle}`}>
                                            <span className={styles.rankChip}>{p.rank}</span>
                                            <span className={styles.infoChip}>{p.name}</span>
                                            <span className={styles.infoChip}>{p.team}</span>
                                            <span className={styles.statChip}>{p.statValue}</span>

                                            {category.isDoubleStat && (
                                                <span className={styles.statChip}>{p.statValue2}</span>
                                            )}

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
                    </div>
                ))}
            </div>
        </section>
    );
}