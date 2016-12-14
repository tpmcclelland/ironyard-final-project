import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'
import ActiveOrderItem from './DriverActiveOrderItem'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class DriverActiveOrder extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
          totalCostShown: false,
          detailsShown: false,
          deliveryShown: false,
          locationSearchTerm: '',
          activeOrderSet: [],
          toggle: false,
          driverId: ''
        }
    }
    componentDidMount() {
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var driver = storage.driver
        this.setState({
            driverId: driver.id
        })
        // this.initMap()
    }
    updateLocation(e) {
      e.preventDefault()
      alert('Updating location to ' + this.state.locationSearchTerm)
      this.setState({
        locationSearchTerm: ''
      })
    }
    updateLocationSearchTerm(e) {
      this.setState({
        locationSearchTerm: e.target.value
      })
    }
    showDetails(currentIndex) {
      let updatedActiveOrderSet = this.props.active
      updatedActiveOrderSet[currentIndex].detailsShown = !updatedActiveOrderSet[currentIndex].detailsShown
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
      this.setState({
          toggle: !this.state.toggle
      })
    }
    pickedUp(currentIndex) {
      let updatedActiveOrderSet = this.props.active
      let item = updatedActiveOrderSet[currentIndex]
      item.totalCostShown = !item.totalCostShown
      this.setState({
          toggle: !this.state.toggle
      })
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
    }
    showDelivery(currentIndex) {
        let updatedActiveOrderSet = this.props.active
        updatedActiveOrderSet[currentIndex].deliveryShown = !updatedActiveOrderSet[currentIndex].deliveryShown
        store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
        this.setState({
            toggle: !this.state.toggle
        })
    }
    delivered(currentIndex) {
      let updatedActiveOrderSet = this.props.active
      let item = updatedActiveOrderSet[currentIndex]
      if (item.delivered === false) {
        this.updateOrderState(item.order.id, "delivered")
      }
      item.delivered = true
      updatedActiveOrderSet.splice(currentIndex, 1)
      this.setState({
          toggle: !this.state.toggle
      })
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
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
      .then(response => response.json())
      .then(response => console.log(response))
    }
    updatePaymentAmountValue(e, currentIndex) {
      let updatedActiveOrderSet = this.props.active
      let item = updatedActiveOrderSet[currentIndex]
      item.paymentAmount = e.target.value
      this.setState({
          toggle: !this.state.toggle
      })
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
    }
    submitTotalCost(currentIndex) {
      let updatedActiveOrderSet = this.props.active
      let item = updatedActiveOrderSet[currentIndex]
      if (item.paymentAmount !== '' && item.pickedUp === false) {
        this.updateOrderState(item.order.id, 'picked_up', 'cost', item.paymentAmount)
        item.pickedUp = true
        item.totalCostShown = !item.totalCostShown
      }
      this.setState({
          toggle: !this.state.toggle
      })
    }

  // initMap() {
  //   var uluru = {lat: -25.363, lng: 131.044};
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: uluru
  //   });
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map
  //   });
// }
    render() {
      var orders = this.props.active.map((item, i) => {
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

        return <ActiveOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} latitude={latitude} longitude={longitude} orderID={orderID} showDetails={() => this.showDetails(i)} pickedUp={() => this.pickedUp(i)} delivered={() => this.delivered(i)} updatePaymentAmountValue={(e) => this.updatePaymentAmountValue(e, i)} submitTotalCost={() => this.submitTotalCost(i)} showDelivery={() => this.showDelivery(i)}/>
      })
      return <ReactCSSTransitionGroup
        transitionName="component"
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnter={false}
        transitionEnterTimeout={2000}
        transitionLeave={false}>
        <div className="driver col-xs-12 active">
        <div className="row">
            {/* <div className='col-sm-4 col-sm-push-8 col-xs-12'>
                <form className="navbar-form navbar-left" onSubmit={this.updateLocation}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Update Location" value={this.state.locationSearchTerm} onChange={this.updateLocationSearchTerm} />
                    </div>
                    <button type="button" className="btn btn-default search-button" onClick={this.updateLocation}>Update</button>
                </form>
            </div> */}
            <div className='col-xs-12'>
              <h1 className="heading">Active Orders</h1>
            </div>
        </div>
          <div className="list-group">
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
    update: store.sharedOrder.update,
    component: store.sharedOrder.component
  }
}

export default connect(mapStateToProps)(DriverActiveOrder)
