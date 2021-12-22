import React, {useEffect, useState} from 'react'
import axios from "axios";
import './index.css'
import Chart from './Chart';
import { Line, Bar } from "react-chartjs-2";
import Chart1 from './Chart1';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";




const Weather = () => {

    const [weather, setWeather] = useState({})
    const [city, setCity] = useState('newyork')
    const [place, setPlace] = useState()
    const [country, setCountry] = useState()
    const [temperature, setTemperature] = useState()
    const [hightemp, setHightemp] = useState()
    const [lowtemp, setLowtemp] = useState()
    const [condition, setCondition] = useState()
    const [highChart, setHighChart] = useState()
    const [lowChart, setlowChart] = useState()
    const [daysLabel, setDaysLabel] = useState()
    const [chartCondition, setChartCondition] = useState()
    const [chartData, setChartData] = useState({})


    const [sunrise, setSunrise] = useState()
    const [sunset, setSunset] = useState()
    const [chill, setChill] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()

    const [toggle, setToggle] = useState(false)
    const [moreLess, setMoreLess] = useState('more')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(toggle);

        if(toggle) {
            setMoreLess('less')
        } else if(toggle == false) {
            setMoreLess('more')
        }
    },[toggle])



    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://yahoo-weather5.p.rapidapi.com/weather',
            params: {location: city, format: 'json', u: 'f'},
            headers: {
              'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
              'x-rapidapi-key': 'e357fd3ff7msh8a7baeb7b424b80p1da849jsn9b6dac32432b'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              let tempHighArr = [], tempLowArr = [], daysArr=[], conditionArr=[]

              response.data.forecasts.map((temp,index) => {
                  index < 7 && tempHighArr.push(temp.high)
                  
              })
              console.log(tempHighArr);
              setHighChart(tempHighArr)
              response.data.forecasts.map((temp,index) => {
                  index < 7 && tempLowArr.push(temp.low)
                  
              })
              console.log(tempLowArr);
              setlowChart(tempLowArr)
              response.data.forecasts.map((temp,index) => {
                index < 7 && daysArr.push(temp.day)
                
            })
            console.log(daysArr);
            setDaysLabel(daysArr)
            response.data.forecasts.map((temp,index) => {
                index < 7 && conditionArr.push(temp.text)
                
            })
            console.log(conditionArr);
            setChartCondition(conditionArr)


            setChartData({
                labels: daysLabel,
            datasets: [
                {
                    // label: "no of votes",
                    data: tempHighArr,
                    label: `Price (Past  days) in USD`,
                    borderColor: "#4B40EE",
                    fill: true,
                    borderWidth: 1,
                    datalabels: {
                        color: "#44ff44"
                    }
                }
            ]
            })


              setPlace(response.data.location.city)
              setCountry(response.data.location.country)
              setTemperature(response.data.current_observation.condition.temperature)
              setHightemp(response.data.forecasts[0].high)
              setLowtemp(response.data.forecasts[0].low)
              setCondition(response.data.current_observation.condition.text)
              setSunrise(response.data.current_observation.astronomy.sunrise)
              setSunset((response.data.current_observation.astronomy.sunset))
              setChill(response.data.current_observation.wind.chill)
              setHumidity(response.data.current_observation.atmosphere.humidity)
              setWindSpeed((response.data.current_observation.wind.speed))
              setPressure(response.data.current_observation.atmosphere.pressure)
              setWeather(response.data)
              setLoading(true)
          }).catch(function (error) {
              console.error(error);
          });
    },[])

    return (
        <div className='border-2 p-6' >
           <div className='main w-full bg-cover rounded-2xl bg-no-repeat border-2 p-4 relative' style={{backgroundImage: 'url(/images/night.jpg)'}}>

                {loading == true ? 
                    <div className='z-20 flex flex-col md:items-start items-center md:flex-row space-x-10'>
                    <div className='flex flex-col md:w-1/3 w-11/12 items-center justify-center'>
                        <div className='flex items-center justify-center mb-4'>
                            <div className='text-white text-2xl mr-2 pad'>{place},</div>
                            <div className='text-gray-500 text-xl'>{country}</div>
                        </div>
                        <div className='flex'>
                            <div className='text-8xl text-white mr-1'>{temperature}</div>
                            <div className='text-white text-2xl mt-3'>F</div>
                        </div>
                        <div className='flex text-white space-x-4 justify-between w-full xl:px-32 lg:px-16 md:px-14 px-14 '>
                            <div className='flex'>
                                <div className='text-white text-xl mr-1'>H: {hightemp}</div>
                                <div className='text-white text-xs mt-1'>F</div>
                            </div>
                            <div className='flex mb-2'>
                                <div className='text-white text-xl mr-1'>L: {lowtemp}</div>
                                <div className='text-white text-xs mt-1'>F</div>
                            </div>
                        </div>
                        <div className='text-2xl text-white mb-8 md:mb-0'>{condition}</div>
                    </div>

                    <div className='flex flex-col items-center h-56 lg:w-1/6 w-2/3 astronomy text-white'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-xl flex flex-col items-center justify-center mb-4'>Astronomy</div>
                            <div className='flex flex-col'>
                                <div className='text-xl astronomy-text mb-6 '>Sunrise:   {sunrise}</div>
                                <div className='text-xl astronomy-text '>Sunset:   {sunset}</div>
                            </div>
                        </div>
                        <div className={`flex items-center justify-center py-6 text-xl ${toggle ? 'block' : 'hidden'}`}>
                            <div>{`Humidity: ${humidity}`}</div>
                        </div>
                    </div>

                    {/*<div className='text-white h-1/2 w-1/6 flex flex-col items-center justify-center bg-pink-500'>
                        <div className='text-xl flex flex-col items-center justify-center mb-4'>Astronomy</div>
                        <div className='text-xl mb-6 '>Sunrise:   {sunrise}</div>
                        <div className='text-xl '>Sunset:   {sunset}</div>
    </div>*/}

                    <div className={`text-white h-1/2 md:mb-0 mb-4 md:w-1/6 w-2/3 flex flex-col items-center justify-center shadow-2xl border-2 rounded-xl mr-96 ${toggle ? 'block' : 'hidden'}`}>
                        <div className='text-xl flex flex-col items-center justify-center mb-2'>Wind Speed</div>
                        
                        <div className='w-1/2 h-1/2 mb-2'><CircularProgressbar circleRatio={0.75} styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee",
                            textColor: 'white',
                            textSize: '34px'
                          })} value={windSpeed} maxValue={100} text={`${windSpeed}`}/></div>
                          <div className='text-xl mb-4 '>in Kmph</div>
                    </div>

                    <div className={`text-white h-1/2 md:mb-0 mb-8 md:w-1/6 w-2/3 flex flex-col items-center justify-center shadow-xl border-2 rounded-xl mr-96 ${toggle ? 'block' : 'hidden'}`}>
                        <div className='text-xl flex flex-col items-center justify-center mb-2'>Pressure</div>
                        
                        <div className='w-1/2 h-1/2 mb-0'><CircularProgressbar circleRatio={0.75} styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee",
                            textColor: 'white',
                            textSize: '28px'
                          })} value={windSpeed} maxValue={100} text={`${pressure}`}/></div>
                          <div className='text-xl mb-4 '>inHg</div>
                    </div>  
                    


                </div> : <div className='p-10 flex items-center justify-center'><Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              /></div> }
                

                    

                <button className='text-white right-6 bottom-2 absolute text-xl' onClick={() => setToggle(!toggle)}>{`Show ${moreLess} information`}</button>
           </div>

           <div className='mt-10 flex items-center justify-center border-2 rounded-2xl shadow-xl'>
                          {loading == true ? 
                            <div className='chart'>
                            <div className='rotate-270'>Temperature in F</div>
                            <Chart1 chartData={chartData} chartCondition={chartCondition} highChart={highChart} lowChart={lowChart} daysLabel={daysLabel} />
                          </div> : <div className='p-10 flex items-center justify-center'>
                          Chart Loading<Loader
                          type="ThreeDots"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={3000} //3 secs
                        /></div>}

             
           </div>
        </div>
    )
}

export default Weather
