import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.section}>
                <h3>Main</h3>
                <ul>
                    <li>Про нас</li>
                    <li>Відгуки</li>
                    <li>Вакансії</li>
                    <li>Політика конфіденційності</li>
                    <li>Угода користувача</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h3>Контакти</h3>
                <p>soccerflow@gmail.com</p>
                <p>@soccerflow</p>
                <p>+380XX XXXXXXX</p>
            </div>

            <div className={styles.section}>
                <h3>Графік роботи call-центру:</h3>
                <p>Будні: з 9:00 до 19:00</p>
                <p>Вихідні: з 10:00 до 18:00</p>
            </div>

            <div className={styles.section}>
                <h3>Отримувати новини</h3>
                <div className={styles.subscribe}>
                    <input type="email" placeholder="Введіть email" />
                    <button>Підписатися</button>
                </div>
                <h3>Слідкуй за новинами</h3>
                <div className={styles.socials}>
                    <Image src="/icons/instagram.svg" alt="Instagram" width={22} height={22} />
                    <Image src="/icons/facebook.svg" alt="Facebook" width={22} height={22} />
                    <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={22} height={22} />
                    <Image src="/icons/telegram.svg" alt="Telegram" width={22} height={22} />
                </div>
            </div>
        </footer>
    );
}
