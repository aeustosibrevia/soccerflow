import styles from "./FavoriteTeamsSection.module.css";
import Image from "next/image";
import { NoteButton } from "../ui/NoteButton";

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

export default function FavoriteTeamsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.arrow}>
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                </div>

                <h2 className={styles.title}>Favorite Teams</h2>

                <div className={styles.arrow}>
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                </div>
            </div>

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
                                <Image src={t.logo} alt={t.name} width={35} height={35} />
                            </div>

                            <span className={styles.chip}>{t.name}</span>

                            <span className={styles.chip}>{t.tournament}</span>
                            <span className={styles.chip}>{t.location}</span>
                            <span className={styles.chip}>{t.coach}</span>
                            <span className={styles.chip}>{t.captain}</span>

                            <div className={styles.actions}>
                                <Image src="/icons/heart-active.svg" width={34} height={34} alt="Like" />
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            {!t.note ? (
                                <NoteButton>Add Note</NoteButton>
                            ) : (
                                <div className={styles.noteRow}>
                                    <NoteButton>Edit Note</NoteButton>
                                    <div className={styles.bubbleColumn}>
                                        <span className={styles.noteTitle}>Notes</span>
                                        <div className={styles.noteBubble}>
                                            {t.note}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}