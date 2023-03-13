var btnCity = document.getElementById("btn-group");
var cityData = document.getElementById('city-data');
var tableHeaderSpan = document.getElementById('table-city');
var infoBtnSpan = document.getElementById('btn-info-city');
var searchField = document.getElementById("search-text");
var btnSearch = document.getElementById("btn-search");
var btnInfo = document.getElementById('info-btn');
var listHeading = document.getElementById('list-heading');

// FUNCTION TO QUERY TELEPORT API FOR CITY DEMOGRAPHIC DATA TO DISPLAY IN MODAL
function getApi(event) {
    event.preventDefault();
    if (event.target.id == "btn-search"){
      cityHeader = searchField.value;
    }
    else {
      cityHeader = event.target.textContent;
    };

    var city = cityHeader.toLowerCase().replace(" ","-");
    var requestUrl = 'https://api.teleport.org/api/urban_areas/slug:' + city + '/details/';
    
    // WRITE CITY NAME TO TABLE hEADING AND MORE INFO BUTTON
    tableHeaderSpan.textContent = cityHeader;
    infoBtnSpan.textContent = cityHeader;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status == 404){
          btnInfo.style.display = "none";
        }
        else {
        var populationDesc = 'Urban area population:';
        var population = data.categories[1].data[0].float_value + " million";
        var sunshineDesc = 'Average chance of sunshine:';
        var sunshine = (data.categories[2].data[4].percent_value * 100) + "%";
        var cappuccinoDesc = 'Average cost of a cappuccino:';
        var cappuccino = "$" + data.categories[3].data[3].currency_dollar_value + "0";
        var importBeerDesc = 'Average cost of an import beer:';
        var importBeer = "$" + data.categories[3].data[6].currency_dollar_value + "0";
        var lifeExpDesc = 'Average life expectancy:';
        var lifeExp = data.categories[7].data[1].float_value + " years";
        var studioAptDesc = 'Average rent - studio apartment:';
        var studioApt = "$" + data.categories[8].data[2].currency_dollar_value;
        var elevationDesc = 'Average elevation:';
        var elevation = data.categories[14].data[0].float_value + " meters";
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
        btnInfo.style.display = "block";
        }
        
        //Call to function getBreweries() passing city.toLowerCase parameter
        getBreweries(cityHeader.toLowerCase());
      });
  }
  
  btnCity.addEventListener('click', getApi);
  btnSearch.addEventListener('click', getApi);

  //JS for modal window
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close modal
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

//Function getBreweries() queries API by city and limits number of results to 10
function getBreweries(city) {
  var queryString = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=10";
  fetch(queryString)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          displayBrewery(data,city);
      });
}

