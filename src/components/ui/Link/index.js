import React from 'react';
import DocusaurusLink from "@docusaurus/Link";
import clsx from "clsx";

import styles from './styles.module.css';

export default function Link({ children, to }) {
    return (
        <DocusaurusLink to={to} className={clsx(styles.link)}>
            <div className={clsx(styles.linkInner)}>
                {children}
            </div>
        </DocusaurusLink >
    );
}