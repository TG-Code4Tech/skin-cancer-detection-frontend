"use client";

import Heading from "../Heading/Heading";
import Link from "../Link/Link";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <section className={styles.footerSection}>
                    <Logo />
                </section>
                <section className={styles.footerSection}>
                    <Heading
                        as="h2"
                        variant="sm"
                        headingText="Skin Cancer Detection"
                    />
                    <nav>
                        <ul className={styles.linkList}>
                            <li>
                                <Link
                                    href="/about-skin-cancer-detection"
                                    linkText="Über Skin Cancer Detection"
                                    mode="sleek"
                                    aria-label="Gehen Sie zu Informationen über Skin Cancer Detection"
                                />
                            </li>
                            <li>
                                <Link
                                    href="/kontakt"
                                    linkText="Kontakt"
                                    mode="sleek"
                                    aria-label="Gehen Sie zum Kontaktformular"
                                />
                            </li>
                        </ul>
                    </nav>
                </section>

                <section className={styles.footerSection}>
                    <Heading
                        as="h2"
                        variant="sm"
                        headingText="Informationen zur Webanwendung"
                    />
                    <nav>
                        <ul className={styles.linkList}>
                            <li>
                                <Link
                                    href="/impressum"
                                    linkText="Impressum"
                                    mode="sleek"
                                    aria-label="Gehen Sie zum Impressum"
                                />
                            </li>
                            <li>
                                <Link
                                    href="/datenschutz"
                                    linkText="Datenschutzerklärung"
                                    mode="sleek"
                                    aria-label="Gehen Sie zur Datenschutzerklärung"
                                />
                            </li>
                            <li>
                                <Link
                                    href="/barrierefreiheit"
                                    linkText="Barrierefreiheitserklärrung"
                                    mode="sleek"
                                    aria-label="Gehen Sie zur Barrierefreiheitserklärung"
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
