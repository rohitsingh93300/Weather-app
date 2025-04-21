import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import { Wind } from 'lucide-react';
import { WiHumidity } from "react-icons/wi";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [input, setInput] = useState()
  const [city, setCity] = useState("kolkata")
  const [weatherData, setWeatherData] = useState()

  const handleSearch = () => {
    setCity(input)
    setInput("")
  }

  const weather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2589a3873f23403eae995dd50b73690`
    try {
      const res = await axios.get(url)
      const data = res.data
      setWeatherData(data)
      toast.success("Weather Fetched")
      console.log(data);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  }
  useEffect(() => {
    weather()
  }, [city])

  const changeKToC = (kelvin) => {
    const tempInCelsius = (kelvin - 273.15)
    return tempInCelsius.toFixed()
  }

  return (
    <div className='bg-blue-100 h-screen flex justify-center items-center'>
      <div className='bg-blue-400 rounded-md text-white p-10 flex flex-col items-center gap-4'>
        <div className='flex gap-2'>
          <input type="text" placeholder='Search...' className='bg-white p-2 rounded-md text-gray-600 ' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className='bg-blue-500 p-2 rounded-md cursor-pointer' onClick={handleSearch}><Search /></button>
        </div>
        <div className='flex flex-col items-center'>
          <img src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt="" className='w-[150px] ' />
          <h3 className='uppercase'>{weatherData?.weather[0]?.description}</h3>
        </div>
        <h1 className='font-semibold text-5xl'>{changeKToC(weatherData?.main.temp)}°C</h1>
        <h1 className='text-3xl font-semibold '>{weatherData?.name}</h1>
        <div className='flex justify-between items-center  gap-10 mt-7'>
          <div className='flex gap-2 items-center'>
            <WiHumidity className='w-7 h-7' />
            <h1>{weatherData?.main?.humidity}% <br />humidity</h1>
          </div>
          <div className='flex gap-2 items-center'>
            <Wind />
            <h1>{weatherData?.wind?.speed.toFixed()}km/h <br />wind speed</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
