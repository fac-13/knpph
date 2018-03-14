(function(document){
    let mykey = config.KEY_OMDB;
    let mainHolder = document.getElementById('main-holder');
    let searchBoxHolder = document.getElementById('search-box');

 function addListener(selector, eventName, callback) {
     document.getElementById(selector).addEventListener(eventName, callback);
}

function fetchAllMoviesData(keyword, page){
    let url = "https://www.omdbapi.com/?s=" + keyword + "&page=" + page + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response){
        displayResults(response.Search);
    });
}

addListener('submit-button', 'click', function(event){
    event.preventDefault();
    let keyword = searchBoxHolder.value;
    fetchAllMoviesData(keyword, 1);
});

function displayResults(moviesArray) {
    console.log(moviesArray);
    while (mainHolder.firstChild) {
        mainHolder.removeChild(mainHolder.firstChild);
    }
    moviesArray.forEach(function(movie) {
        let movieHolder = document.createElement('div');
        let posterHolder = document.createElement('img');
        let titleHolder = document.createElement('p');
        let posterURL = movie.Poster;
        posterHolder.src = posterURL;

        movieHolder.appendChild(posterHolder);
        movieHolder.appendChild(titleHolder);
        mainHolder.appendChild(movieHolder);
        
        
    });
}

})(document);