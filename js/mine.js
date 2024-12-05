//Today's Card Variables:                                                   داتا اول كارد عندى
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:                           الاتنين كاردز الى بعد اليوم الاول الى لسه هعرض فيهم
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
   currentCity = "Cairo",
  apiResponse,
  responseData,
  monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
   days = [
     "Sunday",
     "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
  ];



  async function getWeatherData() {
    try {
      apiResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=daec2d87ec174998bb000655242911&q=${currentCity}&days=3`
      );
      if (!apiResponse.ok) {
        if (apiResponse.status === 403) {
          throw new Error("Access forbidden: Check your API key or permissions.");
        } else {
          throw new Error(`Error: ${apiResponse.status}`);
        }
      }
      responseData = await apiResponse.json();
      displayTodayWeather();
      displayNextDayWeather();
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  }
  
  


let date =new Date();
function displayTodayWeather(){
console.log(date);
today.innerHTML = days[date.getDay()];
todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
cityLocation.innerHTML = responseData.location.name;
todayDegree.innerHTML = responseData.current.temp_c;
todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
description.innerHTML = responseData.current.condition.text;
humidty.innerHTML = responseData.current.humidity
wind.innerHTML= responseData.current.wind_kph
compass.innerHTML = responseData.current.wind_dir
}


function displayNextDayWeather(){
  for (let i=0; i<nextDay.length;i++){
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()] ;
    nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML= responseData.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML= responseData.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
  }

}

searchBar.addEventListener("keyup", function () {
  currentCity = searchBar.value.trim(); // إزالة المسافات الزائدة
  if (currentCity !== "") { // استدعاء الدالة فقط إذا كان هناك إدخال
    getWeatherData();
  }
});




