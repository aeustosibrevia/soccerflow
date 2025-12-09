import styles from "./Auth.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function EditProfile({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles["overlay"]} onClick={onClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {children}

        <div className={styles["user-info"]}>
          <div>
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
              <div>
                <div>
                  <p>Email</p>
                  <input
                    value="user@email.com"
                    className={styles["email"]}
                    readOnly
                  ></input>
                </div>
              </div>
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
              <div>
                <label className={styles["checkbox-wrapper"]}>
                  <input type="checkbox" className={styles["checkbox"]} readOnly/>
                  <span className={styles["custom-checkbox"]}></span>
                  <span className={styles["checkbox-text"]}>
                    Email Notifications
                  </span>
                </label>
              </div>
            </div>
            <div className={styles["user-ava"]}>
              <img
                src="/icons/user-avatar.svg"
                alt="avatar"
                className={styles["user-ava"]}
              />
            </div>
          </div>
        </div>

        <button className={styles["closeBtn"]} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
