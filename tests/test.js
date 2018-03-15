var test = require('tape');
// var sinon = require('sinon');
// var jsdom = require('jsdom');
var logicFunctions = require('../logic.js');
// var xhr;
// var requests;     
var testingJSON = {
    Actors: "Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah",
    Awards: "Nominated for 1 Golden Globe. Another 27 wins & 99 nominations.",
    BoxOffice: "N/A",
    Country: "USA",
    DVD: "13 Apr 2004",
    Director: "Quentin Tarantino",
    Genre: "Action, Crime, Thriller",
    Language: "English, Japanese, French",
    Metascore: "69",
    Plot: "The Bride wakens from a four-year coma. The child she carried in her womb is gone. Now she must wreak vengeance on the team of assassins who betrayed her - a team she was once part of.",
    Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTczMGFiOWItMjA3Mi00YTU5LWIwMDgtYTEzNjRkNDkwMTE2XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg",
    Production: "Miramax Films",
    Rated: "R",
    Released: "10 Oct 2003",
    Response: "True",
    Runtime: "111 min",
    Title: "Kill Bill: Vol. 1",
    Type: "movie",
    Website: "http://www.kill-bill.com/",
    Writer: "Quentin Tarantino, Quentin Tarantino (character The Bride), Uma Thurman (character The Bride)",
    Year: "2003",
    imdbID: "tt0266697",
    imdbRating: "8.1",
    imdbVotes: "828,559"
}

test('Testing tape is working', function(t) {
  let expected = 1;
  let actual = 1;
  t.equal(actual, expected, 'Tape is working');
  t.end();
});

test('Testing that only 6 keys are left in cleaned up json', function(t) {
    let expected = 7;
    let actual = Object.keys(logicFunctions.cleanJSON(testingJSON)).length;
    t.equal(actual, expected, 'Returned object has 6 key-value pairs');
    t.end();
  });

  test('Testing that actors property is an array', function(t) {
    let expected = true;
    let actual = Array.isArray(logicFunctions.cleanJSON(testingJSON).actors);
    t.equal(actual, expected, 'Actors property is array');
    t.end();
  });

  test('Testing number of pages if there were no results', function(t) {
    let expected = 0;
    let actual = logicFunctions.pageNumerator(0);
    t.equal(actual, expected, 'No pages if no results');
    t.end();
  });

  test('Testing number of pages if there were 200 results', function(t) {
    let expected = 100;
    let actual = logicFunctions.pageNumerator(200);
    t.equal(actual, expected, 'No pages if no results');
    t.end();
  });

  test('Testing number of pages if there were 99 results', function(t) {
    let expected = 99;
    let actual = logicFunctions.pageNumerator(99);
    t.equal(actual, expected, 'No pages if no results');
    t.end();
  });