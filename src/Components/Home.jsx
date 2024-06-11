import React, { useState } from 'react'
import searching from '../Images/search.png'
import img1 from '../Images/rain.png'
import humidity from '../Images/humidity.png'
import wind from '../Images/wind.png'
import clouds from '../Images/clouds.png'
import drizzle from '../Images/drizzle.png'
import clear from '../Images/clear.png'
import mist from '../Images/mist.png'
import rain from '../Images/rain.png'

import './home.css'

function Home() {
    const apiKey='e8bb4237b3ddb60d6336c2e2f4e69255';
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=`;
    const weatherIcons=document.querySelector(".weatherIcon");
    const [city,setCity]=useState('')

    async function checkWeather(city){
        const response=await fetch (apiUrl +city+ `&appid=${apiKey}&units=metric`)
        if(response.status==404){
            document.querySelector('.weather').style.display="none";
            document.querySelector('.err').style.display="block"


        }
        const data=await response.json();
        console.log(data);
        console.log(data.weather[0].main);
        document.querySelector(".cityName").innerHTML=data.name
        document.querySelector(".temperature").innerHTML=Math.round(data.main.temp) +" °C"
        document.querySelector(".humidity").innerHTML=data.main.humidity +" %"
        document.querySelector(".wind").innerHTML=data.wind.speed +" km/hr"

        if(data.weather[0].main=="Clouds"){
            weatherIcons.src =clouds;
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcons.src=clear;
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcons.src=drizzle;
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcons.src=mist;
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcons.src=rain;
        }
        document.querySelector('.weather').style.display="block";
        document.querySelector('.err').style.display="none"

    }
    const searchCity=()=>{
        checkWeather(city)
    }
    


  return (
    <>
        <div className="card">
            <div className="search">
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter City Name' spellCheck='false' />
                <button onClick={searchCity}><img src={searching}  /></button>
            </div>
            <div className='err'>Invalid City</div>
            <div className="weather">
                <img src={img1} className='weatherIcon' />
                <h1 className='temperature'>25°C</h1>
                <h2 className='cityName'>New Delhi</h2>
                <div className="details">
                    <div className="col">
                        <img src={humidity}  />
                        <div>
                            <p className="humidity">50%</p>
                            <p>Humidity</p> 
                        </div>
                    </div>                    
                    <div className="col">
                        <img src={wind}  />
                        <div>
                            <p className="wind">15km/hr</p>
                            <p>Wind Speed</p> 
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Home