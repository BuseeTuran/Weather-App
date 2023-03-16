import {createContext, useContext, useState, useEffect} from 'react'
import data from "../dataOfCities/cities.json"
import axios from 'axios';
const WeatherContext = createContext();
export const WeatherProvider = ({children}) => {
    const cities = data
    const [city,setCity] = useState("İstanbul")
    const [weatherData,setWeatherData] = useState([])
    useEffect(()=>{
        let selectCities = data.filter(item => item.name===city)[0]
        let key = "46233b1fe5bd43e2887132704231303"
        axios(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectCities.latitude},${selectCities.longitude}&days=7&hour=24`)
        .then(res => res.data)
        .then(res => res.forecast)
        .then(res => setWeatherData(res.forecastday))
    },[city])
  // console.log(weatherData);
    const values ={
       cities,
       city,
       setCity,
       weatherData,
     
    }
    if (weatherData.length===0) {
        return <div>Loading...</div>
      }
    return (
        <WeatherContext.Provider value={values }>{children}</WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);