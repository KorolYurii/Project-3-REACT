"use strict";

var API_KEY = '4c353af824d786d3afe3b55e6a4178eb';
var BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=".concat(API_KEY);
var DAYS_URL = "https://api.openweathermap.org/data/2.5/forecast?&appid=".concat(API_KEY, "&units=metric");

function searchCity() {
  var cityName = document.getElementById('search').value;

  if (cityName) {
    console.log(cityName);
    axios.get(BASE_URL + "&q=".concat(cityName)).then(function (res) {
      //console.log(res); 
      generateCards(res.data);
    });
  }
}

function generateCards(results) {
  var ICON_URL = "https://openweathermap.org/img/wn/".concat(results.weather[0].icon, "@2x.png");
  var html = "<div class=\"list\">";
  html = html + "\n    <span class=\"country\">".concat(results.sys.country, ",</span>\n    <span class=\"city_name\">").concat(results.name, "</span> </br> \n    <span class=\"description\">").concat(results.weather[0].description, "</span> </br>    \n    <img src=\"").concat(ICON_URL, "\" class=\"icon\"></img> </br>\n    <span class=\"temp\">").concat(results.main.temp, " \xB0C</span> </br>         \n    <span class=\"speed\">wind speed:  ").concat(results.wind.speed, " m/s</span>    \n    ");
  html = html + '</div>';
  document.getElementById('content').innerHTML = html;
}

function searchDaysCity() {
  var cityName = document.getElementById('search').value;

  if (cityName) {
    console.log(cityName);
    axios.get(DAYS_URL + "&q=".concat(cityName)).then(function (res) {
      //console.log(res.data);
      generateDaysCards(res.data);
    });
  }
}

function generateDaysCards(resultData) {
  var html = "<ul class=\"day_list\">";
  resultData.list.forEach(function (el) {
    var ICON_DAY_URL = "https://openweathermap.org/img/wn/".concat(el.weather[0].icon, "@2x.png");
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dateList = new Date(el.dt_txt);
    var dateNumber = dateList.getDay(); //console.log(days[dateNumber]);

    html = html + "\n        <li class='day_list_item'>\n            <span class=\"days\">".concat(days[dateNumber], ",</span></br> \n            <span class=\"txt\">").concat(el.dt_txt, ",</span></br> \n            <span class=\"temp\">").concat(el.main.temp, " \xB0C</span></br> \n            <img src=\"").concat(ICON_DAY_URL, "\" ></br\n            <span class=\"description\">").concat(el.weather[0].description, "</span></br>   \n            <span class=\"wind\">").concat(el.wind.speed, " m/s</span></br>\n        </li>");
  });
  html = html + '</ul>';
  document.getElementById('day_content').innerHTML = html;
}