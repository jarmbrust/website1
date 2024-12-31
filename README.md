# Welcome to my personal website!

This is still very much a work in progress...

It is written in Vue 3, Typescript, Mongodb, and is hosted serverless on Netlify with nodejs.

State management is through Pinia.

Unit and component tests will be added with vitest as well.


If you have any questions, please let me know!

The url for the site is: 
``` james3k.com ```

To reiterate, this is very much a work in progress.  There are a couple of bugs and a few things I want
to fix-up and implement.
Some of them are (in no particular order):

- [ ] tests!
- [ ] format blog post input (might need a package).
- [x] allow for the user to be able to refresh the page and still stay logged in.
- [ ] remove the "dead" packages I thought I needed at the time.
- [ ] create a "portfolio" section.
- [x] scroll blog posts.
- [ ] route to homepage on bad link.

...and more as I think of it.

--- 

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