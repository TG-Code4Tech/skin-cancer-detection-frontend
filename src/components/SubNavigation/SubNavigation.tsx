import Link from "../Link/Link";
import styles from "./SubNavigation.module.css";

interface LinkItem {
    href: string;
    linkText: string;
    ariaLabel: string;
    active?: boolean;
}

interface SubNavigationProps {
    links: LinkItem[];
}

const SubNavigation = ({ links }: SubNavigationProps) => {
    return (
        <nav>
            <ul className={styles.linksList}>
                {links.map((link, index) => (
                    <li key={index} className={link.active ? styles.activeListItem : styles.listItem}>
                        <Link href={link.href} linkText={link.linkText} mode="sleek" aria-label={link.ariaLabel} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNavigation;
