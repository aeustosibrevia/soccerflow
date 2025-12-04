"use client";

import styles from "./FilterBar.module.css";
import Image from "next/image";
import { useFilters } from "@/src/hooks/useFilters";

export type FilterOption = {
    id: string | number;
    label: string;
};

export type FilterConfig = {
    key: string;
    placeholder: string;
    options: FilterOption[];
    iconSrc?: string;
};

type Props = {
    configs: FilterConfig[];
    onSearch: (values: Record<string, string>) => void;
};

export default function FilterBar({ configs, onSearch }: Props) {
    const {
        values,
        activeDropdown,
        containerRef,
        setFilterValue,
        selectOption,
        toggleDropdown
    } = useFilters();

    return (
        <div className={styles.filterContainer} ref={containerRef}>
            {configs.map((config) => (
                <div key={config.key} className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder={config.placeholder}
                        value={values[config.key] || ""}
                        onChange={(e) => setFilterValue(config.key, e.target.value)}
                        onFocus={() => toggleDropdown(config.key)}
                    />

                    <div
                        className={styles.dropdownIcon}
                        onClick={() => toggleDropdown(config.key)}
                    >
                        <Image
                            src={config.iconSrc || "/icons/arrow-down.png"}
                            alt="toggle"
                            width={20}
                            height={20}
                        />
                    </div>

                    {activeDropdown === config.key && config.options.length > 0 && (
                        <ul className={styles.dropdownList}>
                            {config.options
                                .filter(opt =>
                                    opt.label.toLowerCase().includes((values[config.key] || "").toLowerCase())
                                )
                                .map((opt) => (
                                    <li
                                        key={opt.id}
                                        className={styles.dropdownItem}
                                        onClick={() => selectOption(config.key, opt.label)}
                                    >
                                        {opt.label}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            ))}

            <button className={styles.searchButton} onClick={() => onSearch(values)}>
                <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
            </button>
        </div>
    );
}