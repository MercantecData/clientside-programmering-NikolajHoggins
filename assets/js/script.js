const weatherService = new WeatherService("2813c6f3fe791543a33abe4655abc6ef");
let cities = [];

document.addEventListener("DOMContentLoaded", function () {
  main();
});

function main() {
  //getStarterCities(weatherService);
  cities = JSON.parse(localStorage.getItem("cities")) ?? [];
  printCities();

  document.getElementById("confirmSearch").onclick = confirmSearch;

  document.getElementById("weather").onclick = handleDelete;

  for (var item in document.getElementsByClassName("cityDetails")) {
    item.onclick = (e) => {
      console.log(e);
    };
  }
  //   .forEach(
  //   (elem) =>
  //     (elem.onclick = (e) => {
  //       console.log(e.target);
  //     })
  // );
}

function confirmSearch() {
  const city = document.getElementById("citySearch").value;

  if (cities.map((city) => city.name).indexOf(city) !== -1) {
    return;
  }

  weatherService.getCityByName(city).then((resp) => {
    resp["id"] = cities[cities.length - 1]
      ? cities[cities.length - 1].id + 1
      : 0;
    cities.push(resp);
    localStorage.setItem("cities", JSON.stringify(cities));
    printCities();
  });
}

function handleDelete(e) {
  const attribute = e.target.getAttribute("data-city");
  if (!attribute) {
    return;
  }

  const idsOnly = cities.map((city) => city.id);
  const deleteIndex = idsOnly.indexOf(parseInt(attribute));

  cities.splice(deleteIndex, 1);
  localStorage.setItem("cities", JSON.stringify(cities));
  printCities();
}

function convertTemp(temp) {
  return (temp - 273.15).toFixed(1) + " ℃";
}

function unixToHourMinute(unixTime) {
  var date = new Date(unixTime * 1000);
  return date.getHours() + ":" + date.getMinutes();
}

function printCities() {
  document.getElementById("weather").innerHTML = "";

  cities?.forEach((city) => {
    document.getElementById("weather").innerHTML += `<div class="city">
          <div
            class="header"
            style="
              background-image: url(http://openweathermap.org/img/wn/${
                city.weather[0].icon
              }@2x.png);
            "
          >
            <h2>${city.name}</h2>
          </div>
  
          <div class="data">
            <ul class="city-data">
              <li>
                <p class="cat">Country:</p>
                <p>${city.sys.country}</p>
              </li>
              <li>
                <p class="cat">Weather:</p>
                <p>${city.weather[0].description}</p>
              </li>
              <li>
                <p class="cat">Temperature:</p>
                <p>${convertTemp(city.main.temp)}</p>
              </li>
              <li>
                <p class="cat">Temperature feels:</p>
                <p>${convertTemp(city.main.feels_like)}</p>
              </li>
              <li>
                <p class="cat">Sunrise:</p>
                <p>${unixToHourMinute(city.sys.sunrise)}</p>
              </li>
              <li>
                <p class="cat">SunSet:</p>
                <p>${unixToHourMinute(city.sys.sunset)}</p>
              </li>
              <li>
                <p class="cat">Temperature feels:</p>
                <p>${convertTemp(city.main.feels_like)}</p>
              </li>
              <li>
                <p class="cat">Windspeed:</p>
                <p>${city.wind.speed} m/s</p>
              </li>
            </ul>
            <button class="cityDetails" data-details="${
              city.name
            }">Details</button>
          </div>
          <button id="deletecity" class="deletecity" >
            <img height="18px" src="assets/img/cross_error.svg" alt="delete city" data-city="${
              city.id
            }" />
          </button>
        </div>`;
  });
}
