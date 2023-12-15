# Golf Shot



## Project goals


## Table of contents
- [Golf Shot](#tribehub)
  * [Project goals](#project-goals)
  * [Table of contents](#table-of-contents)
  * [User stories](#user-stories)
    + [Themes](#themes)
    + [Epics](#epics)
    + [User stories](#user-stories-1)
  * [Agile development methodology](#agile-development-methodology)
  * [Planning](#planning)
    + [Mockups](#mockups)
    + [Data models](#data-models)
  * [Design](#design)
    + [Colours](#colours)
    + [Fonts](#fonts)
  * [Features](#features)
  * [Frameworks, libraries and dependencies](#frameworks--libraries-and-dependencies)
    + [React-Router-DOM](#react-router-dom)
    + [ReactDOM](#reactdom)
    + [Axios](#axios)
    + [JWT Decode](#jwt-decode)
  * [React features used to enhance user experience](#react-features-used-to-enhance-user-experience)
    + [Custom hooks](#custom-hooks)
  * [Testing](#testing)
    + [Manual testing](#manual-testing)
    + [Validator testing](#validator-testing)
    + [W3C CSS validator](#w3c-css-validator)
    + [ESLint JavaScript validator](#eslint-javascript-validator)
    + [WAVE web accessability testing](#wave-web-accessability-testing)
    + [Lighthouse testing](#lighthouse-testing)
    + [Resolved bugs](#resolved-bugs)
    + [Unresolved bugs](#unresolved-bugs)
  * [Deployment](#deployment)
  * [Credits](#credits)
    + [Code](#code)
    + [Media](#media)

## User stories


### Themes


### Epics


### User stories


## Agile development methodology


## Planning

### Mockups


### Data models

## Design

### Colours


### Fonts


## Features
### Landing page with posts



### Registration form


### Sign-in form


### My Profile


### Re-use of components
A number of reusable React components were created with the intention of reducing code duplication.


### CRUD functionality


### Future improvements and features


#### Short term future improvements
Because I had so much time taken up from all the bugs these would've been added.


#### Longer term future features
## Frameworks, libraries and dependencies


### React-Router-DOM


### ReactDOM


### Axios


### JWT Decode
Used to decode Base64URL encoded JSON web tokens.

### React Bootstrap


## React features used to enhance user experience
### Custom hooks


## Testing

### Manual testing


### Validator testing


### W3C CSS validator
All CSS files were passed through the W3C validator. The following errors and warnings were flagged:


### ESLint JavaScript validator


### WAVE web accessability testing


### Lighthouse testing


### Resolved bugs


### Unresolved bugs


## Deployment
To deploy to Heroku, follow these steps:

- Fork or clone this repository in GitHub.
- If you have also cloned and deployed your own version of the Django Rest Framework API, you will need to ensure the value of `axios.defaults.baseURL` in `src/api/axiosDefaults.js` is set to the base URL for your API. Pull to your local development environment and push back to GitHub if necessary; otherwise, leave as is to use the original Golf Shot API.
- Log in to Heroku.
- Select 'Create new app' from the 'New' menu at the top right.
- Enter a name for the app and select the appropriate region.
- Select 'Create app'.
- Select the 'Deploy' tab at the top.
- Select 'GitHub' from the deployment method options to confirm you wish to deploy using GitHub. You may be asked to enter your GitHub password.
- Find the 'Connect to GitHub' section and use the search box to locate your repo.
- Select 'Connect' when found.
- Optionally choose the main branch under 'Automatic Deploys' and select 'Enable Automatic Deploys' if you wish your deployed site to be automatically redeployed every time you push changes to GitHub.
- Find the 'Manual Deploy' section, choose 'main' as the branch to deploy and select 'Deploy Branch'.

When deployment is complete, you will be given a link to the deployed site.

## Credits

### Code
- Most of the code was used from what I learned from the Moments walkthrough


### Media
- No results Icon [Icons8](https://icons8.com/icon/12773/search)


- [Google Fonts Poppins](https://fonts.google.com/?query=lato&sort=popularity)


