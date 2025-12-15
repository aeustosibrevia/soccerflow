import React from 'react';
import styles from './PlayerModalStats.module.css';
import { NoteButton } from "@/src/components/ui/NoteButton";

export interface PlayerStats {
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
    rating: number;
    shots_on_target: number;
    passes_completed: number;
    tackles: number;
    saves: number;
}

export interface Player {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    team?: string;
    number?: string;
    country?: string;
    dob?: string;
    height?: string;
    stats?: PlayerStats;
}

interface PlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    player: Player | null;
}

export default function PlayerModal({ isOpen, onClose, player }: PlayerModalProps) {
    if (!isOpen || !player) return null;

    const stats = player.stats || {
        goals: 0, assists: 0, yellow_cards: 0, red_cards: 0,
        rating: 0.0, shots_on_target: 0, passes_completed: 0,
        tackles: 0, saves: 0
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.mainLayout}>

                    <div className={styles.leftColumn}>

                        <div className={styles.headerRow}>
                            <div className={styles.infoBlock} style={{ flex: 2 }}>
                                <div className={styles.label}>Full Name</div>
                                <div className={styles.valueBox}>{player.name}</div>
                            </div>
                            <div className={styles.infoBlock} style={{ flex: 0.5 }}>
                                <div className={styles.label}>Number</div>
                                <div className={styles.valueBox}>{player.number || "11"}</div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.infoBlock}>
                                <div className={styles.label}>Team</div>
                                <div className={styles.valueBox}>{player.team || "FC Barcelona"}</div>
                            </div>
                            <div className={styles.infoBlock}>
                                <div className={styles.label}>Position</div>
                                <div className={styles.valueBox}>{player.role}</div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.infoBlock}>
                                <div className={styles.label}>Country</div>
                                <div className={styles.valueBox}>{player.country || "Brazil"}</div>
                            </div>
                            <div className={styles.infoBlock}>
                                <div className={styles.label}>Age/DOB</div>
                                <div className={styles.valueBox}>{player.dob || "Dec 14, 1996"}</div>
                            </div>
                            <div className={styles.infoBlock} style={{ flex: 0.6 }}>
                                <div className={styles.label}>Height</div>
                                <div className={styles.valueBox}>{player.height || "176 cm"}</div>
                            </div>
                        </div>

                        <div className={styles.statsSection}>
                            <div className={styles.sectionTitle}>Season Statistics</div>
                            <div className={styles.statsGrid}>
                                <StatItem label="Goals" value={stats.goals} />
                                <StatItem label="Assists" value={stats.assists} />
                                <StatItem label="Rating" value={stats.rating} isRating />

                                <StatItem label="Shots (Target)" value={stats.shots_on_target} />
                                <StatItem label="Passes" value={stats.passes_completed} />
                                <StatItem label="Tackles" value={stats.tackles} />

                                <StatItem label="Saves" value={stats.saves} />
                                <StatItem label="Yellow Cards" value={stats.yellow_cards} color="#E8B026" />
                                <StatItem label="Red Cards" value={stats.red_cards} color="#C0392B" />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <NoteButton onClick={onClose} style={{ backgroundColor: '#446B5F', width: '100%' }}>
                                Close Profile
                            </NoteButton>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={player.imageUrl || "/placeholder-player.png"}
                                alt={player.name}
                                className={styles.playerImage}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const StatItem = ({ label, value, color, isRating }: { label: string, value: string | number, color?: string, isRating?: boolean }) => (
    <div className={styles.statBox}>
        <span className={styles.statLabel}>{label}</span>
        <span
            className={styles.statValue}
            style={{ color: color ? color : '#00223B', fontWeight: isRating ? 700 : 400 }}
        >
            {value}
        </span>
    </div>
);