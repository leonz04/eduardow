/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import "./styles/CardWeather.css"
import axios from 'axios'

const CardWeather = ({cityData,API_KEY,setCityData,setCity}) => {

    const [temp, setTemp] = useState(null)

    const [isCelsius, setIsCelsius] = useState(true)

    const inputCity = useRef()

    useEffect(() => {
        const celsius= (cityData?.main?.temp-273.15).toFixed(1) //Cambio de temperatura
        const obj={
        celsius:celsius,
        farentheit:((cityData?.main?.temp-273.15)*(9/5)+32).toFixed(1)
        }
      setTemp(obj)
      console.log(celsius)
    }, [cityData])
    
    function changeTemp(){
        setIsCelsius(!isCelsius)
    }

    const searchCity =(event)=>{
               
        event.preventDefault() //Evita que se recargue la funcion

        setCity(inputCity.current.value)

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current.value}&appid=${API_KEY}`)
        .then(res=>{  //Obetenemos la respuesta con la nueva ciuedad ingresada o solicitada
            console.log(res.data)
            setCityData(res.data) 
        })
        .catch(err=>console.log(err))
    }
   
    if(!temp){
        return <h1>cargando</h1>
    }
    
  return (
    <article className='card_weather'>
        <h2 className='card_weatherTitle'>{cityData?.name}</h2>
        <h4 className='card_weatherDescription'>{cityData?.weather[0].description}</h4>

        <h3 className='card_weatherTemp'>
            {isCelsius?
            `${temp?.celsius} °C`
            :`${temp?.farentheit} °F`
            }
        </h3>

        <div className='container'>
        <img className='imgIcon' src={`https://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`} alt=''/>
            <ul className='containerInfo'>
                <li className='item_info'>COORDENADAS<br/><span className='item_info_data'>lat:{cityData?.coord.lat},lon:{cityData?.coord.lon}</span></li>
                <li className='item_info'>PRESION <br/><span className='item_info_data'>{cityData?.main.pressure} hPa</span> </li>
                <li className='item_info'>HUMEDAD <br/><span className='item_info_data'>{cityData?.main.humidity}%</span></li>
                <li className='item_info'>VELOCIDAD DEL VIENTE <br/><span className='item_info_data'>{cityData?.wind.speed} m/s</span></li>
                <li className='item_info'>CLIMA<br/><span className='item_info_data'>{cityData?.weather?.[0].main} m/s</span></li>
                <li className='changeTemp' onClick={changeTemp}>Cambiar Temperatura</li>
            </ul>
        </div>

        <form onSubmit={searchCity}>
            <input ref={inputCity} placeholder='Ingresa la Ciudad'/>
            <button type='submit'>CONSULTAR</button>
        </form>

    </article>
  )
}

export default CardWeather