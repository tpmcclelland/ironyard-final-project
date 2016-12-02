import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;
var DoughnutChart = require("react-chartjs").Doughnut;

class DriverMetrics extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

    }
    render() {
        var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
            datasets: [{
                        label: "Total Orders by Month",
                        fillColor: [
                            "rgba(240, 200, 8, 1)",
                            "rgba(142, 166, 4, 1)",
                            "rgba(240, 200, 8,1)",
                            "rgba(142, 166, 4, 1)",
                            "rgba(240, 200, 8, 1)",
                            "rgba(142, 166, 4, 1)",
                            "rgba(240, 200, 8, 1)",
                            "rgba(142, 166, 4, 1)"
                        ],
                        strokeColor: "rgba(8, 103, 136, 1)",
                        pointColor: "rgba(8, 103, 136, 1)",
                        pointHighlightFill: "rgba(142, 166, 4, 1)",
                        pointHighlightStroke: "rgba(142, 166, 4, 1)",
                        data: [20, 34, 50, 80, 72, 90, 110, 150],
                    }],
        }

            return <div className="container-fluid">
                <h1 id="metrics-anchor" className="anchor">Metrics</h1>
                <div className="row">
                    <div className="col-sm-6 col-xs-12 text-center">
                        <div className="metrics">
                            <h2>Total Orders By Month</h2>
                            <div className="metrics-data">
                            <BarChart data={barChartData} height="300" width="300"/>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12 text-center">
                        <div className="metrics">
                        <h2>Total Orders this Month</h2>
                        <div className="monthly-orders panel panel-default metrics-data date">
                            <div className="month">
                                <h3>December</h3>
                            </div>
                            <h1 className="month-number">15</h1>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        }
}

export default DriverMetrics
