"use client";

import Image from 'next/image';
import styles from './PlayerViewer.module.css';
import { useCarousel } from '@/src/hooks/useCarousel';
import {NoteButton} from "@/src/components/ui/NoteButton";

interface Player {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    team: string;
    number: number;
    country: string;
    dob: string;
    height: string;
    bio: string;
}

const mockPlayers: Player[] = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? 'Raphael Dias Belloli' : 'Robert Lewandowski',
    role: i % 2 === 0 ? 'Winger' : 'Striker',
    imageUrl: '/player.png',
    team: 'FC Barcelona',
    number: i % 2 === 0 ? 11 : 9,
    country: i % 2 === 0 ? 'Brazil' : 'Poland',
    dob: 'Dec 14, 1996 (Age 28)',
    height: '176 cm',
    bio: `Raphinha began his career with Brazilian club Avai, before signing for the Portuguese Vitória de Guimarães in 2016. In 2018, he joined fellow Primeira Liga club Sporting CP. Winning the double of the Taça de Portugal and Taça da Liga in 2019.`
}));

export default function PlayerViewer() {
    const { index, prev, next, goTo } = useCarousel(mockPlayers);
    const activePlayer = mockPlayers[index];

    const getVisibleStrip = () => {
        const strip = [];
        const range = 3;
        for (let i = -range; i <= range; i++) {
            const idx = (index + i + mockPlayers.length) % mockPlayers.length;
            strip.push({ ...mockPlayers[idx], originalIndex: idx });
        }
        return strip;
    };

    const visibleStrip = getVisibleStrip();

    return (
        <section className={styles.container}>

            <div className={styles.contentWrapper}>

                <div className={styles.carouselRow}>



                    <div className={styles.track}>
                        {visibleStrip.map((item, i) => {
                            const isActive = i === 3;

                            return (
                                <div
                                    key={`${item.id}-${i}`}
                                    className={`${styles.smallCard} ${isActive ? styles.smallCardActive : ''}`}
                                    onClick={() => goTo(item.originalIndex)}
                                >
                                    <div className={styles.smallImageWrapper}>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className={styles.mainImage}
                                        />
                                    </div>
                                    <h4 className={styles.smallName}>{item.name}</h4>
                                    <span className={styles.smallRole}>{item.role}</span>
                                </div>
                            );
                        })}
                    </div>

                </div>


                <div className={styles.detailCard}>

                    <div className={styles.infoCol}>
                        <div className={styles.playerHeader}>
                            <h2 className={styles.largeName}>{activePlayer.name}</h2>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Team</span>
                                <div className={styles.pill}>{activePlayer.team}</div>
                            </div>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Position</span>
                                <div className={styles.pill}>{activePlayer.role}</div>
                            </div>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Number</span>
                                <div className={styles.pill}>{activePlayer.number}</div>
                            </div>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Country</span>
                                <div className={styles.pill}>{activePlayer.country}</div>
                            </div>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Date of Birth</span>
                                <div className={styles.pill}>{activePlayer.dob}</div>
                            </div>
                            <div className={styles.pillGroup}>
                                <span className={styles.pillLabel}>Height</span>
                                <div className={styles.pill}>{activePlayer.height}</div>
                            </div>
                        </div>

                        <div className={styles.bioBox}>
                            <p>{activePlayer.bio}</p>
                        </div>

                        <NoteButton style={{ backgroundColor: '#445A6B'}}>
                            More info
                        </NoteButton>
                    </div>

                    <div className={styles.imageCol}>
                        <Image
                            src={activePlayer.imageUrl}
                            alt={activePlayer.name}
                            fill
                            className={styles.mainImage}
                            sizes="(max-width: 768px) 100vw, 400px"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}