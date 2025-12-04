import styles from "./page.module.css";
import UserAva from "../../../public/icons/user-avatar.svg";

export default function Account() {
    return (
        <div className={styles["account-page"]}>
            <h1 className={styles["account-title"]}>My account</h1>

            <div className={styles["btn-container"]}>
                <button className={styles["btn"]}>Favorites</button>
                <button className={styles["btn"]}>Calendar</button>
            </div>

            <div className={styles["account-container"]}>
                <h2 className={styles["greeting"]}>Welcome, <b>birdie!</b></h2>
                
                <div className={styles["user-info"]}> 
                    <div className={styles["text-info"]}>
                        <div className={styles["names"]}>
                            <div>
                                <p>Username</p>
                                <input value="birde" readOnly></input>
                            </div>
                            <div>
                                <p>First Name</p>
                                <input value="Alex" readOnly></input>
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input value="Shoqho" readOnly></input>
                            </div>
                            
                        </div>
                        <div><div>
                            <p>Email</p>
                            <input value="user@email.com" id="email-input" readOnly></input>
                        </div></div>
                        <div>
                            <div>
                                <p>Country</p>
                                <input value="Ukraine" readOnly></input>
                            </div>
                            <div>
                                <p>Date of Birth</p>
                                <input value="Dec 14, 1996 " readOnly></input>
                            </div>
                            <div>
                                <p>Age</p>
                                <input value="28" readOnly></input>
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles["user-ava"]}>
                        <img src="/icons/user-avatar.svg" alt="avatar" className={styles["user-ava"]} />
                    </div>
                </div>

            </div>
        </div>
    );
    
}

