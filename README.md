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

Clone the repo in your local directory and run tape to perform the tests:

`npm test`

There should be 6 working tests, failing tests are excluded from test.js.

During project work we attempted to use sinon module to produce a spy test double. The code below is out try but it was not a success. Let us know if you can fix our spy.

```
var test = require('tape');
var sinon = require('sinon');
var jsdom = require('jsdom')
var logicFunctions = require('../logic.js');
var xhr;
var requests;     

test('setup', function (t) {
    // setup goes here, call t.end() when finished
    xhr = sinon.useFakeXMLHttpRequest()
    requests = [];
    xhr.onCreate = function (xhr) {
        requests.push(xhr);
    };
    console.log("setup");
    t.end();
});
test('Testing makeCall works', function(t){
    let expected = requests + 1;
    logicFunctions.makeCall("www.google.com", function(a){return a});
    let actual = requests;
    t.equal(actual, expected, 'requests are equal');
    t.end();
});

// your other tests go here...

test('teardown', function (t) {
    // teardown goes here, call t.end() when finished
    xhr.restore();
});
```

## Handling API keys

The Open Movie Database (OMDB) key is free to obtain and has no 'billable' setting. Despite the fact that the key is relatively safe in terms of being shared, it is only stated in our config.js file which is included in .gitignore and thus is not uploaded on the remote.

**The APP does not perform from the remote repository, it has to be cloned and run on local if you wish to see it working.**

[link to the OMDB API](http://www.omdbapi.com/)

Today in History API is also free to use. It does not require an API key. However, in order to be able to see the API calls to this provider, you would **need to install Google Chrome extension: Allow-Control-Allow-Origin**

[link to today in history API](http://history.muffinlabs.com/#api)

