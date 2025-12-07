import { useState, useEffect, useRef, RefObject } from "react";

type UseFiltersReturn = {
    values: Record<string, string>;
    activeDropdown: string | null;
    containerRef: RefObject<HTMLDivElement | null>;
    setFilterValue: (key: string, value: string) => void;
    selectOption: (key: string, value: string) => void;
    toggleDropdown: (key: string) => void;
};

export const useFilters = (): UseFiltersReturn => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const setFilterValue = (key: string, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const selectOption = (key: string, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setActiveDropdown(null);
    };

    const toggleDropdown = (key: string) => {
        setActiveDropdown((prev) => (prev === key ? null : key));
    };

    return {
        values,
        activeDropdown,
        containerRef,
        setFilterValue,
        selectOption,
        toggleDropdown,
    };
};