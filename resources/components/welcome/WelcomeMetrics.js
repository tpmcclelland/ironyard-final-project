import React from 'react'
// import LineChart, {line} from 'react-chartjs'
var LineChart = require("react-chartjs").Line;

class WelcomeMetrics extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
    var chartData = {
        datasets: [{
                    label: 'Scatter Dataset',
                    data: [
                        {x: -20, y: 0},
                        {x: 0, y: 10},
                        {x: 10, y: 5}
                    ]
                }]
    }

    var chartOptions = {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }

        return <div>
            <h1>Our Metrics</h1>
            {/* <LineChart data={chartData} options={chartOptions} width="600" height="250"/> */}
        </div>
    }
}

export default WelcomeMetrics
