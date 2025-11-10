"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useParallaxMouse } from "@/src/hooks/useParallaxMouse";
import { useCarousel } from "@/src/hooks/useCarousel";
import SubscribePopup from "@/src/components/SubscribePopup";

export default function Home() {
    const heroBgRef = useParallaxMouse(40, 20);
    const [showPopup, setShowPopup] = useState(false);

    const todayCarousel = useCarousel([1, 2, 3, 4, 5, 6]);
    const prevCarousel = useCarousel([1, 2, 3, 4, 5]);
    const upcomingCarousel = useCarousel([1, 2, 3, 4, 5]);

    return (
        <div className={styles.page}>
            <div ref={heroBgRef} className={styles.heroBg}></div>

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        Soccer<br />Flow
                    </h1>
                    <button className={styles.subscribe} onClick={() => setShowPopup(true)}>
                        Subscribe
                    </button>
                </div>
            </section>

            {showPopup && <SubscribePopup onClose={() => setShowPopup(false)} />}

            <section className={styles.matches}>
                <div className={styles.matchesContent}>
                    <h2 className={styles.sectionTitle}>Today's Matches</h2>
                    <div className={styles.carousel}>
                        <button onClick={todayCarousel.prev} className={styles.arrowBtn}>
                            <Image src="/left-arrow.svg" alt="Left" width={40} height={40} />
                        </button>

                        <div className={styles.today}>
                            {todayCarousel.visible.map((m) => {
                                const isActive = m.id === todayCarousel.index;
                                return (
                                    <div
                                        key={m.id}
                                        onClick={() => todayCarousel.goTo(m.id)}
                                        className={`${styles.matchCard} ${isActive ? styles.mainCard : ""}`}
                                    ></div>
                                );
                            })}
                        </div>

                        <button onClick={todayCarousel.next} className={styles.arrowBtn}>
                            <Image src="/right-arrow.svg" alt="Right" width={40} height={40} />
                        </button>
                    </div>

                    <div className={styles.subSections}>
                        <div className={styles.sub}>
                            <h3>Previous Matches</h3>
                            <div className={styles.carouselSmall}>
                                <button onClick={prevCarousel.prev} className={styles.arrowBtnSmall}>
                                    <Image src="/left-arrow.svg" alt="Left" width={30} height={30} />
                                </button>

                                <div className={styles.smallCards}>
                                    {prevCarousel.visible.map((m) => {
                                        const isActive = m.id === prevCarousel.index;
                                        return (
                                            <div
                                                key={m.id}
                                                onClick={() => prevCarousel.goTo(m.id)}
                                                className={`${styles.smallCard} ${isActive ? styles.mainSmallCard : ""}`}
                                            ></div>
                                        );
                                    })}
                                </div>

                                <button onClick={prevCarousel.next} className={styles.arrowBtnSmall}>
                                    <Image src="/right-arrow.svg" alt="Right" width={30} height={30} />
                                </button>
                            </div>
                        </div>

                        <div className={styles.sub}>
                            <h3>Upcoming Matches</h3>
                            <div className={styles.carouselSmall}>
                                <button onClick={upcomingCarousel.prev} className={styles.arrowBtnSmall}>
                                    <Image src="/left-arrow.svg" alt="Left" width={30} height={30} />
                                </button>

                                <div className={styles.smallCards}>
                                    {upcomingCarousel.visible.map((m) => {
                                        const isActive = m.id === upcomingCarousel.index;
                                        return (
                                            <div
                                                key={m.id}
                                                onClick={() => upcomingCarousel.goTo(m.id)}
                                                className={`${styles.smallCard} ${isActive ? styles.mainSmallCard : ""}`}
                                            ></div>
                                        );
                                    })}
                                </div>

                                <button onClick={upcomingCarousel.next} className={styles.arrowBtnSmall}>
                                    <Image src="/right-arrow.svg" alt="Right" width={30} height={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
