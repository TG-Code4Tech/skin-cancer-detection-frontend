"use client";

import { useState } from "react";
import Logo from "../Logo/Logo";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";
import styles from "./Header.module.css";
import IconButton from "../IconButton/IconButton";
import SideMenu from "../SideMenu/SideMenu";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.topNavigation}>
                <ul className={styles.linkListTop}>
                    <li>
                        <Logo />
                    </li>
                    <li className={styles.accountListItem}>
                        <Link
                            href="/account"
                            linkText="Account"
                            iconName="account"
                            iconSize={24}
                            iconColor="default"
                            mode="sleek"
                            aria-label="Gehen Sie zu Ihrem Benutzerkonto"
                        />
                    </li>
                    <li>
                        <IconButton
                            iconName="menu"
                            iconSize={24}
                            iconColor="default"
                            aria-label="Menü umschalten"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="bottom-nagivation"
                            onClick={toggleMobileMenu}
                        />
                    </li>
                </ul>
            </nav>
            <nav id="bottom-navigation" className={styles.bottomNavigation}>
                <ul className={styles.linkListBottom}>
                    <li>
                        <Link
                            href="/dashboard"
                            linkText="Dashboard"
                            mode="sleek"
                            aria-label="Gehen Sie zu Ihrem Dashboard"
                        />
                    </li>
                    <li>
                        <Link
                            href="/check-skin"
                            linkText="Haut prüfen"
                            mode="sleek"
                            aria-label="Prüfen Sie Ihre Haut"
                        />
                    </li>
                    <li>
                        <Link
                            href="/account/analyses"
                            linkText="Meine Analysen"
                            mode="sleek"
                            aria-label="Gehen Sie zu Ihren Analysen"
                        />
                    </li>
                    <li>
                        <Link
                            href="/tutorial"
                            linkText="Anleitung"
                            mode="sleek"
                            aria-label="Gehen Sie zur Anleitung für die Prüfung der Haut"
                        />
                    </li>
                </ul>
            </nav>

            <SideMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    );
};

export default Header;
