"use client";

import styles from "./TitleWithButtons.module.css";
import PageNavButtons from "./PageNavButtons";
import { usePinUnderHeader } from "@/src/hooks/usePinUnderHeader";
// Импортируем наш новый компонент и типы
import FilterBar, { FilterConfig } from "./FilterBar";

type Props = {
    title?: string;

    // Опция 1: Старые кнопки
    buttons?: string[];
    onButtonClick?: (index: number) => void;

    // Опция 2: Новые фильтры
    filters?: FilterConfig[];
    onSearch?: (values: any) => void;
};

export default function TitleWithButtons({
                                             title,
                                             buttons = [],
                                             onButtonClick,
                                             filters,
                                             onSearch
                                         }: Props) {
    const { wrapperRef, isPinned, placeholderHeight } = usePinUnderHeader(110);

    const hasButtons = buttons && buttons.length > 0;
    const hasFilters = filters && filters.length > 0;

    const showStickyBar = hasButtons || hasFilters;

    return (
        <div className={styles.container}>
            {title && <h1 className={styles.title}>{title}</h1>}

            {showStickyBar && (
                <>
                    {isPinned && <div style={{ height: placeholderHeight }} />}

                    <div
                        ref={wrapperRef}
                        className={`${styles.wrapper} ${isPinned ? styles.pinned : ""}`}
                    >
                        {hasButtons && (
                            <div className={styles.buttons}>
                                {buttons.map((label, index) => (
                                    <PageNavButtons
                                        key={index}
                                        label={label}
                                        onClick={() => onButtonClick?.(index)}
                                    />
                                ))}
                            </div>
                        )}

                        {hasFilters && (
                            <div>
                                <FilterBar
                                    configs={filters}
                                    onSearch={(vals) => onSearch?.(vals)}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}