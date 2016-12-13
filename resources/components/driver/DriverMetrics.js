import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'

class DriverMetrics extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            averageRating: '',
            reviews: [],
            monthlyOrders: '',
            month: ''
        }
    }
    componentDidMount() {
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var driver = storage.driver
        fetch('/api/v1/drivers/' + driver.id, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              'content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(this.handleMetrics)
    }
    handleMetrics(response) {
        var month = moment().format('MMMM')
        var ordersThisMonth = []
        response.delivered_orders.forEach((order) => {
            if (moment(order.delivery_end_time).format('MMMM') === month) {
                ordersThisMonth.push(order)
            }
        })
        this.setState({
            averageRating: response.average_rating,
            reviews: response.reviews,
            monthlyOrders: ordersThisMonth.length,
            month: month
        })
    }
    render() {
        if (this.state.reviews.length < 1) {
            this.state.reviews.push('a')
            var reviews = this.state.reviews.map((item, i) => {
                return <h3 className="lead" key={i}>No customer reviews yet</h3>
            })
        } else {
            var reviews = this.state.reviews.map((item, i) => {
                if (this.state.reviews.length == 1 && item == "") {
                    return <h3 className="lead" key={i}>No customer reviews yet</h3>
                }
                if (item !== "") {
                    return <blockquote key={i} className={i%2 == 0?'text-left blockquote':'blockquote-reverse'}>
                        <p>{item}</p>
                    </blockquote>
                }
            })
        }

        var width = (this.state.averageRating / 5) * 100 + '%'
            return <div className="driver col-xs-12 metrics">
                <h1 className="heading">Metrics</h1>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-6 text-center">
                        <div className="metrics">
                        <div className="monthly-orders panel panel-default metrics-data date">
                            <div className="month">
                                <h3>{this.state.month}</h3>
                            </div>
                            <h1 className="month-number">{this.state.monthlyOrders}
                            <p className="lead">orders delivered <br/> this month</p>
                            </h1>
                        </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-6 text-center">
                        <div className="metrics">
                        <div className="row stars">
                        <div className="star-ratings-css">
                        <div className="star-ratings-css-top" style={{"width" : width}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                        <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                        <div className="ratings text-center">
                            <div className="col-xs-7">
                            <p className="lead text-left rating">average rating</p>
                            </div>
                            <div className="col-xs-5">
                            <p className="text-right lead">{this.state.averageRating} out of 5</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="metrics-data">
                                {reviews}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        }
}

export default DriverMetrics
