import Image from "next/image";
import styles from "./MatchesSection.module.css";
import { NoteButton } from "../ui/NoteButton";

type Team = {
    name: string;
    score: number;
    logo: string;
};

type Match = {
    id: number;
    date: string;
    time: string;
    team1: Team;
    team2: Team;
    tournament: string;
    venue: string;
    note?: string;
};

const matchesSection: Match[] = [
    {
        id: 1,
        date: "Oct 19, 2025",
        time: "18:30",
        team1: {
            name: "Chelsea",
            score: 2,
            logo: "/icons/chelsea.png"
        },
        team2: {
            name: "Barcelona",
            score: 3,
            logo: "/icons/barcelona2.png"
        },
        tournament: "Premier League",
        venue: "Stamford Bridge, London",
    },
    {
        id: 2,
        date: "Oct 19, 2025",
        time: "18:30",
        team1: {
            name: "Chelsea",
            score: 2,
            logo: "/icons/chelsea.png"
        },
        team2: {
            name: "Barcelona",
            score: 3,
            logo: "/icons/barcelona2.png"
        },
        tournament: "Premier League",
        venue: "Stamford Bridge, London",
        note: "Great match!",
    },
];


export default function MatchesSection() {
    return (
        <section className={styles.section}>

            {matchesSection.map((m) => (
                <div key={m.id} className={styles.cardWrapper}>

                    <div className={styles.tableHeader}>
                        <span style={{textAlign: 'center'}}>Date</span>
                        <span style={{textAlign: 'center'}}>Time</span>
                        <span style={{textAlign: 'center'}}>Team</span>
                        <span style={{textAlign: 'center'}}>Score</span>
                        <span style={{textAlign: 'center'}}>Team</span>
                        <span style={{textAlign: 'center'}}>Tournament</span>
                        <span style={{textAlign: 'center'}}>Venue</span>
                        <span></span>
                    </div>

                    <div className={styles.card}>

                        <div className={styles.matchGrid}>
                            <span className={styles.chip}>{m.date}</span>
                            <span className={styles.chip}>{m.time}</span>

                            <span className={styles.chip}>
                                {m.team1.name}
                                <Image src={m.team1.logo} width={20} height={20} alt={m.team1.name} />
                            </span>

                            <div className={styles.scoreContainer}>
                                <span className={styles.scoreChip}>{m.team1.score}</span>
                                <div className={styles.scoreSeparator}>
                                    <span className={styles.separatorDot}></span>
                                    <span className={styles.separatorDot}></span>
                                </div>
                                <span className={styles.scoreChip}>{m.team2.score}</span>
                            </div>

                            <span className={styles.chip}>
                                {m.team2.name}
                                <Image src={m.team2.logo} width={20} height={20} alt={m.team2.name} />
                            </span>

                            <span className={styles.chip}>{m.tournament}</span>
                            <span className={styles.chip}>{m.venue}</span>

                            <div className={styles.actions}>
                                <Image src="/icons/heart-active.svg" width={34} height={34} alt="Like" />
                                <Image src="/icons/calendar.png" width={34} height={34} alt="Calendar" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}