import styles from "./AdminTeamsSection.module.css";
import Image from "next/image";
import {NoteButton} from "@/src/components/ui/NoteButton";
import FilterBar, {FilterConfig} from "@/src/components/ui/FilterBar";



type Props = {
    title?: string;

    filters?: FilterConfig[];
    onSearch?: (values: any) => void;
};

type FavoriteTeam = {
    id: number;
    name: string;
    tournament: string;
    location: string;
    coach: string;
    captain: string;
    note?: string;
    logo: string;
};

const teams: FavoriteTeam[] = [
    {
        id: 1,
        name: "Chelsea",
        tournament: "Premier League",
        location: "London",
        coach: "Hans Flick",
        captain: "Marc-André ter Stegen",
        logo: "/icons/chelsea.png",
    },
    {
        id: 2,
        name: "Chelsea",
        tournament: "Premier League",
        location: "London",
        coach: "Hans Flick",
        captain: "Marc-André ter Stegen",
        note: "I really liked the first half performance of Chelsea!",
        logo: "/icons/chelsea.png",
    },
    {
        id: 3,
        name: "Chelsea",
        tournament: "Premier League",
        location: "London",
        coach: "Hans Flick",
        captain: "Marc-André ter Stegen",
        logo: "/icons/chelsea.png",
    },
];


const filters = [
    {
        key: "key",
        placeholder: "keywords",
        options: [],
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


export default function TeamsSection({onSearch}:Props) {
    return (
        <section className={styles.section}>


            <div className={styles.sectionHeader}>
                <div className={`${styles.arrow} ${styles.arrowLeft}`}>
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Decoration" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Teams</h2>

                <div className={`${styles.arrow} ${styles.arrowRight}`}>
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Decoration" width={136} height={136} />
                </div>
            </div>

            <div className={styles.cardWrapper}>
                <div className={styles.tableHeader}>
                    <span style={{textAlign: 'center'}}>Logo</span>
                    <span style={{textAlign: 'center'}}>Name team</span>
                    <span style={{textAlign: 'center'}}>Tournament</span>
                    <span style={{textAlign: 'center'}}>Location</span>
                    <span style={{textAlign: 'center'}}>Coach</span>
                    <span style={{textAlign: 'center'}}>Captain</span>
                    <span></span>
                </div>

                <div className={styles.card}>

                    <div className={styles.teamGrid}>

                        <div className={styles.logoContainer}>
                            <div style={{
                                width: 35,
                                height: 35,
                                borderRadius: '50%',
                                background: 'rgba(199,199,199,0.3)',
                                border: '1px dashed rgba(255,255,255,0.5)'
                            }} />
                        </div>

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Team Name"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="League"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="City"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Head Coach"
                        />

                        <input
                            type="text"
                            className={styles.inputChip}
                            placeholder="Captain Name"
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

            {teams.map((t) => (
                <div key={t.id} className={styles.cardWrapper}>

                    <div className={styles.tableHeader}>
                        <span style={{textAlign: 'center'}}>Logo</span>
                        <span style={{textAlign: 'center'}}>Name team</span>
                        <span style={{textAlign: 'center'}}>Tournament</span>
                        <span style={{textAlign: 'center'}}>Location</span>
                        <span style={{textAlign: 'center'}}>Coach</span>
                        <span style={{textAlign: 'center'}}>Captain</span>
                        <span></span>
                    </div>

                    <div className={styles.card}>

                        <div className={styles.teamGrid}>

                            <div className={styles.logoContainer}>
                                <Image src={t.logo} alt={t.name} width={35} height={35}/>
                            </div>

                            <span className={styles.chip}>{t.name}</span>

                            <span className={styles.chip}>{t.tournament}</span>
                            <span className={styles.chip}>{t.location}</span>
                            <span className={styles.chip}>{t.coach}</span>
                            <span className={styles.chip}>{t.captain}</span>

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