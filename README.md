# Welcome to my personal website!

As of mid-December 2024, this is still very much a work in progress...

It is written in Vue 3, Typescript, Mongodb, and is hosted serverless on Netlify with nodejs.

State management is through Pinia.

Unit tests will be added with vitest in the near future (as of this writing).


If you have any questions, please let me know!

The url for the site is: 
``` james3k.com ```

Below is the generic setup, but the site will not work fully without connection URI to the db and running on: 

```sh
netlify dev
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```