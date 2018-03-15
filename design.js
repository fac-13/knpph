var designFunctions = {
  pageCreator: function(jsonIN) {
    const markup = `
            
            <div class="poster-holder">
                <img src="${jsonIN.poster}" alt="${jsonIN.title} Poster" class="poster-img">
            </div>
            <div class="summary-holder">
                <h2>${jsonIN.title}</h2>
                <h2>Overview</h2>
                <p>${jsonIN.plot}</p>
                <h3>Release Date:<span> ${jsonIN.date}</span></h3>
                <h3>Director</h3>
                <p>${jsonIN.director}</p>
                <h3>Actors</h3>
                <ul class="actor-list">
                ${jsonIN.actors.map(actor => `<li>${actor}</li>`).join(' ')}
                </ul>
                <h3>On release day in history:</h3>
                <p>*Something happened*</p>
            </div>
            `;
    return markup;
  }
};

       
