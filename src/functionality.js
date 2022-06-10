let now = new Date();

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `4cc8bedd2fbdc11087d0527ebe2205bf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  fahrenheitTemp = response.data.main.temp;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  //Humidity
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  //Wind Speed
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} mph`;

  //Description
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  //Weather Icon
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", description);

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let apiKey = `4cc8bedd2fbdc11087d0527ebe2205bf`;
  let apiUnit = `imperial`;
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(apiUrl).then(showWeather);
}
function changeUnitToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
}
function changeUnitToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-day">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/04n@2x.png"
          alt=""
          class="forecast-img"
          width="75"
        />
        <div class="forecast-temps">
          <span class="forecast-temp-max"> 18° </span>
          <span class="forecast-temp-min"> 12° </span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let fahrenheitTemp = null;

// Day
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = `Last updated ${day[now.getDay()]} at `;

// Change City
let form = document.querySelector("form");
form.addEventListener("submit", search);

// Time
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = now.getHours() + ":" + now.getMinutes();
if (now.getMinutes() < 10) {
  currentTime.innerHTML = now.getHours() + ":0" + now.getMinutes();
}
// Change Unit
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeUnitToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeUnitToFahrenheit);
