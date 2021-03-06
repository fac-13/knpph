(function(document) {
  let mykey = config.KEY_OMDB;
  let mainHolder = document.getElementById("main-holder");
  let searchBoxHolder = document.getElementById("search-box");
  let buttonsHolder = document.getElementById("buttons-holder");
  const header = document.getElementById("header");

  function addListener(selector, eventName, callback) {
    document.getElementById(selector).addEventListener(eventName, callback);
  }

  function fetchOneMovieData(id) {
    let url = "https://www.omdbapi.com/?i=" + id + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response) {
      displayDetailedResults(response);
      getReleaseDate(response.Released);
    });
  }

  function fetchFirstPageMoviesData(keyword) {
    let url =
      "https://www.omdbapi.com/?s=" +
      keyword +
      "&apikey=" +
      mykey;
    logicFunctions.makeCall(url, function(response) {
      if (!response.Search) {
        mainHolder.innerText = "No result for your search";
      } else {
        header.style.display = "none";
        displayFirstPage(response.Search, response.totalResults, keyword);
      }
    });
  }

  function fetchAllMoviesData(keyword, page) {
    let url =
      "https://www.omdbapi.com/?s=" +
      keyword +
      "&page=" +
      page +
      "&apikey=" +
      mykey;
    logicFunctions.makeCall(url, function(response) {
      if (!response.Search) {
        header.innerText = "No result for your search";
      } else {
        header.style.display = "none";
        displayResults(response.Search);
      }
    });
  }

  addListener("submit-button", "click", function(event) {
    if (mainHolder.classList.contains("main-holder-class2")) {
      mainHolder.classList.remove("main-holder-class2");
      mainHolder.classList.add("main-holder-class");
    }
    event.preventDefault();
    let keyword = searchBoxHolder.value;
    fetchFirstPageMoviesData(keyword);
  });

  function getReleaseDate(date) {
    var dateArr = date.split(" ");
    var monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var monthNum = monthList.indexOf(dateArr[1]) + 1;
    dateUrl =
      "https://history.muffinlabs.com/date/" + monthNum + "/" + dateArr[0];
    fetchFunFact(dateUrl);
  }

  function getPages(results, keyword) {
    let numberOfPages = logicFunctions.pageNumerator(results);
      for (let i = 1; i <= numberOfPages; i++) {
        fetchAllMoviesData(keyword, i);
      }
  }

  function fetchFunFact(url) {
    logicFunctions.makeCall(url, function(response) {
      let eventText = document.getElementById("event-text");
      var eventArr = response.data.Events;

      eventText.textContent = eventArr[0].year + " : " + eventArr[0].text;
    });
  }

  function clearScreen(){
    while (mainHolder.firstChild) {
      mainHolder.removeChild(mainHolder.firstChild);
    }
  }

  function displayFirstPage(moviesArray, results, keyword){
    clearScreen();
    displayResults(moviesArray);
    getPages(results, keyword);
  }

  function displayResults(moviesArray) {
    moviesArray.forEach(function(movie) {
      let movieHolder = document.createElement("div");
      let posterHolder = document.createElement("img");
      let titleHolder = document.createElement("p");
      if (movie.Poster !== "N/A") {
        let posterURL = movie.Poster;
        posterHolder.src = posterURL;
        posterHolder.alt = movie.Title;
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

  function displayDetailedResults(response) {
    mainHolder.classList.remove("main-holder-class");
    while (mainHolder.firstChild) {
      mainHolder.removeChild(mainHolder.firstChild);
    }
    let cleanJSON = logicFunctions.cleanJSON(response);
    console.log(logicFunctions.cleanJSON(response));
    let contentHolder = document.createElement("div");
    contentHolder.innerHTML = designFunctions.pageCreator(cleanJSON);
    contentHolder.setAttribute("class", "content-holder");
    mainHolder.classList.add("main-holder-class2");
    mainHolder.appendChild(contentHolder);
  }
})(document);
