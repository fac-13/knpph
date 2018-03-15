(function(document){
    let mykey = config.KEY_OMDB;
    let mainHolder = document.getElementById('main-holder');
    let searchBoxHolder = document.getElementById('search-box');

 function addListener(selector, eventName, callback) {
     document.getElementById(selector).addEventListener(eventName, callback);
}

function fetchOneMovieData(id){

 //   http://www.omdbapi.com/?i=tt3896198&apikey=92ebbf53

    let url = "https://www.omdbapi.com/?i=" + id + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response){
        console.log(response);
        displayDetailedResults(response);
    });
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

function fetchReleaseDate(id, cb){    
    setTimeout(function(){
        let url = "http://www.omdbapi.com/?i="+id+"&apikey=" + mykey;
        return cb(null, logicFunctions.makeCall(url, function(response){
            response.Released;
        }))
    },100);     
};

function formatDate(oldDate, cb){
    setTimeout(() => {
       var movieArr = oldDate.toString().split(' ');
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var monthNum = monthList.indexOf(movieArr[1]) + 1;
        cb(null, "https://history.muffinlabs.com/date/" + movieArr[0] + "/" + monthNum) 
    }, 200);    
}

function sample(url, cb){ 
    setTimeout(() => {
        return cb(null , logicFunctions.makeCall(url, function(response){
    return response.data.Events[0];
    }))
        
    }, 300);    
}
    
function waterfall(args, tasks, cb) {
    if(tasks.length === 0){
      return cb(null, args)
    }
    tasks[0](args, function(err, arg){
        if (err){
          return cb(err)
        }
        return waterfall(arg, tasks.slice(1), cb) 
    });
}
addListener('historyButton', 'click', function(){
    var imdbID = historyButton.value;

    waterfall(imdbID, [fetchReleaseDate, formatDate, sample], function(error, result){
        console.log(result);
    });    
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
        posterHolder.addEventListener("click", function(e){
            fetchOneMovieData(movie.imdbID);
        })
        movieHolder.appendChild(posterHolder);
        movieHolder.appendChild(titleHolder);
        mainHolder.appendChild(movieHolder);
    });
}

function displayDetailedResults(response){
    while (mainHolder.firstChild) {
        mainHolder.removeChild(mainHolder.firstChild);
    }
    let cleanJSON = logicFunctions.cleanJSON(response);
    console.log(logicFunctions.cleanJSON(response));
    let contentHolder = document.createElement('div');
    contentHolder.innerHTML = designFunctions.pageCreator(cleanJSON);
    // contentHolder.setAttribute("class", "content-holder");
    
    // let imageHolder = document.createElement('div');
    // let imageContent = document.createElement('img');
    // let titleHolder = document.createElement('h2');
    // titleHolder.textContent = response.Title;
    // let posterURL = response.Poster;
    // imageContent.src = posterURL;
    // contentHolder.appendChild(titleHolder);
    // contentHolder.appendChild(imageContent);
    
    mainHolder.appendChild(contentHolder);
}

})(document);