var btnCity = document.getElementById("btn-group");
var cityData = document.getElementById('city-data');
var tableHeaderSpan = document.getElementById('table-city');
var searchField = document.getElementById("search-text");
var btnSearch = document.getElementById("btn-search");
var btnInfo = document.getElementById('info-btn');


function getApi(event) {
    event.preventDefault();
    // fetch request gets a list of all the repos for the node.js organization
    if (event.target.id == "btn-search"){
      cityHeader = searchField.value;
    }
    else {
      cityHeader = event.target.textContent;
    };
    console.log(city);

    var city = cityHeader.toLowerCase().replace(" ","-");
    var requestUrl = 'https://api.teleport.org/api/urban_areas/slug:' + city + '/details/';
    
    tableHeaderSpan.textContent = cityHeader;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status == 404){
          btnInfo.style.display = "none";
        }
        else {
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
        btnInfo.style.display = "block";

        }
        
         //Call to function getBreweries() passing city.toLowerCase parameter
        getBreweries(cityHeader.toLowerCase());
      });
  }
  
  btnCity.addEventListener('click', getApi);
  btnSearch.addEventListener('click', getApi);

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
  var queryString = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=10";
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
  ulElements.innerHTML = "";

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
      // tdWebsiteURLValue.innerHTML = websiteURL;

      table.setAttribute('id', id);

    ///creating class btnSave and assign it to var btnSave
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

      table.append(trName);
      table.append(trType);  
      table.append(trPhone);
      table.append(trStreet);
      table.append(trCity);
      table.append(trState);
      table.append(trPostalCode);
      table.append(trCountry);
      table.append(trId);
      table.append(trWebsiteURL);
      table.append(trMoreInfo);
       // table.append(trCountyProvince);
      // table.append(trCreatedAt);
      // table.append(trUpdatedAt);
      // table.append(trId);
      // table.append(trLatitude);
      // table.append(trLongitude);
      
      // spanBreweryType.textContent = breweryType;
      // spanName.textContent = name;
      // spanCity.textContent = city;
      // spanCountry.textContent = country;
      // spanCountyProvince.textContent = countyProvince;
      // spanCreatedAt.textContent = createdAt;
      // spanId.textContent = id;
      // spanLatitude.textContent = latitude;
      // spanLongitude.textContent = longitude;  
      // spanPhone.textContent = phone;
      // spanPostalCode.textContent = postalCode;
      // spanState.textContent = state;
      // spanStreet.textContent = street;
      // spanUpdatedAt.textContent = updatedAt;
      // spanWebsiteURL.textContent = websiteURL;

      // li.setAttribute("id", "liBrewery" + x);
      // li.append(spanName);
      // li.append(spanBreweryType);  
      // li.append(spanCountyProvince);
      // li.append(spanCreatedAt); 
      // li.append(spanLatitude);
      // li.append(spanLongitude); 
      // li.append(spanId);  
      // li.append(spanPhone);
      // li.append(spanStreet);
      // li.append(spanState);
      // li.append(spanPostalCode);
      // li.append(spanCity);
      // li.append(spanCountry); 
      // li.append(spanUpdatedAt);
      // li.append(spanWebsiteURL);
      li.append(table);
      ulElements.append(li);
  }
   saveButtons();
}

// DIANA CREATED THIS FUNCTION APPARENTLY TO LISTEN TO ALL SAVE BUTTONS
// PERHAPS THIS IS CREATING THE DISPALY ISSUE AND SHOULD BE FORMATTED DIFFERENTLY?
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
  // REMOVED THIS DUPLICATE CHECKING CODE FOR NOW AS IT WAS CAUSING ISSUES
  // for (var x = 0; x < favBreweries.length; x++) {
  //     var tbl = breweries[x];
  //     var div = document.createElement('div');
  //     div.innerHTML = tbl;
  //     var domTable = div.children[0];
  //     if (domTable.getAttribute('id') == tblInfo.getAttribute('id')) {
  //         duplicate = true;
  //     }
  //     console.log("This is a table: ", div);
  // }
  // if (!duplicate) {
}

// BUTTON TO DISPLAY FAVORITE BREWERIES FROM LOCALSTORAGE ARRAY
function displayFavorites(event) {
  event.preventDefault();
  var ul = document.getElementById('ulElements');
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

btnViewSaved.addEventListener('click', displayFavorites);