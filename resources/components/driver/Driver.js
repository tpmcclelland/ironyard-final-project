import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'

import DriverLayout from './DriverLayout'
import DriverMetrics from './DriverMetrics'
import DriverActiveOrders from './DriverActiveOrders'
import DriverAvailableOrders from './DriverAvailableOrders'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class Driver extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            driverId: ''
        }
    }
    componentDidMount() {
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var driver = storage.driver
        this.setState({
            driverId: driver.id,
            updateOrders: Date.now
        })
        this.updateOrders()
    }

    updateOrders(orders) {
        var ordersHaveChanged = (this.props.active !== orders || this.props.active.length == 0)
        if (ordersHaveChanged) {
            fetch('/api/v1/orders', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(this.handleOrders)
        }

        // .then(function(response) {
        //     if(response.ok) {
        //         console.(response)
        //     } else {
        //         throw 'Network response was not ok.'
        //     }
        // })
    }
    handleOrders(response) {
        response.forEach((res) => {
            if (res.state !== null) {
                if (res.driver_id == this.state.driverId) {
                    if (res.state.type == 'active' || res.state.type == 'picked_up') {
                        let updatedActiveOrderSet = this.props.active
                        if (res.state.type === 'picked_up') { var pickedUp = true }
                        else { var pickedUp = false }
                        if (res.total_cost !== null) { var amount = res.total_cost.toFixed(2)}
                        else { var amount = '' }
                        updatedActiveOrderSet.push({
                            order: res,
                            detailsShown: false,
                            totalCostShown: false,
                            pickedUp: pickedUp,
                            delivered: false,
                            paymentAmount: amount
                        })
                        store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
                    }
                } else if (res.state.type === 'available') {
                    let updatedAvailableOrderSet = this.props.available
                    updatedAvailableOrderSet.push({
                        order: res,
                        detailsShown: false,
                        totalCostShown: false,
                        accepted: false
                    })
                    store.dispatch({type: 'AVAILABLE', available: updatedAvailableOrderSet})
                }
            }
        })
        this.setState({
            ordersReady: true
        })
    }
    render() {
        if (!this.state.ordersReady) {
            return <DriverLayout>
            <div className="driver loading col-xs-12">
                <h1 className="heading">Preparing your orders</h1>
            </div>

            </DriverLayout>
        } else {
            return <div>
            <DriverLayout>
                {this.props.children}
            </DriverLayout>
            </div>
        }
        }
    }

    const mapStateToProps = function(store) {
        return {
            active: store.sharedOrder.active,
            available: store.sharedOrder.available,
            update: store.sharedOrder.update,
            component: store.sharedOrder.component

        }
    }

    export default connect(mapStateToProps)(Driver)
