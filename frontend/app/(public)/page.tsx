"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useParallaxMouse } from "@/src/hooks/useParallaxMouse";
import SubscribePopup from "@/src/components/SubscribePopup";



export default function Home() {
    const heroBgRef = useParallaxMouse(40, 20);
    const [showPopup, setShowPopup] = useState(false);

    return (


        <div className={styles.page}>
        <section className={styles.hero}>
            <div ref={heroBgRef} className={styles.heroBg}></div>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>
                    Soccer<br />Flow
                </h1>
                <button className={styles.subscribe} onClick={() => setShowPopup(true)}>Subscribe</button>
            </div>
        </section>

            {showPopup && <SubscribePopup onClose={() => setShowPopup(false)} />}

            <section className={styles.matches}>
                <div className={styles.matchesContent}>
                    <h2 className={styles.sectionTitle}>Today's Matches</h2>

                    <div className={styles.today}>
                        <div className={styles.matchCard}></div>
                        <div className={`${styles.matchCard} ${styles.mainCard}`}></div>
                        <div className={styles.matchCard}></div>
                    </div>

                    <div className={styles.subSections}>
                        <div className={styles.sub}>
                            <h3>Previous Matches</h3>
                            <div className={styles.smallCards}>
                                <div className={styles.smallCard}></div>
                                <div className={styles.smallCard}></div>
                                <div className={styles.smallCard}></div>
                            </div>
                        </div>

                        <div className={styles.sub}>
                            <h3>Upcoming Matches</h3>
                            <div className={styles.smallCards}>
                                <div className={styles.smallCard}></div>
                                <div className={styles.smallCard}></div>
                                <div className={styles.smallCard}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