///Function in charge of examines the array of object Breweries information creating and 
///appending in html the ul, li and table elements on the fly.
function displayBrewery(info,city) {
  var ulElements = document.querySelector("#ulElements");
  ulElements.innerHTML = "";
  listHeading.textContent = "Breweries in " + city.toUpperCase();

  for (var x = 0; x < info.length; x++) {
      var li = document.createElement("li"); 
      var link = document.createElement("a");
      var table = document.createElement("table");

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

      var trType = document.createElement("tr");
      var tdTypeLabel = document.createElement("td");
      var tdTypeValue = document.createElement("td");
     
      var trCity = document.createElement("tr");
      var tdCityLabel = document.createElement("td");
      var tdCityValue = document.createElement("td");
     
      var trCountry = document.createElement("tr");
      var tdCountryLabel = document.createElement("td");
      var tdCountryValue = document.createElement("td");
     
      var trCountyProvince = document.createElement("tr");
      var tdCountyProvinceLabel = document.createElement("td");
      var tdCountyProvinceValue = document.createElement("td");
     
      var trCreatedAt = document.createElement("tr");
      var tdCreatedAtLabel = document.createElement("td");
      var tdCreatedAtValue = document.createElement("td");
     
      var trId = document.createElement("tr");
      var tdIdLabel = document.createElement("td");
      var tdIdValue = document.createElement("td");
     
      var trLatitude = document.createElement("tr");
      var tdLatitudeLabel = document.createElement("td");
      var tdLatitudeValue = document.createElement("td");
     
      var trLongitude = document.createElement("tr");
      var tdLongitudeLabel = document.createElement("td");
      var tdLongitudeValue = document.createElement("td");
     
      var trName = document.createElement("tr");
      var tdNameLabel = document.createElement("td");
      var tdNameValue = document.createElement("td");
     
      var trPhone = document.createElement("tr");
      var tdPhoneLabel = document.createElement("td");
      var tdPhoneValue = document.createElement("td");
     
      var trPostalCode = document.createElement("tr");
      var tdPostalCodeLabel = document.createElement("td");
      var tdPostalCodeValue = document.createElement("td");
     
      var trState = document.createElement("tr");
      var tdStateLabel = document.createElement("td");
      var tdStateValue = document.createElement("td");
     
      var trStreet = document.createElement("tr");
      var tdStreetLabel = document.createElement("td");
      var tdStreetValue = document.createElement("td");
     
      var trUpdatedAt = document.createElement("tr");
      var tdUpdatedAtLabel = document.createElement("td");
      var tdUpdatedAtValue = document.createElement("td");
     
      var trWebsiteURL = document.createElement("tr");
      var tdWebsiteURLLabel = document.createElement("td");
      var tdWebsiteURLValue = document.createElement("td");
     
      trType.append(tdTypeLabel);
      trType.append(tdTypeValue);
      tdTypeLabel.innerHTML = "Brewery Type";
      tdTypeValue.innerHTML = breweryType;
     
      trCity.append(tdCityLabel);
      trCity.append(tdCityValue);
      tdCityLabel.innerHTML = 'City';
      tdCityValue.innerHTML = city;
     
      trCountry.append(tdCountryLabel);
      trCountry.append(tdCountryValue);
      tdCountryLabel.innerHTML = 'Country';
      tdCountryValue.innerHTML = country;
     
      trCountyProvince.append(tdCountyProvinceLabel);
      trCountyProvince.append(tdCountyProvinceValue);
      tdCountyProvinceLabel.innerHTML = 'CountyProvince';
      tdCountyProvinceValue.innerHTML = countyProvince;
     
      trCreatedAt.append(tdCreatedAtLabel);
      trCreatedAt.append(tdCreatedAtValue);
      tdCreatedAtLabel.innerHTML = 'CreatedAt';
      tdCreatedAtValue.innerHTML = createdAt;
     
      trId.append(tdIdLabel);
      trId.append(tdIdValue);
      tdIdLabel.innerHTML = 'Id';
      tdIdValue.innerHTML = id;
     
      trLatitude.append(tdLatitudeLabel);
      trLatitude.append(tdLatitudeValue);
      tdLatitudeLabel.innerHTML = 'Latitude';
      tdLatitudeValue.innerHTML = latitude;
     
      trLongitude.append(tdLongitudeLabel);
      trLongitude.append(tdLongitudeValue);
      tdLongitudeLabel.innerHTML = 'Longitude';
      tdLongitudeValue.innerHTML = longitude;
     
      trName.append(tdNameLabel);
      trName.append(tdNameValue);
      tdNameLabel.innerHTML = 'Name';
      tdNameValue.innerHTML = name;
     
      trPhone.append(tdPhoneLabel);
      trPhone.append(tdPhoneValue);
      tdPhoneLabel.innerHTML = 'Phone';
      tdPhoneValue.innerHTML = phone;
     
      trPostalCode.append(tdPostalCodeLabel);
      trPostalCode.append(tdPostalCodeValue);
      tdPostalCodeLabel.innerHTML = 'PostalCode';
      tdPostalCodeValue.innerHTML = postalCode;
     
      trState.append(tdStateLabel);
      trState.append(tdStateValue);
      tdStateLabel.innerHTML = 'State';
      tdStateValue.innerHTML = state;
     
      trStreet.append(tdStreetLabel);
      trStreet.append(tdStreetValue);
      tdStreetLabel.innerHTML = 'Street';
      tdStreetValue.innerHTML = street;
     
      trUpdatedAt.append(tdUpdatedAtLabel);
      trUpdatedAt.append(tdUpdatedAtValue);
      tdUpdatedAtLabel.innerHTML = 'UpdatedAt';
      tdUpdatedAtValue.innerHTML = updatedAt;
     
      link.setAttribute("href", websiteURL);
      link.setAttribute("targe","_blank");
      link.textContent = websiteURL;
      trWebsiteURL.append(tdWebsiteURLLabel);
      trWebsiteURL.append(tdWebsiteURLValue);
      tdWebsiteURLLabel.innerHTML = 'WebsiteURL';
      tdWebsiteURLValue.append(link);
      table.setAttribute('id', id);

    ///creates btnSave and appends it to breweries info tables
      var btnSave = document.createElement('button');
      var trMoreInfo = document.createElement("tr");
      var tdMoreInfoLabel = document.createElement("td");
      var tdMoreInfoButton = document.createElement("td");
      btnSave.setAttribute('class', 'btnSave');
      btnSave.textContent = 'Click here!';
      tdMoreInfoLabel.textContent = 'Do you want to save this Brewery?';
      tdMoreInfoButton.append(btnSave);
      trMoreInfo.append(tdMoreInfoLabel);
      trMoreInfo.append(tdMoreInfoButton);

    ///appends breweries' info desired to table 
      table.append(trName);
      table.append(trType);  
      table.append(trPhone);
      table.append(trStreet);
      table.append(trCity);
      table.append(trState);
      table.append(trPostalCode);
      table.append(trCountry);
      table.append(trWebsiteURL);
      table.append(trMoreInfo);

    ///appends table to li
      li.append(table);

    ///appends li to ul
      ulElements.append(li);
  }

  ///call saveButtons() function
   saveButtons();
}

