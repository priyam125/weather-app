import React , {useRef} from 'react';
import { Line, Bar } from "react-chartjs-2";

const Chart = (props) => {

    console.log(props);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    borderColor: "#c2bebe"
                },
                ticks: {
                    display: false,
                    // color: "#c2bebe"
                },
            },
            y: {
                grid: {
                    display: false,
                    borderColor: "#c2bebe"
                },
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            point: {
              radius: 0
            }
          },
        plugins: {
            legend: {
                display: false
            }
        },
        tooltips: {
            displayColors: false,
            backgroundColor: "red"
        }   
        
    }
    
    return (
        <div className="">
          { props.daysLabel !== undefined ? 
            <div>
            <Line data= {props.chartData}
            height={275}
            width={150}
            options={options}
            
              />
            </div> : <div className="pt-8 flex flex-col items-center justify-center">Loading</div>
        }
          
        </div> 
           )
}

export default Chart

