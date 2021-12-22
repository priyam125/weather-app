import React , {useEffect, useRef, useState} from 'react';
import Chart from 'react-apexcharts'
import './index.css'

const Chart1 = (props) => {

    !props.daysLabel && <div>Loading</div>
    

    const chart = {
        options: {
            chart: {
              toolbar: {
                show: false
              },
              id: 'apexchart-example',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
            },
            
            dataLabels: {
              enabled: false,           
             },
            xaxis: {
              categories: props.daysLabel,
              labels: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#c2bebe"
              }
            },
            yaxis: {
              labels: {
                show: true    
              },
              axisBorder: {
                show: true,
                color: "#c2bebe"
              }
            },
            noData: {
              text: 'Loading'
            },
            grid: {
              show: false
            },
            stroke: {
              width: 2,
              curve: "straight"
            },
            fill: {
              
            }
          },
          series: [{
            name: `High temperature in Farhenite`,
            data: props.highChart,
            
            // type: "line"
          },{
            name: 'Low temperature in Farhenite',
            data: props.lowChart,
          }

        ],

        }
      

    return (
        <div>
        {props.daysLabel ?
          <div>
            <Chart className='chart hidden' options={chart.options} series={chart.series} type="line" width={1000} height={350}  />
            <Chart className='chart1 hidden' options={chart.options} series={chart.series} type="line" width={700} height={250}  />
            <Chart className='chart2 hidden' options={chart.options} series={chart.series} type="line" width={500} height={250}  />
            <Chart className='md:hidden' options={chart.options} series={chart.series} type="line" width={300} height={250}  />            
          </div> : 
          <div>loading</div>
        }
        </div>
    )
}

export default Chart1