///Function in charge of adding the event listener on click to the btnSave in 
///the breweries' info tables 
function saveButtons() {
  var buttons = document.getElementsByClassName('btnSave');
  for (var x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener('click', saveBrewery);
  }
}

// VARIABLE TO DEFINE ARRAY TO STORE SAVED BREWERIES IN LOCALSTORAGE
var favBreweries = JSON.parse(localStorage.getItem("favBreweries")) || [];

// DOM REFERENCE FOR BUTTON TO VIEW SAVED BREWERIES
var btnViewSaved = document.getElementById('btnViewSaved');

// FUNCTION TO SAVE A GIVEN BREWERY TO LOCALSTORAGE ARRAY WHEN SAVE BUTTON IN ITS TABLE IS CLICKED
function saveBrewery(event) {
  event.preventDefault();
  var button = event.target;
  var tblInfo = button.closest('table');
  favBreweries.push(tblInfo.outerHTML);
  localStorage.setItem('favBreweries', JSON.stringify(favBreweries));
}

// FUNCTION TO DISPLAY FAVORITE BREWERIES FROM LOCALSTORAGE ARRAY
function displayFavorites(event) {
  event.preventDefault();
  var ul = document.getElementById('ulElements');
  listHeading.textContent = 'Your Favorite Breweries:'
  ul.innerHTML = '';
  var favorites = JSON.parse(localStorage.getItem('favBreweries'));
  if (favorites != null) {
      for (var x = 0; x < favorites.length; x++) {
          var li = document.createElement('li');      
          li.innerHTML = favorites[x];
          ul.append(li);
      }
  }
  saveButtons();
}
// EVENT LISTENER TO DISPLAY USER FAVORITES ON CLICK OF BLUE BUTTON
btnViewSaved.addEventListener('click', displayFavorites);