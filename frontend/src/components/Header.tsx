"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Link href="/" className={styles.brand} aria-label="Soccer Flow">
                    <Image
                        src="/icons/logo.svg"
                        alt="Soccer Flow"
                        width={40}
                        height={40}
                        priority
                        className={styles.logoImg}
                    />
                    <div className={styles.logoText}>
                        <span className={styles.logoTop}>Soccer</span>
                        <span className={styles.logoBottom}>Flow</span>
                    </div>
                </Link>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Search..." />
                    <Image
                        src="/icons/search.svg"
                        alt="search"
                        width={16}
                        height={16}
                        className={styles.searchIcon}
                    />
                </div>
            </div>

            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/matches">Matches</Link>
                <Link href="/teams">Teams</Link>

                <div className={styles.icons}>
                    <Image src="/icons/user.svg" alt="user" width={20} height={20} />
                    <Image src="/icons/heart.svg" alt="favorites" width={20} height={20} />
                </div>
            </nav>
        </header>
    );
}
