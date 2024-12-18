# Welcome to my personal website!

As of mid-December 2024, this is still very much a work in progress...

It is written in Vue 3, Typescript, Mongodb, and is hosted serverless on Netlify with nodejs.

State management is through Pinia.

Unit tests will be added with vitest in the near future (as of this writing).


If you have any questions, please let me know!

The url for the site is: 
``` james3k.com ```

To reiterate, this is very much a work in progress.  Unfortunately when I started most of the work on this a little over a week ago, I had not set up a plan on what I wanted to fully implement, so there is some refactoring needed to make things a little more organized. 
A few things I want to do next are (in no particular order):

- [ ] tests!
- [ ] format blog posts (might need a package).
- [ ] refactor the login code to organize it better.
- [ ] allow for the user to be able to refresh the page and still stay logged in.
- [ ] remove all the "dead" packages I thought I needed at the time.
- [ ] create a "portfolio" section.
- [ ] scroll blog posts.
- [ ] route to homepage on bad link (will likely need to mess with Netlify settings again).

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