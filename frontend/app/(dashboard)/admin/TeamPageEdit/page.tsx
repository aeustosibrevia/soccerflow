"use client";

import styles from "./page.module.css";
import AdminMatchesSection from "@/src/components/Admin/AdminMatchesSection";
import TeamMembers from "@/src/components/Teams/TeamMembers";
import TeamStatistics from "@/src/components/Teams/TeamStatistics";
import {NoteButton} from "@/src/components/ui/NoteButton";
import React from "react";


export default function AdminTeamPageEdit() {

    const defaultOverview = `FC Barcelona, founded in 1899, is one of the most iconic football clubs in the world. Known for its motto “Més que un club”, Barça has a long tradition of attacking football.
    
Quick facts:
- Country: Spain
- League: LaLiga
- Founded: 1899
- Stadium: Spotify Camp Nou
- Coach: Hansi Flick
- Captain: Marc-André ter Stegen

Top players: Lewandowski, Pedri, Gavi, Frenkie de Jong`;



    return (
        <div className={styles.page}>
            <section className={styles.section}>
                <div className={styles.container}>

                    <div className={styles.fieldGroup}>
                        <div className={styles.labelChip}>Name team</div>
                        <input
                            type="text"
                            className={styles.inputBlock}
                            defaultValue="FC Barcelona"
                            placeholder="Enter team name"
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={styles.labelChip}>Overview</div>

                        <textarea
                            className={styles.textareaBlock}
                            defaultValue={defaultOverview}
                            placeholder="Write team description here..."
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={styles.photolabelChip}>Photo</div>
                        <input
                            type="text"
                            className={styles.inputBlock}
                            defaultValue="https://example.com/players/alan-photo"
                            placeholder="https://..."
                        />
                    </div>

                </div>
            </section>



<section className={styles.sectionComponents}>
    <div className={styles.container}>

        <div className={styles.fieldGroup}>
            <div className={styles.labelChip}>Matches</div>

        </div>
    </div>
        <AdminMatchesSection />


</section>


            <section className={styles.sectionComponents}>
                <div className={styles.container}>

                    <div className={styles.fieldGroup}>
                        <div className={styles.labelChip}>Players</div>

                    </div>
                </div>
                <TeamMembers />


            </section>






            <section className={styles.sectionComponents}>
                <div className={styles.container}>

                    <div className={styles.fieldGroup}>
                        <div className={styles.labelChip}>Stats</div>

                    </div>
                </div>
                <TeamStatistics />


            </section>






            <section className={styles.section}>
                <div className={styles.container}>

                    <div className={styles.fieldGroup}>
                        <div className={styles.labelChip}>History</div>

                        <textarea
                            className={styles.textareaBlock}
                            defaultValue={defaultOverview}
                            placeholder="Write team description here..."
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={styles.photolabelChip}>Logo</div>
                        <input
                            type="text"
                            className={styles.inputBlock}
                            defaultValue="https://example.com/players/alan-photo"
                            placeholder="https://..."
                        />
                        <div className={styles.photolabelChip}>Photo 1</div>
                        <input
                            type="text"
                            className={styles.inputBlock}
                            defaultValue="https://example.com/players/alan-photo"
                            placeholder="https://..."
                        />
                        <div className={styles.photolabelChip}>Photo 2</div>
                        <input
                            type="text"
                            className={styles.inputBlock}
                            defaultValue="https://example.com/players/alan-photo"
                            placeholder="https://..."
                        />
                    </div>

                </div>
            </section>

            <div className={styles.buttonContainer}>
                <NoteButton style={{ backgroundColor: '#446B5F'}}>
                    Save All</NoteButton>
                <NoteButton style={{ backgroundColor: '#614F4C'}}>
                    Cancel</NoteButton>
            </div>

        </div>
    )
}