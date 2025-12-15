"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from "./PlayersStats.module.css"
import PlayerModalStats from "@/src/components/Stats/PlayerModalStats";

interface Player {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
}

export default function PlayersStats() {

    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const players: Player[] = Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        name: 'Raphael Dias Belloli',
        role: 'Winger',
        imageUrl: '/player.png',
    }));

    const handlePlayerClick = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    return (
        <div className={styles.container}>



            <div className={styles.squadWrapper}>
                {players.map((player) => (
                    <div
                        key={player.id}
                        className={styles.playerCard}
                        onClick={() => handlePlayerClick(player)}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={player.imageUrl}
                                alt={player.name}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 20vw"
                            />
                        </div>
                        <h4 className={styles.name}>{player.name}</h4>
                        <span className={styles.role}>{player.role}</span>
                    </div>
                ))}
            </div>

            <PlayerModalStats
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                player={selectedPlayer}
            />

        </div>
    );
}