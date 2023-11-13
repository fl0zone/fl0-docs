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
  url: process.env.BASE_URL ?? 'https://docs.fl0.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fl0zone', // Usually your GitHub org/user name.
  projectName: 'fl0-docs', // Usually your repo name.

  customFields: {
    repoId: 'R_kgDOJ8r-yA',
    discussionsCategoryName: 'Comments',
    discussionsCategoryId: 'DIC_kwDOJ8r-yM4CYTZq'
  },

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
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/fl0zone/fl0-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
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
          width: 69,
          height: 24,
          className: 'custom-navbar-logo-class',
        },
        items: [
          { to: '/docs/getting-started/crash-course', label: 'Getting Started', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: 'https://www.fl0.com/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://app.fl0.com',
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
                to: '/docs/getting-started/crash-course',
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
                label: 'Support - Discord',
                href: 'https://discord.gg/QPXqWK3bVw',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://www.fl0.com/blog',
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
      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID ?? 'C3FKPUUQAK',

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY ?? '15b04a1ada9cffdb8efdb8cc82a3e666',

        indexName: process.env.ALGOLIA_INDEX_NAME ?? 'prod_fl0_docs',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      "@twilio-labs/docusaurus-plugin-segment",
      {
        writeKey: process.env.SEGMENT_WRITE_KEY ?? 'EnAgJb0aBhCq0JDkWRyEn1J3WSXNFfZP',
        allowedInDev: false,
      },
    ],
  ],
};

module.exports = config;
