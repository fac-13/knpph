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
        getReleaseDate(response.Released);
    });
}


function fetchAllMoviesData(keyword, page){
    let url = "https://www.omdbapi.com/?s=" + keyword + "&page=" + page + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response){
        displayResults(response.Search);
        getPages(response.totalResults);
    });
}

addListener('submit-button', 'click', function(event){
    if (mainHolder.classList.contains("main-holder-class2")) {
        mainHolder.classList.remove("main-holder-class2");
        mainHolder.classList.add("main-holder-class");
    }
    event.preventDefault();
    let keyword = searchBoxHolder.value;
    fetchAllMoviesData(keyword, 1);
});

 function getReleaseDate(date){
     var dateArr = date.split(' ');
     var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
     var monthNum = monthList.indexOf(dateArr[1]) + 1;
     dateUrl = "https://history.muffinlabs.com/date/" + monthNum + "/" + dateArr[0];
     fetchFunFact(dateUrl);
 }

 function fetchFunFact(url){

       logicFunctions.makeCall(url, function(response){
           let eventText = document.getElementById("event-text");
           var eventArr = response.data.Events;


          eventText.textContent = eventArr[0].year +" : " + eventArr[0].text;
       });
   }


 function getPages(results){
    let numberOfPages = logicFunctions.pageNumerator(results);
 }
// addListener('historyButton', 'click', function(){
//     var url = "https://history.muffinlabs.com/date"
//     logicFunctions.makeCall(url, function(response){
//         console.log(response.data.Events[0].text);
//     });
// });

function displayResults(moviesArray) {
  console.log(moviesArray);
  while (mainHolder.firstChild) {
    mainHolder.removeChild(mainHolder.firstChild);
  }
  moviesArray.forEach(function(movie) {
    let movieHolder = document.createElement("div");
    let posterHolder = document.createElement("img");
    let titleHolder = document.createElement("p");
    if (movie.Poster !== "N/A") {
      let posterURL = movie.Poster;
      posterHolder.src = posterURL;
      posterHolder.addEventListener("click", function(e) {
        fetchOneMovieData(movie.imdbID);
      });
      movieHolder.appendChild(posterHolder);
      posterHolder.onerror = function() {
        movieHolder.removeChild(posterHolder);
      };
      movieHolder.appendChild(titleHolder);
      mainHolder.appendChild(movieHolder);
    }
  });
}

function displayDetailedResults(response){
    mainHolder.classList.remove("main-holder-class");
    while (mainHolder.firstChild) {
        mainHolder.removeChild(mainHolder.firstChild);
    }
    let cleanJSON = logicFunctions.cleanJSON(response);
    console.log(logicFunctions.cleanJSON(response));
    let contentHolder = document.createElement('div');
    contentHolder.innerHTML = designFunctions.pageCreator(cleanJSON);
    contentHolder.setAttribute("class", "content-holder");
    mainHolder.classList.add("main-holder-class2");
    
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