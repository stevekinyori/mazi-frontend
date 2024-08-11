# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Local development env

Please make sure you have aws cli setup locally before proceeding.

To generate local env variables, please run the script `APP_ENVIRONMENT=development bash generate-app-secrets.sh`

## Before starting

* Generate a .env file as instructed above
* Run `npm install` to install all required dependencies

## Before committing

Before committing and pushing your code, run the following scripts:

* `npm run lint:fix` and fix any linting issues
* `npm run test` and fix any failing tests
* `npm run build` and confirm build is successful
* `npm run preview` and confirm build preview runs well

## Style guide

Included a new set of classes configuration for tailwind for spacing, size is prefixed with `s` for **MaziMob** ;).
This applies to all areas of spacing, i.e, padding, margin, gap, among others but in our case,
sizes i.e. height, width and positioning i.e. top, left, bottom, right are not bound by the new classes even though they are usable.

For spacing, please use the MaziMob spacing classes as below to adhere to style guides,
the classes start from `s-0.5 - s-16` with intervals of *0.5*, e.g. 0.5, 1, 1.5, 2,...

* For padding, classes are `p-s-1`, `py-s-3.5` and so on
* For margin, classes are `ml-s-1`, `m-s-3.5` and so on
* For grid gap, classes are `gap-s-1`, `gap-y-s-3.5` and so on

As indicated above, the difference is the number suffix for space size, i.e. instead of `p-4` there is `p-s-2`.

Our suffixes though have different sizes spec, i.e.

* Whole numbers (1,2,5,9) are in multiples of 8 and is what is recommended to use
* Halves (2.5,3.5,6.5) are multiples of 4 and are to be used where multiples of 8 would be too big/small
