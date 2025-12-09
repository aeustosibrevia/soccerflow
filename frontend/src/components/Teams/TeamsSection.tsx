import styles from "./TeamsSection.module.css";
import Image from "next/image";

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

export default function TeamsSection() {
    return (
        <section className={styles.section}>


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
                                <Image src="/icons/heart-active.svg" width={34} height={34} alt="Like"/>
                            </div>
                        </div>
                        

                    </div>
                </div>
            ))}
        </section>
    );
}