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

  document.getElementById("weather").onclick = handleCityClick;
}

function confirmSearch() {
  const city = document.getElementById("citySearch").value;

  if (cities.map((city) => city.name).indexOf(city) !== -1) {
    return;
  }

  weatherService.getCityByName(city).then((resp) => {
    if (resp["cod"] == 404) {
      document.getElementById("errorText").innerText = resp["message"];
      return;
    }
    resp["id"] = cities[cities.length - 1]
      ? cities[cities.length - 1].id + 1
      : 0;
    cities.push(resp);
    localStorage.setItem("cities", JSON.stringify(cities));
    printCities();
  });
}

function handleCityClick(e) {
  const attribute = e.target.getAttribute("data-city");
  const type = e.target.getAttribute("data-type");

  if (!attribute) {
    return;
  }
  if (!type) {
    return;
  }

  const idsOnly = cities.map((city) => city.id);
  const selectedIndex = idsOnly.indexOf(parseInt(attribute));

  if (type === "delete") {
    cities.splice(selectedIndex, 1);
    localStorage.setItem("cities", JSON.stringify(cities));
    printCities();
  } else if (type === "details") {
    window.location.href = `/details.html?lon=${cities[selectedIndex].coord.lon}&lat=${cities[selectedIndex].coord.lat}&name=${cities[selectedIndex].name}`;
  }
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
                <p>${city.main.temp}  &deg;C</p>
              </li>
              <li>
                <p class="cat">Temperature feels:</p>
                <p>${city.main.feels_like}  &deg;C</p>
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
                <p class="cat">Windspeed:</p>
                <p>${city.wind.speed} m/s</p>
              </li>
            </ul>
            <button class="cityDetails" data-type="details" data-city="${
              city.id
            }">Details</button>
          </div>
          <button id="deletecity" class="deletecity" >
            <img height="18px" src="assets/img/cross_error.svg" alt="delete city" data-type="delete" data-city="${
              city.id
            }" />
          </button>
        </div>`;
  });
}
