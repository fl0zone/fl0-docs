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
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/fl0",
            },
            {
              label: "Support - Discord",
              href: "https://discord.gg/QPXqWK3bVw",
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
