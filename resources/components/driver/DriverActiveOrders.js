import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'
import ActiveOrderItem from './DriverActiveOrderItem'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class DriverActiveOrder extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
          totalCostShown: false,
          detailsShown: false,
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
      if (item.pickedUp === false) {
        this.updateOrderState(item.order.id, "picked_up")
      }
      item.pickedUp = true
      this.setState({
          toggle: !this.state.toggle
      })
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
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
      console.log(item.paymentAmount)
      item.paymentAmount = e.target.value
      store.dispatch({type: 'ACTIVE', active: updatedActiveOrderSet})
    }
    submitTotalCost(currentIndex) {
      let updatedActiveOrderSet = this.props.active
      let item = updatedActiveOrderSet[currentIndex]
      this.pickedUp(currentIndex)
      if (item.paymentAmount !== '') {
        this.updateOrderState(item.order.id, '', 'cost', item.paymentAmount)
      }
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
        var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
          return <ul key={i}>
          <li>{item.ingredient.name}</li>
          </ul>
        })

        return <ActiveOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} showDetails={() => this.showDetails(i)} pickedUp={() => this.pickedUp(i)} delivered={() => this.delivered(i)} updatePaymentAmountValue={(e) => this.updatePaymentAmountValue(e, i)} submitTotalCost={() => this.submitTotalCost(i)}/>
      })
      return <div className="container">
        <div id="active-orders-anchor" className="row anchor">
            <div className='col-sm-4 col-sm-push-8 col-xs-12'>
                <form className="navbar-form navbar-left" onSubmit={this.updateLocation}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Update Location" value={this.state.locationSearchTerm} onChange={this.updateLocationSearchTerm} />
                    </div>
                    <button type="button" className="btn btn-default search-button" onClick={this.updateLocation}>Update</button>
                </form>
            </div>
            <div className='col-sm-8 col-sm-pull-4 col-xs-12'>
              <h1>Active Orders</h1>
            </div>

        </div>
          <div className="list-group container-fluid">
          {orders}
          </div>
      </div>
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
