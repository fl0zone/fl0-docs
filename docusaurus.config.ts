import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "FL0 Documentation",
  tagline: "Learn how to deploy your code in minutes.",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: process.env.BASE_URL ?? "https://docs.fl0.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "fl0zone", // Usually your GitHub org/user name.
  projectName: "fl0-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/fl0zone/fl0-docs/tree/main/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "FL0 Documentation",
      logo: {
        alt: "FL0 Logo",
        src: "img/logo.svg",
        className: "custom-navbar-logo-class",
      },
      items: [
        {
          to: "/docs/getting-started/crash-course",
          label: "Getting Started",
          position: "left",
        },
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "https://www.fl0.com/blog", label: "Blog", position: "left" },
        {
          href: "https://app.fl0.com",
          label: "Platform",
          position: "right",
        },
        {
          href: "https://github.com/fl0zone/fl0-docs",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://discord.gg/QPXqWK3bVw",
          label: "Support & Community",
          position: "right",
          className: "header-community-link",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/crash-course",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              html: '<a href="https://discord.gg/QPXqWK3bVw" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link"><svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>Support &amp; Community</a>',
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/fl0",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/FL0Dev",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "https://www.fl0.com/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/fl0zone/fl0-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FL0 Pty Ltd`,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: process.env.ALGOLIA_APP_ID ?? "C3FKPUUQAK",

      // Public API key: it is safe to commit it
      apiKey: process.env.ALGOLIA_API_KEY ?? "15b04a1ada9cffdb8efdb8cc82a3e666",

      indexName: process.env.ALGOLIA_INDEX_NAME ?? "prod_fl0_docs",

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
      searchPagePath: "search",

      //... other Algolia params
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      "@twilio-labs/docusaurus-plugin-segment",
      {
        writeKey:
          process.env.SEGMENT_WRITE_KEY ?? "EnAgJb0aBhCq0JDkWRyEn1J3WSXNFfZP",
        allowedInDev: false,
      },
    ],
  ],
};

export default config;
