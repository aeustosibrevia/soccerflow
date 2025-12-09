"use client";
import { useState } from "react";
import styles from "./Change-password.module.css";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    oldPassword: string;
}

export default function ChangePasswordModal({
    isOpen,
    onClose,
    oldPassword,
}: ChangePasswordModalProps) {
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
        if (!currentPassword || !oldPassword) {
            alert("Заповніть всі поля!");
            return;
        }

        if (currentPassword !== oldPassword) {
            alert("Неправильний пароль");
            return;
        }
        console.log("Old password:", oldPassword);
        console.log("New password:", newPassword);
        setNewPassword("");
        setConfirmPassword("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles["overlay"]}>
            <div className={styles["modal"]}>
                <button className={styles["close-btn"]} onClick={onClose}>
                    <img src="/icons/close.svg" alt="close-btn"></img>
                </button>
                <h2>Change Password</h2>
                <div className={styles["field"]}>
                    <p>Current password</p>
                    <input
                        type="password"
                        placeholder="enter your current password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className={styles["field"]}>
                    <p>New password</p>
                    <input
                        type="password"
                        placeholder="enter your new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button className={styles["save-btn"]} onClick={handleSave}>
                    Save changes
                </button>
            </div>
        </div>
    );
}
