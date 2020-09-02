document.addEventListener("DOMContentLoaded", function () {
  main();
});
let cities = [];

function main() {
  const weatherService = new WeatherService("2813c6f3fe791543a33abe4655abc6ef");
  weatherService.getCity("Viborg").then((resp) => {
    cities.push(resp);
    printCities();
  });
  weatherService.getCity("Copenhagen").then((resp) => {
    cities.push(resp);
    printCities();
  });
  weatherService.getCity("Glasgow").then((resp) => {
    cities.push(resp);
    printCities();
  });
}

function printCities() {
  document.getElementById("weather").innerHTML = "";
  cities.forEach((city) => {
    console.log(city);
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
              <p class="cat">Windspeed:</p>
              <p>${city.wind.speed} m/s</p>
            </li>
          </ul>
        </div>
      </div>`;
  });
}

function convertTemp(temp) {
  return (temp - 273.15).toFixed(1) + " ℃";
}
