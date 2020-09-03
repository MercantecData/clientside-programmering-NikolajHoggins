class WeatherService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `http://api.openweathermap.org/data/2.5`;
  }

  getCityByName(city) {
    return fetch(
      `${this.baseurl}/weather?q=${city}&appid=${this.apikey}&units=metric`
    ).then((resp) => resp.json());
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
