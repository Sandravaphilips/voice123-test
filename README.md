# voice123-test

An app that helps you find professional voice actors for any use case.

## Application Setup Guide

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

## Worklog

Planning and preparation took about 1 - 2 hours, building the app took the entire working hours of Friday. Documentation, testing, and clean-up was done in the last 5 hours before submission.

| Task          | Hours Spent | Notes |
| ------------- | ----------- | ----- |
| Planning      | 1 - 2       | After reading through the test requirements, I created a react app out of instinct. Then I chose to use my more recent library, Vue. So, I used Vue and one of its UI frameworks, Vuetify via their CDN since it was a simple app. Soon after, I thought that probably wouldn't depict real industry apps that I'll be working on if selected. Finally, I initialized a Vue app. Once that was done, I planned out which tasks to do and in what order. Also tested out the API    |
| Building out and styling the template with some dummy or no content    | 1      |     |
| Implementing logic to populate the template with dynamic | About 5      |    Most time was spent writing the logic to find the first instance of each search response and highlight it |
| Pagination    | 1 - 2      |     |
| Documentation    | 1 - 2      |     |
| Testing    | 1 - 2      |     |
| Review & Clean-up    | 1 - 2      |     |

## Future improvements and recommendations

* A better design for the app. For example, a spinner when fetching results
* A page to show when there's no internet.  
* Better error handling, e.g., showing a notification with a meaningful message to the user.
* Optimizing logic
* More test coverage
