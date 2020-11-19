import React, { useState } from 'react';
const api = {
  key: "140afda814b923b2151771c15fa96de3",
  base: "https://api.openweathermap.org/data/2.5/"

}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  // targets the Enter key and fetches data from API

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result)
          //console.log(result)
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];

    let days = ["Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday", "Sunday"]

// functions to get relevant day, month, year

    let day = days[d.getDay()]

    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (

    // changes background if temperature is > 16C

    <div className={(typeof weather.main != "undefined")
      ? ((weather.main.temp > 16)
        ? 'app warm' : 'app') : 'app'} >
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="flip-card">
              <div className="flip-card-inner">
                
                <div className="flip-card-front">
                  
                  <div className="temp">
                    {Math.round(weather.main.temp)}°C
                
                </div>
                </div>

                <div className="flip-card-back">

                  <h1>Additional Information</h1>
                  <div id="addInfo">Feels like: {weather.main.feels_like}°C</div>
                  <div id="addInfo">Humidity: {weather.main.humidity}°C</div>
                  <div id="addInfo">Wind speed: {weather.wind.speed}mph</div>

                </div>

              </div>
            </div>

            <div className="weather">
              {weather.weather[0].main}
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
