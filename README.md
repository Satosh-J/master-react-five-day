# React Tutorial Book

Welcome to the official repository for the Mastering React in 5 Days for Experienced Developers ! This repository contains the source code and additional resources for each chapter of the book.

## How to Use This Repository

- Each chapter's code is organized in a separate branch. You can find the code for a specific chapter by switching to the corresponding branch.
 * day-1 -> Content for Day 1
 * day-2-am -> Content for Day 2, Morning session
 * day-2-pm-bootstrap -> Content for Day 2, Afternoon session: styling with bootstrap
 * day-2-pm-css-in-js -> Content for Day 2, Afternoon session: styling with emotion
 * day-2-pm-css-module -> Content for Day 2, Afternoon session: styling with css module
 * day-2-pm-inline-style -> Content for Day 2, Afternoon session: styling with inline
 * day-3-routing -> Content for Day 3: React Router Dom
 * day-4-redux -> Content for Day 4: React-Redux
 * day-5-am-rest-api -> Content for Day 5, Morning session: Rest API handling
 * day-5-pm-redux-saga -> Content for Day 5, Afternoon session: Redux-Saga integration with API
 * master -> Completed codebase

## Example

To clone the repository and access code for Day 1:

```bash
git clone https://github.com/Satosh-J/master-react-five-day.git
cd master-react-five-day
git checkout day-1
```

## Prerequisites

Before running the code, ensure you have Node.js and npm installed on your machine.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
