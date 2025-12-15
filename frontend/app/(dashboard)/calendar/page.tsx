"use client";

import styles from "./page.module.css";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
import FilterBar from "@/src/components/ui/FilterBar";
import CalendarMatches from "@/src/components/Calendar/CalendarMatches";




const filters = [
    {
        key: "date",
        placeholder: "Date",
        options: [],
    },
    {
        key: "month",
        placeholder: "Month",
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


export default function Calendar() {

    return (



        <div className={styles.page}>
            <TitleWithButtons
                title="My Calendar"
            />
            <div className={styles.sectionHeader}>
                <h2 className={styles.title}>View all your saved and upcoming matches</h2>
            </div>

            <FilterBar
                configs={filters}
                onSearch={() => console.log("!")}            />

            <CalendarMatches />

        </div>
    )
}