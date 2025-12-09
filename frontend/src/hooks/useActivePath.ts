"use client";
import { usePathname } from "next/navigation";


export const useActivePath = (href: string): boolean => {
    const pathname = usePathname();
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
};
