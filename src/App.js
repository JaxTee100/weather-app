
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

const App = () => {
  //create state and the state setter function for the current weather and weather forecast
  const[currentWeather, setCurrentWeather] = useState(null)
  const[forecast, setForecast] = useState(null)


  const handleSearchChange = (searchData) =>{
    //destructure the latitude and longitude values from the search.value
    const [lat,lon] = searchData.value.split(" ");

    //create a variable to store the fetched data for current weather and forecast
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=etric`);

    //made a promise here...that i still dont understand
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(response) =>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setForecast({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err))
  }
  console.log("current weather",currentWeather)
  console.log("forecast",forecast)

  return(
    <div className='container'>
      <Search 
        onSearchChange={handleSearchChange}
      />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  )
}

export default App;
