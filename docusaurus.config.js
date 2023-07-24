// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FL0 Documentation',
  tagline: 'Learn how to deploy your code in minutes.',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://documentation-dev.fl0.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fl0zone', // Usually your GitHub org/user name.
  projectName: 'fl0-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',


  markdown: {
    mermaid: true
  },

  themes: [
    '@docusaurus/theme-mermaid'
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-2W7HDY1VER',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/fl0zone/fl0-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      '@docusaurus/preset-classic',
      {
        googleTagManager: {
          containerId: 'GTM-NV967NDZ',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: 'FL0 Documentation',
          src: 'img/logo.svg',
          className: 'custom-navbar-logo-class',
        },
        items: [
          { to: '/docs/getting-started', label: 'Getting Started', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: 'https://blog.fl0.com', label: 'Blog', position: 'left' },
          {
            href: 'https://app.fl0.dev',
            label: 'Platform',
            position: 'right',
          },
          {
            href: 'https://github.com/fl0zone/fl0-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/fl0',
              },
              {
                label: 'Support',
                href: 'https://help.fl0.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://blog.fl0.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/fl0zone/fl0-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FL0 Pty Ltd`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
