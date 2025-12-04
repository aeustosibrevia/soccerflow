"use client";
import { useState } from "react";
import styles from "./SubscribePopup.module.css";

export default function SubscribePopup({ onClose }: { onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubscribe = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        console.log("Subscribed:", email);

        setError("");
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeBtn} onClick={onClose}>
                    ×
                </button>

                <h3 className={styles.title}>Subscribe to our channel</h3>
                <p className={styles.text}>
                    Stay updated with the latest match news, team updates, and football analytics.
                </p>

                <input
                    type="email"
                    placeholder="enter your email address"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.subscribe} onClick={handleSubscribe}>
                    Subscribe
                </button>
            </div>
        </div>
    );
}
