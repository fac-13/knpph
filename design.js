var designFunctions = {
  pageCreator: function(jsonIN) {
    const markup = `
            
            <div class="poster-holder">
                <img src="${jsonIN.poster}" alt="${jsonIN.title} Poster" class="poster-img">
            </div>
            <div class="summary-holder">
                <h2>Overview</h2>
                <p>${jsonIN.plot}</p>
            </div>
            `;
    return markup;
  }
};
