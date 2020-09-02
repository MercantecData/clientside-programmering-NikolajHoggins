class WeatherService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `http://api.openweathermap.org/data/2.5/weather`;
  }

  getCityByName(city) {
    return fetch(
      `${this.baseurl}?q=${city}&appid=${this.apikey}`
    ).then((resp) => resp.json());
  }

  getCityByCordinates(lat, lon) {
    return fetch(
      `${this.baseurl}?lat=${lat}&lon=${lon}&appid=${this.apikey}`
    ).then((resp) => resp.json());
  }
}
