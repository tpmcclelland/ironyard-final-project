import React from 'react'
// import LineChart, {line} from 'react-chartjs'
var LineChart = require("react-chartjs").Line;
var DoughnutChart = require("react-chartjs").Doughnut;


class WelcomeMetrics extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
                    label: "Total Orders by Month",
                    fill: false,
                    lineTension: 0.1,
                    fillColor: "rgba(7, 160, 195, 0.4)",
                    strokeColor: "rgba(8, 103, 136, 1)",
                    pointColor: "rgba(8, 103, 136, 1)",
                    pointHighlightFill: "rgba(142, 166, 4, 1)",
                    pointHighlightStroke: "rgba(142, 166, 4, 1)",
                    data: [20, 34, 50, 80, 72, 90, 110],
                }],
    }

    var doughnutChartData = [
        {
            color: 'rgba(240, 200, 8, 0.8)',
            highlight: 'rgba(240, 200, 8, 1)',
            label: 'Cookers',
            value: 68
        },
        {
            color: 'rgba(142, 166, 4, 0.8)',
            highlight: 'rgba(142, 166, 4, 1)',
            label: 'Drivers',
            value: 32
        }
    ]

        return <div className="container-fluid">
            <h1>Our Metrics</h1>
            <div className="row">
                <div className="col-sm-6 col-xs-12 text-center">
                    <h2>Total Orders By Month</h2>
                    <LineChart className="chart" data={lineChartData} height="300" width="350"/>
                </div>
                <div className="col-sm-6 col-xs-12 text-center">
                <h2>Users</h2>
                <DoughnutChart className="chart" data={doughnutChartData} height="300" width="350"/>
                </div>
            </div>
        </div>
    }
}

export default WelcomeMetrics
