class WeatherService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `https://api.openweathermap.org/data/2.5`;
  }

  async getCityByName(cityName) {
    // Check localstorage if exists and not expired.
    // I now directly store the city in localStorage.
    // I would'nt call this an optimal solution, but it fixes async problems from the earlier solution
    let cached_city = JSON.parse(localStorage.getItem(cityName));

    if (cached_city) {
      if (Date.now() > cached_city.expiry) {
        console.log("City expired, fetch new.");
        localStorage.removeItem(cityName);
      } else {
        console.log(`Returned ${cityName} from cache`);
        return cached_city;
      }
    }

    return fetch(
      `${this.baseurl}/weather?q=${cityName}&appid=${this.apikey}&units=metric`
    )
      .then((resp) => resp.json())
      .then((val) => {
        console.log("Fetching new site");

        const minutes = 0.2;
        //Take minutes and mulitply with 60000 which is a minute in unix time.
        val["expiry"] = Date.now() + minutes * 60000;

        localStorage.setItem(cityName, JSON.stringify(val));
        return val;
      });
  }

  getCityByCoordinates(lat, lon) {
    return fetch(
      `${this.baseurl}/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`
    ).then((resp) => resp.json());
  }

  getCityForecastByCoordinates(lat, lon) {
    //api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
    const url = `${this.baseurl}/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly&appid=${this.apikey}&units=metric`;

    return fetch(url).then((resp) => resp.json());
  }
}
