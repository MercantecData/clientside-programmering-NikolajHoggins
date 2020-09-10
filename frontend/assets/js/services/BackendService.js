class BackendService {
  constructor(apikey) {
    this.apikey = apikey;
    this.baseurl = `http://localhost:8000`;
  }

  sendCityRequest(city) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.baseurl + "/addRequest", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", this.apikey);
    xhr.send(
      JSON.stringify({
        city,
      })
    );
  }

  getRequestedCities() {
    return fetch(`${this.baseurl}/requests`, {
      headers: {
        Authorization: this.apikey,
      },
    }).then((resp) => resp.json());
  }

  getCityForecastByCoordinates(lat, lon) {
    //api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
    const url = `${this.baseurl}/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly&appid=${this.apikey}&units=metric`;

    return fetch(url).then((resp) => resp.json());
  }
}
