
let weatherApp = {
    
    apiKey: "3afcf8d84153d7666eb1dd9b92b38552",

    getWeather: function(location) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          location +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((res) => {
           if (!res.ok) {
             alert("No weather data found");
             throw new Error("No weather data found");
            }
            return res.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".location").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".weatherDescription").innerText = description;
      document.querySelector(".temperature").innerText = Math.round(temp) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    searchWeather: function () {
      this.getWeather(document.querySelector(".searchBar").value);
    },
  };
  

  document.querySelector(".searchSection button").addEventListener("click", function () {
    weatherApp.searchWeather();
  });
  

  document.querySelector(".searchBar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weatherApp.searchWeather();
      }
    });
  
  weatherApp.getWeather("Frankfurt");