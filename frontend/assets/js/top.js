const backendService = new BackendService("jesper");
const weatherService = new WeatherService("2813c6f3fe791543a33abe4655abc6ef");
let topList = [];
let cities = [];
let sortingDirection = 1;

document.addEventListener("DOMContentLoaded", function () {
  main();
});

async function main() {
  document.getElementById("sorting-direction").onclick = (e) => {
    sortingDirection *= -1;
    printCities(cities);
  };

  backendService.getRequestedCities().then(async (resp) => {
    await resp.forEach((res) => {
      weatherService.getCityByName(res.city).then((value) => {
        value["count"] = res.count;
        cities.push(value);
        printCities(cities);
      });
    });
    console.log(cities);
  });
}

function printCities(cities) {
  document.getElementById("top-list").innerHTML = "";
  sortCities(cities)?.forEach((city) => {
    document.getElementById("top-list").innerHTML += `<div class="city">
          <div
            class="header"
            style="
              background-image: url(https://openweathermap.org/img/wn/${
                city.weather[0].icon
              }@2x.png);
            "
          >
            <h2>${city.name}</h2>
          </div>
  
          <div class="data">
            <ul class="city-data">
              <li>
                <p class="cat">Searched:</p>
                <p>${city.count} times</p>
              </li>
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

function unixToHourMinute(unixTime) {
  var date = new Date(unixTime * 1000);
  return date.getHours() + ":" + date.getMinutes();
}

function sortCities(cities) {
  return cities.sort(sortByCount);
}

function sortByCount(a, b) {
  if (a.count < b.count) {
    return 1 * sortingDirection;
  }
  if (a.count > b.count) {
    return -1 * sortingDirection;
  }
  return 0;
}
