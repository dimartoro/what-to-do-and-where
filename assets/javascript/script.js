var btnCity = document.getElementById("btn-group");
var cityData = document.getElementById('city-data');
var tableHeaderSpan = document.getElementById('table-city');

function getApi(event) {
    // fetch request gets a list of all the repos for the node.js organization
    var cityHeader = event.target.textContent;
    var city = event.target.textContent.toLowerCase().replace(" ","-");
    var requestUrl = 'https://api.teleport.org/api/urban_areas/slug:' + city + '/details/';
    
    tableHeaderSpan.textContent = cityHeader;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var populationDesc = 'Urban Area Population:';
        var population = data.categories[1].data[0].float_value;
        var sunshineDesc = 'Average % chance of sunshine:';
        var sunshine = data.categories[2].data[4].percent_value;
        var cappuccinoDesc = 'Average cost of a cappuccino:';
        var cappuccino = data.categories[3].data[3].currency_dollar_value;
        var importBeerDesc = 'Average cost of an import beer:';
        var importBeer = data.categories[3].data[6].currency_dollar_value;
        var lifeExpDesc = 'Average life expectancy:';
        var lifeExp = data.categories[7].data[1].float_value;
        var studioAptDesc = 'Average rent - studio apartment:';
        var studioApt = data.categories[8].data[2].currency_dollar_value;
        var elevationDesc = 'Average elevation:';
        var elevation = data.categories[14].data[0].float_value;
        var gunDeathsDesc = 'Annual gun deaths per 100k residents:';
        var gunDeaths = data.categories[16].data[1].int_value;

        var tableInsert = 
        '<tr><td>'+populationDesc+'</td><td>'+population+'</td></tr>'+
        '<tr><td>'+sunshineDesc+'</td><td>'+sunshine+'</td></tr>'+
        '<tr><td>'+cappuccinoDesc+'</td><td>'+cappuccino+'</td></tr>'+
        '<tr><td>'+importBeerDesc+'</td><td>'+importBeer+'</td></tr>'+
        '<tr><td>'+lifeExpDesc+'</td><td>'+lifeExp+'</td></tr>'+
        '<tr><td>'+studioAptDesc+'</td><td>'+studioApt+'</td></tr>'+
        '<tr><td>'+elevationDesc+'</td><td>'+elevation+'</td></tr>'+
        '<tr><td>'+gunDeathsDesc+'</td><td>'+gunDeaths+'</td></tr>';

        cityData.innerHTML = tableInsert;
         //Call to function getBreweries() passing city.toLowerCase parameter
        getBreweries(cityHeader.toLowerCase());
      });
  }
  
  btnCity.addEventListener('click', getApi);

  //JS for modal only
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});
//End of JS for modal

// Function getBreweries() access de API by city and limits de number to 5 only
function getBreweries(city) {
  var queryString = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=5";
  fetch(queryString)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log("This is the city seach data: ", data);
          displayBrewery(data);
      });
}

// Function in charge of examines the object Breweries information creating and 
//appending in html the ul, li and span elements on the fly.
function displayBrewery(info) {
  console.log("This is the Brewery Info : ", info);
  var ulElements = document.querySelector("#ulElements");
  var table = document.querySelector("#tblBreweries");
  ulElements.innerHTML = '';
  for (var x = 0; x < info.length; x++) {
      var li = document.createElement("li"); 

      var breweryType = info[x].brewery_type;
      var city = info[x].city;
      var country = info[x].country;
      var countyProvince = info[x].county_province;
      var createdAt = info[x].created_at;
      var id = info[x].id;
      var latitude = info[x].latitude;
      var longitude = info[x].longitude;
      var name = info[x].name;
      var phone = info[x].phone;
      var postalCode = info[x].postal_code;
      var state = info[x].state;
      var street = info[x].street;
      var updatedAt = info[x].updated_at;
      var websiteURL = info[x].website_url;

      var spanBreweryType = document.createElement("span");
      var spanCity = document.createElement("span");
      var spanCountry = document.createElement("span");
      var spanCountyProvince = document.createElement("span");
      var spanCreatedAt= document.createElement("span");
      var spanId = document.createElement("span");
      var spanLatitude = document.createElement("span");
      var spanLongitude = document.createElement("span");
      var spanName = document.createElement("span");
      var spanPhone = document.createElement("span");
      var spanPostalCode = document.createElement("span");
      var spanState = document.createElement("span");
      var spanStreet = document.createElement("span");
      var spanUpdatedAt = document.createElement("span");
      var spanWebsiteURL = document.createElement("span");

      spanBreweryType.textContent = breweryType;
      spanName.textContent = name;
      spanCity.textContent = city;
      spanCountry.textContent = country;
      spanCountyProvince.textContent = countyProvince;
      spanCreatedAt.textContent = createdAt;
      spanId.textContent = id;
      spanLatitude.textContent = latitude;
      spanLongitude.textContent = longitude;  
      spanPhone.textContent = phone;
      spanPostalCode.textContent = postalCode;
      spanState.textContent = state;
      spanStreet.textContent = street;
      spanUpdatedAt.textContent = updatedAt;
      spanWebsiteURL.textContent = websiteURL;

      // li.setAttribute("id", "liBrewery" + x);
      li.append(spanName);
      li.append(spanBreweryType);  
      li.append(spanCountyProvince);
      // li.append(spanCreatedAt); 
      // li.append(spanLatitude);
      // li.append(spanLongitude); 
      // li.append(spanId);  
      li.append(spanPhone);
      li.append(spanStreet);
      li.append(spanState);
      li.append(spanPostalCode);
      li.append(spanCity);
      li.append(spanCountry); 
      // li.append(spanUpdatedAt);
      li.append(spanWebsiteURL);
      ulElements.append(li);
  }

}