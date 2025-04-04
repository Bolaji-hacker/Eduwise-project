import { clsx } from "clsx"
import { twMerge } from "tailwind-merge";

export function cn(...values) {
    return twMerge(clsx(values))
}

export const specialAccessRoles = [
    "admin",
    "super_admin",
    "lecturer",
];