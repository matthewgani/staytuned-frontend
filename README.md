# StayTuned

## Description
StayTuned is a Social and Music Information Web App. Users are required to connect to their Spotify accounts in order to access the main functionality of the app. After authorizing StayTuned to access their Spotify information, StayTuned utilizes the Spotify API to get the user's currently playing song. Comments made by other users and other data about the current song are pulled from other APIs like Last.fm to give the user more information about what they are listening to. These data can include Artist information, song awards, song ratings and more. 

  
StayTuned is currently being developed, you can visit [StayTuned-backend](https://github.com/matthewgani/staytuned-backend) to see how the backend is implemented. 

StayTuned is built with the MERN stack and uses Chakra UI for styling. E2E testing will be done with Cypress and Jest is used for testing the backend.


## Pictures of current features

![Sign up page](public/assets/SignUpPage.png)
![Log in page](public/assets/LogInPage.png)
![Home page](public/assets/HomePage.png)
![Spotify auth page](public/assets/SpotifyAuthPage.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


