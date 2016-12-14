import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import {browserHistory} from 'react-router'
import moment from 'moment'
import AvailableOrderItem from './DriverAvailableOrderItem'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class DriverAvailableOrders extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
          detailsShown: false,
          toggle: false,
          driverId: '',
          triggerUpdate: props.update
        }
    }
    componentDidMount() {
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var driver = storage.driver
        this.setState({
            driverId: driver.id
        })
    }

    accepted(currentIndex) {
      let updatedAvailableOrderSet = this.props.available
      let item = updatedAvailableOrderSet[currentIndex]
      if (item.accepted === false) {
        this.updateOrderState(item.order.id, "active")
      }
      item.accepted = true
      updatedAvailableOrderSet.splice(currentIndex, 1)
      let updatedActiveOrderSet = this.props.active
      updatedActiveOrderSet.push({
        order: item.order,
        detailsShown: false,
        totalCostShown: false,
        pickedUp: false,
        delivered: false,
      })
    //   console.log('active', this.props.active)
      //
    //   console.log('updated', updatedActiveOrderSet)

      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
      store.dispatch({type: 'AVAILABLE', available: updatedAvailableOrderSet})
      this.setState({
          toggle: !this.state.toggle
      })
    }
    showAvailableDetails(currentIndex) {
      let updatedAvailableOrderSet = this.props.available
      updatedAvailableOrderSet[currentIndex].detailsShown = !updatedAvailableOrderSet[currentIndex].detailsShown
      store.dispatch({type: 'AVAILABLE', available: updatedAvailableOrderSet})
      this.setState({
          toggle: !this.state.toggle
      })
    }
    updateOrderState(orderId, state, type = 'state', cost = 0) {
      fetch('/api/v1/orders/' + orderId, {
        method: 'PATCH',
        credentials: 'same-origin',
        body: JSON.stringify({
          state: state,
          driver_id: this.state.driverId,
          type: type,
          total_cost: cost
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }


    render() {
        var orders = this.props.available.map((item, i) => {
            console.log(item.detailsShown)
          let startTime = moment(item.order.delivery_start_time).format('LT')
          let endTime = moment(item.order.delivery_end_time).format('LT')
          let latitude = item.order.shoppingList.cooker.home_lat
          let longitude = item.order.shoppingList.cooker.home_long
          let orderID = item.order.id
          var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
                return <ul key={i}>
                  <li>{item.ingredient.name}</li>
                </ul>
            })

          return <AvailableOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} latitude={latitude} longitude={longitude} orderID={orderID} showDetails={() => this.showAvailableDetails(i)} accepted={() => this.accepted(i)} />
          })
      return <ReactCSSTransitionGroup
        transitionName="component"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionEnterTimeout={2000}
        transitionLeave={false}>
        <div className="driver col-xs-12 available">
        <div className="row">
            <div className='col-xs-12'>
              <h1 className="heading">Available Orders</h1>
            </div>
        </div>
          <div className="list-group container-fluid">
            <ReactCSSTransitionGroup
              transitionName="list"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {orders}
            </ReactCSSTransitionGroup>

          </div>
      </div>
      </ReactCSSTransitionGroup>
    }
}

const mapStateToProps = function(store) {
  return {
    active: store.sharedOrder.active,
    available: store.sharedOrder.available,
    update: store.sharedOrder.update
  }
}

export default connect(mapStateToProps)(DriverAvailableOrders)
