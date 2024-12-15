import { useEffect, useRef } from "react";
import Link from "../Link/Link";
import styles from "./SideMenu.module.css";
import IconButton from "../IconButton/IconButton";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    const firstLinkRef = useRef<HTMLAnchorElement>(null);
    const sideMenuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isOpen && firstLinkRef.current) {
            firstLinkRef.current.focus();
        }

        const trapFocus = (event: KeyboardEvent) => {
            if (event.key === "Tab") {
                const focusableElements = sideMenuRef.current?.querySelectorAll("a[href], button:not([disabled])");

                if (focusableElements && focusableElements.length > 0) {
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (event.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            event.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            event.preventDefault();
                        }
                    }
                }
            } else if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", trapFocus);
        return () => {
            document.removeEventListener("keydown", trapFocus);
        };
    }, [isOpen]);

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`}
                onClick={onClose}
                aria-hidden={!isOpen}
            ></div>

            <aside className={`${styles.aside} ${isOpen ? styles.open : ""}`} ref={sideMenuRef}>
                <IconButton
                    iconName="close"
                    iconSize={24}
                    iconColor="default"
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Schließen Sie das Menü"
                />

                <nav id="mobile-navigation">
                    <ul className={styles.linkList}>
                        <li className={styles.listItem}>
                            <Link
                                href="/dashboard"
                                linkText="Dashboard"
                                mode="sleek"
                                aria-label="Gehen Sie zu Ihrem Dashboard"
                            />
                        </li>
                        <li className={styles.listItem}>
                            <Link
                                href="/check-skin"
                                linkText="Haut prüfen"
                                mode="sleek"
                                aria-label="Prüfen Sie Ihre Haut"
                            />
                        </li>
                        <li className={styles.listItem}>
                            <Link
                                href="/account/analyses"
                                linkText="Meine Analysen"
                                mode="sleek"
                                aria-label="Gehen Sie zu Ihren Analysen"
                            />
                        </li>
                        <li className={styles.listItem}>
                            <Link
                                href="/tutorial"
                                linkText="Anleitung"
                                mode="sleek"
                                aria-label="Gehen Sie zur Anleitung für die Prüfung der Haut"
                            />
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default SideMenu;
