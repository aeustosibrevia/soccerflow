import Registration from "./Registration";
import styles from "./Registration.module.css";
import { useState } from "react";
import ResetPassword from "./Reset-password";

interface LogInProps {
    onClose: () => void;
    onSuccess: () => void;
    onSwitchToReg: () => void;
    onSwitchToReset: () => void
}

export default function LogIn({
    onClose,
    onSuccess,
    onSwitchToReg,
    onSwitchToReset }: LogInProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [resetModalOpen, setResetModalOpen] = useState(false);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Заповніть всі поля!");
            return;
        }

        /*if (password !== userpassword) {
          alert("Паролі не співпадають!");
          return;
        }*/

        console.log("Вхід успішний:", { email, password });
        onSuccess();
        onClose();

        setEmail("");
        setPassword("");
    };

    const handleReg = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSwitchToReg();
        onClose();
    };

    const resetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSwitchToReset();

    }


    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
                <button className={styles["close-btn"]} onClick={onClose}>
                    <img src="/icons/close.svg" alt="close-btn"></img>
                </button>

                <h2 className={styles["reg-title"]}>
                    <b>Log</b>
                    {" "}in to{" "}
                    <b>your account</b>
                </h2>

                <form onSubmit={handleSubmit} className={styles["reg-form"]}>

                    <p>Email</p>
                    <input
                        placeholder="enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className={styles["forgot-password"]}>Forgot password?{" "}
                        <button onClick={resetPassword} className={styles["log-in-btn"]}>
                            Reset
                        </button>
                        {resetModalOpen &&
                            <ResetPassword onClose={onClose}></ResetPassword>
                        }
                    </p>

                    <button type="submit" className={styles["confirmation-button"]}>
                        Log In
                    </button>

                    <p className={styles["have-account"]}>
                        Don’t have an account?{" "}
                        <button onClick={handleReg} className={styles["log-in-btn"]}>
                            Sign Up
                        </button>
                    </p>

                </form>

            </div>
        </div>
    );
}