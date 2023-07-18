import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Quickstart Guides',
    link: '/docs/category/quickstarts',
    Svg: require('@site/static/img/undraw_setup_wizard.svg').default,
    description: (
      <>
        Get up and running in no time with language-specific guides for
        the most popular frameworks.
      </>
    ),
  },
  {
    title: 'Platform Documentation',
    link: '/docs/category/platform',
    Svg: require('@site/static/img/undraw_software_engineer.svg').default,
    description: (
      <>
        Questions about databases? Wondering how to invite team members?
        This section explains each part of the platform.
      </>
    ),
  },
  {
    title: 'Troubleshooting',
    link: '/docs/troubleshooting',
    Svg: require('@site/static/img/undraw_code_inspection.svg').default,
    description: (
      <>
        Search through the most common problems and get help
        troubleshooting your deployments and applications.
      </>
    ),
  },
];

function Feature({ Svg, title, link, description }) {
  return (
    <div className={clsx('col col--4 margin-vert--md')}>
      <div className={clsx('card', 'padding-horiz--md', styles.featureCard)}>
        <div className="card__image">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div class="card__body">
          <div className="">
            <h3><a href={link}>{title}</a></h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
