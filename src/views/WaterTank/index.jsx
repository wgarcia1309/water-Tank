import { Bar } from 'react-chartjs-2';


export default function WaterTank({currentValue,min,max,hg,low}){
    
const state = {
    labels: ['Water level'],
    datasets: [{
        label: 'Current Water level',
        data: [currentValue],
        backgroundColor: [
            currentValue>=hg? 'rgba(255, 99, 132, 0.2)':currentValue<=low? 'rgba(255, 206, 86, 0.6)':'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
            currentValue>=hg? 'rgba(255, 99, 132, 1)':currentValue<=low? 'rgba(255, 206, 86, 1)':'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
    }],
}

var options={
    scales: {
        yAxes: [{
                min: 0,
                max: 10
        }]
    }
}
options= {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                min:min,
                max:max
            }
        }]
    }
}
    return (
    <>
    <Bar data={state} options={options} />
        </>
    );
}