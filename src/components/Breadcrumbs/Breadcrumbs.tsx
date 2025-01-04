import React from "react";
import Link from "../Link/Link";
import styles from "./Breadcrumbs.module.css";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    return (
        <nav aria-label="Brotkrumennavigation">
            <ol className={styles.list}>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLastItem = index === breadcrumbs.length - 1;

                    return (
                        <li key={index} className={styles.listItem}>
                            {isLastItem ? (
                                <span aria-current="page" className={styles.currentItem}>
                                    {breadcrumb.label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={breadcrumb.href}
                                        linkText={breadcrumb.label}
                                        mode="subtle"
                                        aria-label={`Gehe zu ${breadcrumb.label}`}
                                    />
                                    <span className={styles.separator} aria-hidden="true">
                                        /
                                    </span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
