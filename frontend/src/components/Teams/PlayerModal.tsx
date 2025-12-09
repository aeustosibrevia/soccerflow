import React, { useEffect, useState } from 'react';
import styles from './PlayerModal.module.css';
import {NoteButton} from "@/src/components/ui/NoteButton";

interface Player {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    team?: string;
    number?: string;
    country?: string;
    dob?: string;
    height?: string;
    bio?: string;
}

interface PlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    player: Player | null;
}

export default function PlayerModal({ isOpen, onClose, player }: PlayerModalProps) {

    const [formData, setFormData] = useState<Partial<Player>>(player || {});

    useEffect(() => {
        if (player) {
            setFormData(player);
        }
    }, [player]);

    if (!isOpen || !player) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            className={styles.input}
                            defaultValue={player.name}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Team</label>
                        <input className={styles.input} defaultValue="FC Barcelona" />
                    </div>
                    <div className={styles.col}>
                        <label className={styles.label}>Position</label>
                        <input className={styles.input} defaultValue={player.role} />
                    </div>
                    <div className={`${styles.col} ${styles.colSmall}`}>
                        <label className={styles.label}>Number</label>
                        <input className={styles.input} defaultValue="11" />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Country</label>
                        <input className={styles.input} defaultValue="Brazil" />
                    </div>
                    <div className={styles.col}>
                        <label className={styles.label}>Date of Birth</label>
                        <input className={styles.input} defaultValue="Dec 14, 1996 (Age 28)" />
                    </div>
                    <div className={styles.col}>
                        <label className={styles.label}>Height</label>
                        <input className={styles.input} defaultValue="176 cm" />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
            <textarea
                className={`${styles.input} ${styles.textarea}`}
                defaultValue={`Raphinha began his career with Brazilian club Avaí...`}
            />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Photo</label>
                        <input
                            className={styles.input}
                            defaultValue={player.imageUrl || ""}
                        />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <NoteButton style={{ backgroundColor: '#446B5F'}}>
                        Save</NoteButton>
                    <NoteButton onClick={onClose} style={{ backgroundColor: '#614F4C'}}>
                        Cancel</NoteButton>
                </div>

            </div>
        </div>
    );
}