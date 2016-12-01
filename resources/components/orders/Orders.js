import React, { Component } from 'react'

import OrderLayout from './OrderLayout'
import OrderStatus from './OrderStatus'

class Orders extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {

    }
    componentDidMount() {

    }

    render() {
        return <div>
            <OrderLayout>
                <div className="row full-screen red-background overflow-scroll push-down hidden-print">
                  <div id="active-orders" className="col-sm-11 col-sm-offset-1">
                    <OrderStatus />
                  </div>
                </div>
                <div className="row full-screen green-background overflow-scroll">
                  <div id="available-orders" className="col-sm-11 col-sm-offset-1">
                    {/* <AvailableOrders /> */}
                  </div>
                </div>
                <div className="row full-screen lightBlue-background overflow-scroll hidden-print">
                  <div id="driver-metrics" className="col-sm-11 col-sm-offset-1">
                    {/* <DriverMetrics /> */}
                  </div>
                </div>
            </OrderLayout>
        </div>
    }
}

export default Orders
