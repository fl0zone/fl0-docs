import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

import FlareTop from '@site/static/img/flare-top.png';
import FlareLeft from '@site/static/img/flare-left.png';
import FlareRight from '@site/static/img/flare-right.png';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Get in the FL0 state.</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Deploy backend applications and databases in minutes.">
      <div className={styles.flares}>
        <img src={FlareTop} loading="lazy" sizes="(max-width: 1920px) 100vw, 1920px" height={834} width={1920}
          alt="" className={styles.flaresTop} />
        <img src={FlareRight} loading="lazy" sizes="(max-width: 1622px) 100vw, 1622px" height={1109} width={1622}
          alt="" className={[styles.flaresRight, styles.hideMobile]} />
        <img src={FlareLeft} loading="lazy" sizes="(max-width: 1518px) 100vw, 1518px" height={1112} width={1518}
          alt=""
          className={styles.hideMobile} />
      </div>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
