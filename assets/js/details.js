document.addEventListener("DOMContentLoaded", function () {
  main();
});

function main() {
  const urlParameters = window.location.href.split("?")[1].split("&");
  let params = {};
  urlParameters.forEach((param) => {
    const kv = param.split("=");
    params[kv[0]] = kv[1];
  });
  console.log(params);
  const weatherService = new WeatherService("2813c6f3fe791543a33abe4655abc6ef");
  weatherService
    .getCityForecastByCoordinates(params.lat, params.lon)
    .then((resp) => {
      printDays(resp.daily);
    });

  document.getElementById("city").innerText = params.name;
}

function unixToHourMinute(unixTime) {
  var date = new Date(unixTime * 1000);
  return date.getHours() + ":" + date.getMinutes();
}

function printDays(days) {
  document.getElementById("dayContainer").innerHTML = "";
  const dayStrings = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < 5; i++) {
    const day = days[i];
    console.log(day);
    console.log(new Date(day.dt * 1000).getDay() - 1);

    document.getElementById("dayContainer").innerHTML += `<div class="day">
          <div
            class="header"
            style="
              background-image: url(http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png);
            "
          >
            <h2>${dayStrings[new Date(day.dt * 1000).getDay()]}</h2>
          </div>
  
          <div class="data">
            <ul class="city-data">
              <li>
                <p class="cat">Weather:</p>
                <p>${day.weather[0].description}</p>
              </li>
              <li>
                <p class="cat">Temp morning:</p>
                <p>${day.temp.morn} &deg;C</p>
              </li>
              <li>
                <p class="cat">Temp day:</p>
                <p>${day.temp.day} &deg;C</p>
              </li>
              <li>
                <p class="cat">Temp evening:</p>
                <p>${day.temp.eve} &deg;C</p>
              </li>
              <li>
                <p class="cat">Sunrise:</p>
                <p>${unixToHourMinute(day.sunrise)}</p>
              </li>
              <li>
                <p class="cat">SunSet:</p>
                <p>${unixToHourMinute(day.sunset)}</p>
              </li>
              <li>
                <p class="cat">Windspeed:</p>
                <p>${day.wind_speed} m/s</p>
              </li>
              <li>
              <div class="wind-arrow">
                <img src="assets/img/arrow.png" height="128px" alt="weather directrion arrow" style="transform: rotate(${
                  day.wind_deg
                }deg)"/>
              </div>
              </li>
            </ul>
          </div>
        </div>`;
  }
}
