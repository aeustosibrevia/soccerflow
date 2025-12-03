import styles from "./page.module.css";


import TitleWithButtons from "@/src/components/ui/TitleWithButtons";

export default function Playground() {


    return (
        <div className={styles.page}>
            <TitleWithButtons
                title="My Favorites"
                buttons={["Favorite Matches", "Favorite Teams"]}
            />

        </div>
    );
}