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


Today in History API is also free to use:

[a link](http://history.muffinlabs.com/#api)

