class WeatherService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `https://api.openweathermap.org/data/2.5`;
  }

  async getCityByName(cityName) {
    //Check localstorage if exists and not expired.
    let cities = JSON.parse(localStorage.getItem("cached_cities")) ?? [];
    //const city = cities.find((cached_city) => cached_city.name === cityName);
    const cityIndex = cities
      .map((cached_city) => cached_city.name)
      .indexOf(cityName);
    if (cityIndex !== -1) {
      if (Date.now() > cities[cityIndex].expiry) {
        console.log("City expired, fetch new.");
        cities.splice(cityIndex, 1);
      } else {
        console.log(`Returned ${cityName} from cache`);
        return cities[cityIndex];
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
        cities = JSON.parse(localStorage.getItem("cached_cities")) ?? [];
        cities.push(val);
        localStorage.setItem("cached_cities", JSON.stringify(cities));
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
