"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useActivePath } from "../../hooks/useActivePath";

export default function Header() {
    const isHome = useActivePath("/");
    const isMatches = useActivePath("/matches");
    const isTeams = useActivePath("/teams");
    const isAccount = useActivePath("/account");
    const isFavorites = useActivePath("/favorites");

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
                <Link
                    href="/"
                    className={`${styles.navLink} ${isHome ? styles.active : ""}`}
                >
                    Home
                </Link>
                <Link
                    href="/matches"
                    className={`${styles.navLink} ${isMatches ? styles.active : ""}`}
                >
                    Matches
                </Link>
                <Link
                    href="/teams"
                    className={`${styles.navLink} ${isTeams ? styles.active : ""}`}
                >
                    Teams
                </Link>

                <div className={styles.icons}>

                    <Link href="/account" className={styles.iconLink}>
                        <div className={styles.iconWrapper}>
                            <Image src={isAccount ? "/icons/user-active.svg" : "/icons/user.svg"} alt="user" width={30} height={30} />
                        </div>
                    </Link>

                    <Link href="/favorites" className={styles.iconLink}>
                        <div className={styles.iconWrapper}>
                            <Image src={isFavorites ? "/icons/heart-active.svg" : "/icons/heart.svg"} alt="favorites" width={30} height={30} />
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
