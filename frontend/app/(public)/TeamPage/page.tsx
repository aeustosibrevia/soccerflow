"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import Image from "next/image";
import MatchesSection from "@/src/components/Matches/MatchesSection";
import TeamStatistics from "@/src/components/Teams/TeamStatistics";
import FilterBar from "@/src/components/ui/FilterBar";
import PlayerViewer from "@/src/components/Teams/PlayerViewer";



const statsfilters = [
    {
        key: "season",
        placeholder: "Season",
        options: [],
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


const defaultOverview = `FC Barcelona, founded in 1899, is one of the most iconic football clubs in the world. Known for its motto “Més que un club”, Barça has a long tradition of attacking football.
    
Quick facts:
- Country: Spain
- League: LaLiga
- Founded: 1899
- Stadium: Spotify Camp Nou
- Coach: Hansi Flick
- Captain: Marc-André ter Stegen

Top players: Lewandowski, Pedri, Gavi, Frenkie de Jong`;

const descriptionFromDB = `Founded in 1899 by a group of Swiss, Catalan, German, and English footballers led by Joan Gamper, the club has become a symbol of Catalan culture and Catalanism, hence the motto "Més que un club" ("More than a club").[2] Unlike many other football clubs, the supporters own and operate Barcelona. It is the third-most valuable football club in the world, worth $5.6 billion, and the world's fourth richest football club in terms of revenue, with an annual turnover of €800.1 million.[3][4] The official Barcelona anthem is the "Cant del Barça", written by Jaume Picas and Josep Maria Espinàs.[5] Barcelona traditionally play in dark shades of blue and garnet stripes, hence nicknamed Blaugrana.`;

export default function TeamPage() {
    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="FC Barcelona"
                buttons={["Overview", "Matches", "Players","Players","Stats"]}
            />


            <section className={styles.section}>
                <div className={styles.container}>

                    <div className={styles.grid}>

                        <div>

                            <p className={styles.description}>
                                {defaultOverview}
                            </p>
                        </div>




                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/teamphoto.jpg"
                                    alt="FC Barcelona Team Squad"
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                    </div>
                </div>
            </section>




            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Matches</h2>
            </div>

            <MatchesSection />





            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Players</h2>
            </div>
            <PlayerViewer />






            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>History</h2>
            </div>

            <section className={styles.sectionhistory}>
                <div className={styles.containerhistory}>

                    <div className={styles.glassCard}>
                        <div className={styles.floatLogo}>
                            <Image
                                src="/fcb-logo.png"
                                alt="FC Barcelona Crest"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        <div className={styles.textContent}>
                            {descriptionFromDB}

                        </div>
                    </div>

                    <div className={styles.imagesColumn}>
                        <div className={`${styles.imageCard} ${styles.topImage}`}>
                            <Image src="/team1.png" alt="Team" fill style={{objectFit: 'cover'}} />
                        </div>
                        <div className={`${styles.imageCard} ${styles.bottomImage}`}>
                            <Image src="/team2.png" alt="Team" fill style={{objectFit: 'cover'}} />
                        </div>
                    </div>

                </div>
            </section>



            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Stats</h2>
            </div>

            <FilterBar
                configs={statsfilters}
                onSearch={() => console.log("!")}            />

            <TeamStatistics />


        </div>
    )
}