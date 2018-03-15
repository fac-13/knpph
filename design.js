var designFunctions = {
  pageCreator: function(jsonIN) {
    const markup = `
            
            <div class="poster-holder">
                <img src="${jsonIN.poster}" alt="${jsonIN.title} Poster" class="poster-img">
            </div>
            <div class="summary-holder">
                <h2>Overview</h2>
                <p>${jsonIN.plot}</p>
                <h3>Actors</h3>
                <ul class="actor-list">
                ${jsonIN.actors.map(actor => `<li>${actor}</li>`).join(' ')}
                </ul>
            </div>
            `;
    return markup;
  }
};

       
