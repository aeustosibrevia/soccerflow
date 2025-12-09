import { useState } from "react";
import styles from "./Registration.module.css";

interface RegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogIn: () => void;
}

export default function Registration({
  onClose,
  onSuccess,
  onSwitchToLogIn
}: RegistrationProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password || !confirm) {
      alert("Заповніть всі поля!");
      return;
    }

    if (password !== confirm) {
      alert("Паролі не співпадають!");
      return;
    }

    console.log("Реєстрація успішна:", { username, email, password });
    onSuccess();
    onClose();

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSwitchToLogIn();
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["close-btn"]} onClick={onClose}>
          <img src="/icons/close.svg" alt="close-btn"></img>
        </button>

        <h2 className={styles["reg-title"]}>
          <b>Create</b> your account
        </h2>

        <form onSubmit={handleSubmit} className={styles["reg-form"]}>
          <p>Username</p>
          <input
            placeholder="choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="repeat password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit" className={styles["confirmation-button"]}>
            Sign Up
          </button>

          <p className={styles["have-account"]}>
            Already have an account?{" "}
            <button onClick={handleLogIn} className={styles["log-in-btn"]}>
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
