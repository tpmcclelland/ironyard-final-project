import React from 'react'

import DriverLayout from './DriverLayout'
import ActiveOrders from './ActiveOrders'
import AvailableOrders from './AvailableOrders'
import DriverMetrics from './DriverMetrics'

class Driver extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <div>
            <DriverLayout>
                <div className="row full-screen red-background overflow-scroll push-down hidden-print">
                  <div id="active-orders" className="col-sm-11 col-sm-offset-1">
                    <ActiveOrders />
                  </div>
                </div>
                <div className="row full-screen green-background overflow-scroll">
                  <div id="available-orders" className="col-sm-11 col-sm-offset-1">
                    <AvailableOrders />
                  </div>
                </div>
                <div className="row full-screen lightBlue-background overflow-scroll hidden-print">
                  <div id="driver-metrics" className="col-sm-11 col-sm-offset-1">
                    <DriverMetrics />
                  </div>
                </div>
            </DriverLayout>
        </div>
    }
}

export default Driver