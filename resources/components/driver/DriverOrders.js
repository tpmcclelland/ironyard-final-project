import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Modal from 'react-modal'
import moment from 'moment'
import ActiveOrderItem from './DriverActiveOrderItem'
import AvailableOrderItem from './DriverAvailableOrderItem'

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : '2',
  },
  content : {
    top                   : '50%',
    left                  : '48%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxHeight             : '500px',
    minWidth              : '65%',
    maxWidth              : '95%'
  }
};

class DriverOrders extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        var heading = this.props.activeOrders?'Active Orders':'Available Orders'
        var anchor = this.props.activeOrders?'active-orders-anchor':'available-orders-anchor'
        this.state = {
          totalCostShown: false,
          detailsShown: false,
          activeOrders: this.props.activeOrders,
          heading: heading,
          anchor: anchor,
          locationSearchTerm: '',
          activeOrderSet: [],
          availableOrderSet: [],
          historyOrderSet: [],
          ingredients: [],
          driverId: '',
        }
    }
    componentDidMount() {
      var storage = JSON.parse(sessionStorage.getItem('user'))
      var user = storage.user
      var driver = storage.driver
      this.setState({
        driverId: driver.id
      })
      this.updateOrders()
    }
    updateOrders() {
      fetch('/api/v1/orders', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(this.handleOrders)
      // .then(function(response) {
      //     if(response.ok) {
      //         console.log(response)
      //     } else {
      //         throw 'Network response was not ok.'
      //     }
      // })
    }
    handleOrders(response) {
      console.log(response)
      response.forEach((res) => {
        if (res.state !== null) {
          if (res.driver_id == this.state.driverId) {
            if (res.state.type === 'active' || res.state.type === 'picked_up') {
              let updatedActiveOrderSet = this.state.activeOrderSet
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
              this.setState({
                activeOrderSet: updatedActiveOrderSet
              })
            } else {
              let updatedHistoryOrderSet = this.state.historyOrderSet
              updatedHistoryOrderSet.push({
                order: res,
                detailsShown: false,
                totalCostShown: false,
              })
              this.setState({
                historyOrderSet: updatedHistoryOrderSet
              })
            }
          } else if (res.state.type === 'available') {
            let updatedAvailableOrderSet = this.state.availableOrderSet
            updatedAvailableOrderSet.push({
              order: res,
              detailsShown: false,
              totalCostShown: false,
              accepted: false
            })
            this.setState({
              availableOrderSet: updatedAvailableOrderSet
            })
            console.log('state', this.state.availableOrderSet)
          }
        } else {
          console.log('none')
        }
      })
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
    delivered(currentIndex) {
      let updatedActiveOrderSet = this.state.activeOrderSet
      let item = updatedActiveOrderSet[currentIndex]
      if (item.delivered === false) {
        this.updateOrderState(item.order.id, "delivered")
      }
      item.delivered = true
      updatedActiveOrderSet.splice(currentIndex, 1)
      this.setState({
        activeOrderSet: updatedActiveOrderSet,
      })
    }
    accepted(currentIndex) {
      let updatedAvailableOrderSet = this.state.availableOrderSet
      let item = updatedAvailableOrderSet[currentIndex]
      if (item.accepted === false) {
        this.updateOrderState(item.order.id, "active")
      }
      item.accepted = true
      updatedAvailableOrderSet.splice(currentIndex, 1)
      let updatedActiveOrderSet = this.state.activeOrderSet
      updatedActiveOrderSet.push({
        order: item.order,
        detailsShown: false,
        totalCostShown: false,
        pickedUp: false,
        delivered: false,
      })
      this.setState({
        availableOrderSet: updatedAvailableOrderSet,
        activeOrderSet: updatedActiveOrderSet
      })
    }
    pickedUp(currentIndex) {
      let updatedActiveOrderSet = this.state.activeOrderSet
      let item = updatedActiveOrderSet[currentIndex]
      item.totalCostShown = !item.totalCostShown
      if (item.pickedUp === false) {
        this.updateOrderState(item.order.id, "picked_up")
      }
      item.pickedUp = true
      this.setState({
        activeOrderSet: updatedActiveOrderSet
      })
    }
    showDetails(currentIndex) {
      let updatedActiveOrderSet = this.state.activeOrderSet
      updatedActiveOrderSet[currentIndex].detailsShown = !updatedActiveOrderSet[currentIndex].detailsShown
      this.setState({
        activeOrderSet: updatedActiveOrderSet
      })
    }
    showAvailableDetails(currentIndex) {
      let updatedAvailableOrderSet = this.state.availableOrderSet
      updatedAvailableOrderSet[currentIndex].detailsShown = !updatedAvailableOrderSet[currentIndex].detailsShown
      this.setState({
        availableOrderSet: updatedAvailableOrderSet
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
      .then(response => response.json())
      .then(response => console.log(response))
    }
    updatePaymentAmountValue(e, currentIndex) {
      let updatedActiveOrderSet = this.state.activeOrderSet
      let item = updatedActiveOrderSet[currentIndex]
      item.paymentAmount = e.target.value
      this.setState({
        activeOrderSet: updatedActiveOrderSet
      })
    }
    submitTotalCost(currentIndex) {
      let updatedActiveOrderSet = this.state.activeOrderSet
      let item = updatedActiveOrderSet[currentIndex]
      console.log(item.paymentAmount)
      this.pickedUp(currentIndex)
      if (item.paymentAmount !== '') {
        this.updateOrderState(item.order.id, '', 'cost', item.paymentAmount)
      }
    }
    render() {
      var activeOrders = this.state.activeOrderSet.map((item, i) => {
        let startTime = moment(item.order.delivery_start_time).format('LT')
        let endTime = moment(item.order.delivery_end_time).format('LT')
        var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
              return <ul key={i}>
                <li>{item.ingredient.name}</li>
              </ul>
          })

        return <ActiveOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} showDetails={() => this.showDetails(i)} pickedUp={() => this.pickedUp(i)} delivered={() => this.delivered(i)} updatePaymentAmountValue={(e) => this.updatePaymentAmountValue(e, i)} submitTotalCost={() => this.submitTotalCost(i)}/>
        })

      var availableOrders = this.state.availableOrderSet.map((item, i) => {
        let startTime = moment(item.order.delivery_start_time).format('LT')
        let endTime = moment(item.order.delivery_end_time).format('LT')
        var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
              return <ul key={i}>
                <li>{item.ingredient.name}</li>
              </ul>
          })

        return <AvailableOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} showDetails={() => this.showAvailableDetails(i)} accepted={() => this.accepted(i)} />
        })

        return <div className="container">
          <div id={this.state.anchor} className="row anchor">
              <div className={this.state.activeOrders?'col-sm-4 col-sm-push-8 col-xs-12':'hidden'}>
                  <form className="navbar-form navbar-left" onSubmit={this.updateLocation}>
                      <div className="form-group">
                          <input type="text" className="form-control" placeholder="Update Location" value={this.state.locationSearchTerm} onChange={this.updateLocationSearchTerm} />
                      </div>
                      <button type="button" className="btn btn-default search-button" onClick={this.updateLocation}>Update</button>
                  </form>
              </div>
              <div className={this.state.activeOrders?'col-sm-8 col-sm-pull-4 col-xs-12':'col-sm-12'}>
                <h1>{this.state.heading}</h1>
              </div>

          </div>
            <div className="list-group container-fluid">
            {this.props.activeOrders?activeOrders:availableOrders}
            </div>
        </div>
    }
}

export default DriverOrders
