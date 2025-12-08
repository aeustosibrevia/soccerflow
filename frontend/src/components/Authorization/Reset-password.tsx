import { useState } from "react";
import styles from "./Change-password.module.css";


interface ResetPassword {
    onClose: () => void;
}

export default function ResetPassword({
    onClose }: ResetPassword) {

    const [email, setEmail] = useState("");

    const sendResetLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        /*sending reset link*/
        onClose();
    };


    return (
        <div className={styles["overlay"]}>
            <div className={styles["modal"]}>
                <button className={styles["close-btn"]} onClick={onClose}>
                    <img src="/icons/close.svg" alt="close-btn"></img>
                </button>

                <h2>Forgot your password?</h2>
                <div className={styles["field"]}>
                    <p className={styles["descr"]}>Don’t worry! Enter your email address below, and we’ll send you a link to reset your password.</p>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="enter your registered email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button onClick={sendResetLink} className={styles["save-btn"]}>
                    Send Reset Link
                </button>
            </div>

        </div>
    );

}