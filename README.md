# About

This is a WebUSB Programmer tool for Body Synths instruments partly based on the source code from [Electrosmith's Programmer](https://github.com/electro-smith/Programmer).

The tool is hosted at [firmware.bodysynths.com](https://firmware.bodysynths.com).

# Development and deploy

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development (run locally)

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy to firmware.bodysynths.com

This project uses GitHub Actions to build and deploy to GitHub Pages.

In order to build the project and trigger a remote deployment workflow, run:

```bash
yarn deploy
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
