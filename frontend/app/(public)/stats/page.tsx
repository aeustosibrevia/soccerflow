"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import Image from "next/image";
import FilterBar from "@/src/components/ui/FilterBar";
import TeamStatistics from "@/src/components/Teams/TeamStatistics";
import TournamentSum from "@/src/components/Stats/TournamentSum"
import TopPlayersStats from "@/src/components/Stats/TopPlayersStats";
import PlayersStats from "@/src/components/Stats/PlayersStats";

const filters = [
    {
        key: "season",
        placeholder: "Season",
        options: [],
    },
    {
        key: "tournament",
        placeholder: "Tournament",
        options: [],
    },
    {
        key: "team",
        placeholder: "Team",
        options: [],
    },
    {
        key: "player",
        placeholder: "Player",
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



export default function Stats() {

    return (



        <div className={styles.page}>
            <TitleWithButtons
                title="Statistics"
            />

            <FilterBar
                configs={filters}
                onSearch={() => console.log("!")}            />


            <div className={styles.sectionSearch}>

                <div className={styles.arrow}>
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                    <Image src="/arrow-right.svg" alt="Previous" width={136} height={136} />
                </div>

                <div className={styles.searchContent}>
                    <h2 className={styles.searchTitle}>Results of searching:</h2>
                    <div className={styles.searchTag}>
                        2025/26, LaLiga
                    </div>
                </div>

                <div className={styles.arrow}>
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                    <Image src="/arrow-left.svg" alt="Next" width={136} height={136} />
                </div>
            </div>

            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Tournament Summary</h2>
            </div>
            <TournamentSum />

            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Team Statistics</h2>
            </div>
            <TeamStatistics />


            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Player Statistics</h2>
            </div>

            <TopPlayersStats />


            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>Players</h2>
            </div>
            <PlayersStats />


        </div>
    )
}