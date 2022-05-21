let now = new Date();

function showWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.main.temp);

  //Humidity
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  //Wind Speed
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
}
function search(event) {
  event.preventDefault();
  let apiKey = `4cc8bedd2fbdc11087d0527ebe2205bf`;
  let apiUnit = `imperial`;
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(apiUrl).then(showWeather);
}
// Day
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = days[now.getDay()];

// Change City
let form = document.querySelector("form");
form.addEventListener("submit", search);

// Time
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = now.getHours() + ":" + now.getMinutes();
if (now.getMinutes() < 10) {
  currentTime.innerHTML = now.getHours() + ":0" + now.getMinutes();
}