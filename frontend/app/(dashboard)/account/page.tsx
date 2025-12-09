"use client";
import styles from "./page.module.css";
import { useState, useRef } from "react";
import EditProfile from "../../../src/components/Authorization/Edit-profile"
import ChangePasswordModal from "@/src/components/Authorization/Change-password";
import TitleWithButtons from "@/src/components/ui/TitleWithButtons";
export default function Account() {

    const testuser = {
        username: "birde",
        firstName: "Alex",
        lastName: "Shoqho",
        email: "user@email.com",
        country: "Ukraine",
        birthdate: "Dec 14, 1996",
        age: "28",
        password: "12345678",
        ava: ""

    }

    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);


    const [username, setUsername] = useState(testuser.username);
    const [firstName, setFirstName] = useState(testuser.firstName);
    const [lastName, setLastName] = useState(testuser.lastName);
    const [email, setEmail] = useState(testuser.email);
    const [country, setCountry] = useState(testuser.country);
    const [birthdate, setBirthdate] = useState(testuser.birthdate);
    const [age, setAge] = useState(testuser.age);
    const [password, setPassword] = useState(testuser.password);
    const [userAva, setUserAva] = useState(testuser.ava);
    const fileInputRef = useRef<HTMLInputElement>(null);



    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setUserAva(imageUrl);
    }


    return (
        <div className={styles["account-page"]}>

            <TitleWithButtons
                title="Your profile"
                buttons={["Favorites", "Calendar"]}
            />

            <div className={styles["account-container"]}>
                <h2 className={styles["greeting"]}>Welcome, <b>birdie!</b></h2>

                <div className={styles["user-info"]}>
                    <div>
                        <div className={styles["text-info"]}>
                            <div className={styles["names"]}>
                                <div>
                                    <p>Username</p>
                                    <input value={username} readOnly={!isEditing} onChange={e => setUsername(e.target.value)} ></input>
                                </div>
                                <div>
                                    <p>First Name</p>
                                    <input value={firstName} readOnly={!isEditing} onChange={e => setFirstName(e.target.value)} ></input>
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <input value={lastName} readOnly={!isEditing} onChange={e => setLastName(e.target.value)} ></input>
                                </div>

                            </div>
                            <div><div>
                                <p>Email</p>
                                <input value={email} className={styles["email"]} readOnly={!isEditing} onChange={e => setEmail(e.target.value)} ></input>
                            </div></div>
                            <div>
                                <div>
                                    <p>Country</p>
                                    <input value={country} readOnly={!isEditing} onChange={e => setCountry(e.target.value)} ></input>
                                </div>
                                <div>
                                    <p>Date of Birth</p>
                                    <input value={birthdate} readOnly={!isEditing} onChange={e => setBirthdate(e.target.value)} ></input>
                                </div>
                                <div>
                                    <p>Age</p>
                                    <input value={age} readOnly={!isEditing} onChange={e => setAge(e.target.value)} ></input>
                                </div>


                            </div>
                            {isEditing && (
                                <div className={styles["password-change-container"]}>
                                    <div>
                                        <p className={styles["password-change-title"]}>Password</p>
                                        <input
                                            type="password"
                                            value={password}
                                            readOnly
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            className={styles["edit-password-btn"]}
                                            onClick={() => setIsPasswordEditing(!isPasswordEditing)}
                                        >
                                            Change password
                                        </button>

                                        <ChangePasswordModal
                                            isOpen={isPasswordEditing}
                                            onClose={() => setIsPasswordEditing(false)}
                                            oldPassword={testuser.password}
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className={styles["checkbox-wrapper"]}>
                                    <input type="checkbox" className={styles["checkbox"]} />
                                    <span className={styles["custom-checkbox"]}></span>
                                    <span className={styles["checkbox-text"]}>Email Notifications</span>
                                </label>
                            </div>
                        </div>
                        <div className={styles["user-ava"]}>
                            <img src={userAva == "" ? "/icons/user-avatar.svg" : userAva} alt="avatar" className="d" />
                            {isEditing && (
                                <button
                                    className={styles["edit-photo-btn"]}
                                    onClick={handleButtonClick}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    Change photo
                                </button>
                            )}

                        </div>

                    </div>



                </div>

                <div className={styles["edit-profile-btn-container"]}>
                    <button
                        className={styles["edit-profile-btn"]}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Save" : "Edit profile"}
                    </button>
                    <button
                        className={styles["edit-profile-btn"]}
                    /*onClick=handleLogOut*/
                    >
                        Exit
                    </button>
                </div>



            </div>
        </div>
    );

}

