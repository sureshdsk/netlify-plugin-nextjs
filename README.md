![Next.js on Netlify Build Plugin](nextonnetlify.png)

# Next.js Build Plugin

<p align="center">
  <a aria-label="npm version" href="https://www.npmjs.com/package/netlify-plugin-nextjs">
    <img alt="" src="https://img.shields.io/npm/v/netlify-plugin-nextjs">
  </a>
  <a aria-label="MIT License" href="https://img.shields.io/npm/l/netlify-plugin-nextjs">
    <img alt="" src="https://img.shields.io/npm/l/netlify-plugin-nextjs">
  </a>
</p>

This build plugin is a utility for enabling server-side rendering in Next.js on Netlify. It wraps your application in a tiny compatibility layer, so that pages can use Netlify Functions to be server-side rendered.

**TL;DR: You can enable SSR in your Next.js applications with 3 simple steps, listed [here](#setup)!**

## Table of Contents

- [Installation and Configuration](#installation-and-configuration)
- [Setup](#setup)
  - [1. Set Next.js target to serverless](#1-set-nextjs-target-to-serverless)
  - [2. Add postbuild hook](#2-add-postbuild-hook)
- [Optional Extras](#optional-extras)
  - [Preview Locally](#preview-locally)
  - [Custom Netlify Redirects](#custom-netlify-redirects)
  - [Custom Netlify Functions](#custom-netlify-functions)
- [Caveats](#caveats)
  - [Preview Mode](#preview-mode)
  - [Fallbacks for Pages with `getStaticPaths`](#fallbacks-for-pages-with-getstaticpaths)
- [Credits](#credits)
- [Showcase](#showcase)

## Installation and Configuration

1. `npm install netlify-plugin-nextjs`

2. Create a `netlify.toml` in the root of your poject:

```toml
[build]
  command   = "npm run build"
  functions = "out_functions"
  publish = "out_publish"

[[plugins]]
  package = "netlify-plugin-nextjs"
```

## Optional Extras

#### Preview Locally

I recommend you still use `next dev` to build and preview your application locally.

But if you want to emulate the Netlify deployment on your computer, you can also run `next-on-netlify` locally and then use `netlify-cli` to preview the result.

First, install the latest version of `netlify-cli` (you can also [look at package.json](https://github.com/netlify/next-on-netlify/blob/master/package.json) to see the version that next-on-netlify has been tested against):

```bash
npm install -g netlify-cli
```

Then, add the following `[dev]` block to your `netlify.toml`:

```toml
# netlify.toml

# [build]
#   ...

[dev]
  functions = "out_functions"
  publish   = "out_publish"
  # We manually set the framework to static, otherwise Netlify automatically
  # detects Next.js and redirects do not work.
  # Read more: https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#project-detection
  framework = "#static"
```

Lastly, add the following lines to your `.gitignore`:

```shell
# .gitignore

# Files generated by next-on-netlify command
/out_publish/
/out_functions/
```

Now you're all set.

From now on, whenever you want to preview your application locally, just run:

1. `npm run build`: This will run `next build` to build your Next.js app and `next-on-netlify` to prepare your Next.js app for compatibility with Netlify
1. `netlify dev`: This will emulate Netlify on your computer and let you preview your app on `http://localhost:8888`.

#### Custom Netlify Redirects

You can define custom redirects in a `_redirects` and/or in your `netlify.toml` file.
The precedence of these rules are:

- `_redirects`
- `next-on-netlify` redirects
- `netlify.toml`

[Read more about Netlify redirects here](https://docs.netlify.com/routing/redirects/).

#### Custom Netlify Functions

`next-on-netlify` creates one Netlify Function for each of your
SSR pages and API endpoints. It is currently not possible to create custom Netlify Functions. Let me know if you have a need for this feature and we can add it.

## Caveats

### Fallbacks for Pages with `getStaticPaths`

[Fallback pages](https://nextjs.org/docs/basic-features/data-fetching#fallback-true) behave differently with `next-on-netlify` than they do with Next.js. On Next.js, when navigating to a path that is not defined in `getStaticPaths`, it first displays the fallback page. Next.js then generates the HTML in the background and caches it for future requests.

With `next-on-netlify`, when navigating to a path that is not defined in `getStaticPaths`, it server-side renders the page and sends it directly to the user. The user never sees the fallback page. The page is not cached for future requests.

For more on this, see: [Issue #7](https://github.com/netlify/next-on-netlify/issues/7#issuecomment-636883539)

## Credits

This package is maintained by [Lindsay Levine](https://github.com/lindsaylevine), [Finn Woelm](https://github.com/FinnWoelm), and [Cassidy Williams](https://github.com/cassidoo).

📣 Shoutout to [@mottox2](https://github.com/mottox2) (a pioneer of hosting Next.js on Netlify) and [@danielcondemarin](https://github.com/danielcondemarin) (author of serverless-next.js for AWS). The two were big inspirations for this package.

🙌 Big "thank you" to the following people for their contributions, support, and beta testing:

- [@spencewood](https://github.com/spencewood)
- [@alxhghs](https://github.com/alxhghs)
- [@gamliela](https://github.com/gamliela)
- [@wei](https://github.com/wei)
- [@laugharn](https://github.com/laugharn)
- [@rajington](https://github.com/rajington)
- [@etrepum](https://github.com/etrepum)
- [@jonasbuntinx](https://github.com/jonasbuntinx)
- [@joostmeijles](https://github.com/joostmeijles)

## Showcase

The following sites are built with `next-on-netlify`:

![opinionatedreact.com](https://raw.githubusercontent.com/netlify/next-on-netlify/master/assets/showcase-opinionatedreact.png)  
[opinionatedreact.com](https://opinionatedreact.com/) ([via Twitter](https://twitter.com/NikkitaFTW/status/1302667952920162309))

![missionbit.org](https://raw.githubusercontent.com/netlify/next-on-netlify/master/assets/showcase-missionbit.png)  
[missionbit.org](https://www.missionbit.org/) ([#18](https://github.com/netlify/next-on-netlify/pull/18#issuecomment-643828966))

Are you building something awesome with `next-on-netlify`? 🔥 Let us know and we will feature it here :)
