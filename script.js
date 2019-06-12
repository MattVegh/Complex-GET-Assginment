const apiKey = "wyufrBUw7oRNbz6MxaCYqqsStL1HSj2aCFLXz3bq";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function searchSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#parkSearch').val();
    let limit = $('#requestedNum').val();
    console.log(`the searcTerm is ${searchTerm}`);
    console.log(`limit is ${limit}`);
    getParks(searchTerm, limit);
  });
}


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(query, limit) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    start: 0,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = `${searchURL}?${queryString}`;
  console.log(`the url is ${url}`);

  fetch(url)
  .then(response => response.json())
  .then(responseJson => displayParks(responseJson));
}

function displayParks(responseJson) {
  console.log(responseJson);
  $('#resultsList').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#resultsList').append(
      `<br>
      <li><h3>Park Name: ${responseJson.data[i].fullName}</h3>
      State: ${responseJson.data[i].states}
      <p>Description: ${responseJson.data[i].description}</p>
      Link to park website: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
      </li>`
    );
  }
}



$(searchSubmit);