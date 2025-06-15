let cityName = document.querySelector(".weather_city");
    let dateTime = document.querySelector(".weather_date_time");
    let w_forecast = document.querySelector(".weather_forecast");
    let w_icon = document.querySelector(".weather_icon");
    let w_temperature = document.querySelector(".weather_temperature");
    let w_minTem = document.querySelector(".weather_min");
    let w_maxTem = document.querySelector(".weather_max");
    let w_feelslike = document.querySelector(".weather_feelslike");
    let w_humidty = document.querySelector(".weather_humidity");
    let w_wind = document.querySelector(".weather_wind");
    let w_pressure = document.querySelector(".weather_pressure");
    let citySearch = document.querySelector(".weather_search");
    let Errordata = document.querySelector(".body");

    const getCountry = (code) => {
      return new Intl.DisplayNames([code], { type: "region" }).of(code);
    };

    const getdateTime = (dt) => {
      //  dt=1744873545;
      const curData = new Date(dt * 1000);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second:"numeric",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(curData);
    };
    let city = "Mumbai";
    citySearch.addEventListener("submit", (e) => {
      e.preventDefault();
      let cityName = document.querySelector(".city_name");
      city = cityName.value;
      getWeatherData(city);
      cityName.value = "";
    });

    function kelvinToCelsius(kelvin) {
      const res = kelvin - 273.15
      return res.toFixed(2);
    }

    const getWeatherData = async (city) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f153aa54d7e521b47eb08a6af43aafe`;
      try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data);
        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name},${getCountry(sys.country)}`;
        dateTime.innerHTML = getdateTime(dt);
        w_temperature.innerHTML = `${kelvinToCelsius(main.temp)}&#176;C`;
        w_minTem.innerHTML = `Min:${kelvinToCelsius(main.temp_min)}&#176;C`;
        w_maxTem.innerHTML = `Max:${kelvinToCelsius(main.temp_max)}&#176;C`;

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

        w_feelslike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176;C`;
        w_humidty.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed}km/h`;
        w_pressure.innerHTML = `${main.pressure}Pa`;
      } catch (error) {
        Errordata.innerHTML = "City Not Found! Please Refresh the Page";
      }
    };

    document.body.addEventListener("load", getWeatherData(city));