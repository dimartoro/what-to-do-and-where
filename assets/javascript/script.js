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