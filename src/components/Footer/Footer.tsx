"use client";

import Heading from "../Heading/Heading";
import Link from "../Link/Link";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <section className={styles.footerSectionGrow}>
                    <Logo context="footer" />
                </section>
                <section className={styles.footerSection}>
                    <nav>
                        <ul className={styles.linkList}>
                            <li>
                                <Link
                                    href="/about/skin-cancer-detection"
                                    linkText="Über Skin Cancer Detection"
                                    mode="sleek"
                                    aria-label="Gehen Sie zu Informationen über Skin Cancer Detection"
                                    className={styles.footerLink}
                                />
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    linkText="Kontakt"
                                    mode="sleek"
                                    aria-label="Gehen Sie zum Kontaktformular"
                                    className={styles.footerLink}
                                />
                            </li>
                            <li>
                                <Link
                                    href="/impressum"
                                    linkText="Impressum"
                                    mode="sleek"
                                    aria-label="Gehen Sie zum Impressum"
                                    className={styles.footerLink}
                                />
                            </li>
                            <li>
                                <Link
                                    href="/datenschutz"
                                    linkText="Datenschutz"
                                    mode="sleek"
                                    aria-label="Gehen Sie zur Datenschutzerklärung"
                                    className={styles.footerLink}
                                />
                            </li>
                            <li>
                                <Link
                                    href="/barrierefreiheit"
                                    linkText="Barrierefreiheit"
                                    mode="sleek"
                                    aria-label="Gehen Sie zur Barrierefreiheitserklärung"
                                    className={styles.footerLink}
                                />
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
