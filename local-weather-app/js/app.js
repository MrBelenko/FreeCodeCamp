$(document).ready(function() {
  var C = false;
  var apiData;

  backgroundImg = [
    "https://img.purch.com/h/1000/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4Ni8wMjUvb3JpZ2luYWwvbGlnaHRuaW5nLW92ZXItY2l0eS5qcGc=",
    "https://cdn-carwitter.netdna-ssl.com/wp-content/uploads/2017/02/Car-Windscreen-Rain-carwitter.jpg",
    "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg",
    "https://i.ytimg.com/vi/PQOquYHkRY8/maxresdefault.jpg",
    "http://www.mommysheavenlydream.com/wp-content/uploads/2013/08/Foggy.jpg",
    "https://www.desktopbackground.org/download/1920x1080/2014/12/14/871202_sunny-sky-related-keywords-suggestions-sunny-sky-long-tail_2048x1365_h.jpg",
    "https://www.ilgiornalelocale.it/wp-content/uploads/2015/09/temporale.jpg",
  ]

  function displayTemp(F, C) {
    if(C) {
      return Math.round((F-32)*(5/9)) + "&deg; C";
    } else {
      return Math.round(F) + "&deg; F";  // Ferinheit number I'll get from API
    }
  }

  function render(data, C){
    var currentWeather = data.weather[0].description;
    var currentTemp = displayTemp(data.main.temp, C);
    var icon = data.weather[0].icon;

    $("#currentTemp").html(currentTemp);
    $("#currentWeather").html(currentWeather);

    var apiIcon = "https://openweathermap.org/img/w/" + icon + ".png";
    $("#currentTemp").prepend("<img src=" + apiIcon + ">");
  }
 
  $.getJSON("https://freegeoip.net/json/").done(function(location) {
    //console.log(location); success!!!
   $("#country").html(location.country_name);
   $("#city").html(location.city);
   $("#latitude").html(location.latitude);
   $("#longitude").html(location.longitude);

   //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}   original from website
   $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+ location.latitude + "&lon="+ location.longitude + "&units=imperial&appid=e318136ec2420e569c3adead1578fcf2", function(data){
     apiData = data;
     //console.log(apiData); success!!!:)
     render(apiData, C);

     $("#toggle").click(function(){
       C = !C
       render(data, C);
     })

    var id = data.weather[0].id,
        bgIndex,
        backgroundId = [299, 499, 599, 699, 799, 800];

    backgroundId.push(id);
    console.log(backgroundId);
    bgIndex = backgroundId.sort().indexOf(id);

    $("body").css("background-image", "url(" + backgroundImg[bgIndex] + ")");

   }) 
  })
})