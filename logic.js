var logicFunctions = {
    makeCall: function (url, callback) {
  // make a http request
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function() {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                return callback(response);
            }else{
                try {
                    callback('Your search generated no results'); // generates an exception
                  }
                  catch (e) {
                    // statements to handle any exceptions
                    console.log(e); // pass exception object to error handler
                  }
            }
        });
    xhr.open("GET", url);
    xhr.send();
    },

    cleanJSON: function (dirtyJSON){
        let initialData = JSON.parse(JSON.stringify(dirtyJSON));
        console.log(initialData);
        let finalJSON = {
            "title": initialData.Title,
            "plot": initialData.Plot,
            "actors": initialData.Actors.split(','),
            "director": initialData.Director,
            "date": initialData.Released,
            "language": initialData.Language,
            "poster": initialData.Poster
        }
        return finalJSON;
    },

    pageNumerator: function(pages){
        let numberOfPages = 0;
        if(pages<=10 && pages>1){
            numberOfPages = 1;
        }else{
            numberOfPages = Math.ceil(pages);
        }
        return numberOfPages<100 ? numberOfPages : 100;
    }
}

if (typeof module !== 'undefined') {
    module.exports = logicFunctions;
  }