import Image from "next/image";
import styles from "./AdminMatchesSection.module.css";
import {NoteButton} from "@/src/components/ui/NoteButton";
import FilterBar, {FilterConfig} from "@/src/components/ui/FilterBar";




type Props = {
    title?: string;

    filters?: FilterConfig[];
    onSearch?: (values: any) => void;
};
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
    {
        id: 3,
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
    },    {
        id: 4,
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

const filters = [
    {
        key: "date",
        placeholder: "Date",
        options: [],
    },
    {
        key: "tournament",
        placeholder: "Select Tournament",
        options: [
            { id: 1, label: "Premier League" },
            { id: 2, label: "La Liga" }
        ],

    },
    {
        key: "team",
        placeholder: "Choose Team",
        options: [
            { id: 1, label: "Chelsea" },
            { id: 2, label: "Barcelona" }
        ],

    },

    {
        key: "sort",
        placeholder: "Sort By",
        options: [
            { id: 1, label: "Newest" },
            { id: 2, label: "Oldest" }
        ],

    }

];


export default function AdminMatchesSection({onSearch}:Props) {
    return (
        <section className={styles.section}>

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

            <div className={styles.cardWrapper}>

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
                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Oct 20"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="20:45"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Team 1"
                        />

                        <div className={styles.scoreContainer}>
                            <input
                                type="text"
                                className={styles.scoreInput}
                                placeholder="0"
                            />
                            <div className={styles.scoreSeparator}>
                                <span className={styles.separatorDot}></span>
                                <span className={styles.separatorDot}></span>
                            </div>
                            <input
                                type="text"
                                className={styles.scoreInput}
                                placeholder="0"
                            />
                        </div>

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Team 2"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="League"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Stadium, City"
                        />

                        <div className={styles.actions}>
                            <NoteButton style={{ backgroundColor: 'rgba(68, 107, 95, 1)'}}>
                                Add
                            </NoteButton>

                            <NoteButton style={{ backgroundColor: 'rgba(107, 75, 68, 1)'}}>
                                Cancel
                            </NoteButton>
                        </div>
                    </div>
                </div>
            </div>

            <Image src="/line.svg" alt="Previous" width={1280} height={100} />

            <FilterBar
                configs={filters}
                onSearch={(vals) => onSearch?.(vals)}
            />

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
                            <NoteButton>Edit</NoteButton>

                            <NoteButton style={{ backgroundColor: 'rgba(107, 75, 68, 1)'}}>
                                Delete
                            </NoteButton>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}