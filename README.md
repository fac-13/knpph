# Movie Search Web Application
API week project

## Features

1) Our app queries two APIs using the XMLHttpRequest method:
a) Open Movie DB API and Today in History API

2) Users can view the dynamic content pulled from the OMDB using the search button at the bottom of the landing page and then view details of each movie by clicking on a movie poster. In the details page of each movie a fun fact is displayed, it is based on the movie release date.

3) We aimed for a responsive, mobile-first design with accessible features.

## File Structure, Architecture

- Index file - contains main app skeleton
- Logic file - contains functions that relate to the app functionality
- DOM file - contains functions that send, receive and manipulate data from our API calls and dynamically creates the content of our Single Page Application
- Design file - contains functions that display individual movie details to the main viewpoint
- Test file - contains data for testing the app functions and functionalities
- Style CSS - contains all design classes of the app

## Tests

Tests are performed on the logic.js file using the npm _tape_ module. To install and run the module:

`npm install tape`

Clone the repo in your local directory and run tape to perform the tests.

## Handling API keys

The Open Movie Database (OMDB) key is free to obtain and has no 'billable' setting. Despite the fact that the key is relatively safe in terms of being shared, it is only stated in our config.js file which is included in .gitignore and thus is not uploaded on the remote.

[link to today in OMDB API](http://www.omdbapi.com/)

Today in History API is also free to use. It does not require an API key. However, in order to be able to see the API calls to this provider, you would **need to install Google Chrome extension: Allow-Control-Allow-Origin**

[link to today in history API](http://history.muffinlabs.com/#api)

