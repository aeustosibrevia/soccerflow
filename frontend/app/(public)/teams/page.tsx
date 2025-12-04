"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import TeamsSection from "@/src/components/Teams/TeamsSection";
import Image from "next/image";

const myteamFilters = [
    {
        key: "keywords",
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
        key: "veneu",
        placeholder: "Venue",
        options: [
            { id: 1, label: "London" },
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


export default function Matches() {
    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="All teams"
                filters={myteamFilters}

            />



            <TeamsSection />





        </div>
    )
}