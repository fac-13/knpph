var logicFunctions = {
    makeCall: function (url, callback) {
  // make a http request
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function() {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                return callback(response);
            }
        });
    xhr.open("GET", url);
    xhr.send();
    }

}
