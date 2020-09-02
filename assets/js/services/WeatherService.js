class WeatherService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `http://api.openweathermap.org/data/2.5/weather`;
  }

  getCity(city) {
    return fetch(
      `${this.baseurl}?q=${city}&appid=${this.apikey}`
    ).then((resp) => resp.json());
  }
}
