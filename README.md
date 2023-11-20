[![CC-BY-NC-SA 4.0](https://img.shields.io/badge/license-CC--BY--NC--SA--4.0-teal)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

# FL0 Documentation

### What is FL0?
FL0 is the easiest way to deploy backend applications in minutes. FL0 is built for developers looking for a fast, reliable way to deploy and scale backend applications. Simply connect your repo, or choose from a library of production-ready templates that can be launched in seconds. FL0 builds and deploys your code in containers, meaning you can easily scale from one customer, to millions.

The `fl0zone/fl0-docs` repo includes tutorials, reference information, and how-to guides for the FL0 platform.

### Installation

The FL0 documentation website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### License

This documentation is licensed as per Creative Commons [Attribution-NonCommercial-ShareAlike 4.0 International (CC-BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en).

You are free to:

 * **Share** — copy and redistribute the material in any medium or format

 * **Adapt** — remix, transform, and build upon the material

Under the following terms:

 * **Attribution** - You must give appropriate credit , provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

 * **NonCommercial** - You may not use the material for commercial purposes.

 * **ShareAlike** - If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

 * **No additional restrictions** - You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

