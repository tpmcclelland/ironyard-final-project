import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'
import ActiveOrderItem from './DriverActiveOrderItem'
import AvailableOrderItem from './DriverAvailableOrderItem'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class DriverOrders extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
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
    }




    render() {
      // var activeOrders = this.props.dataActive.map((item, i) => {
      //   let startTime = moment(item.order.delivery_start_time).format('LT')
      //   let endTime = moment(item.order.delivery_end_time).format('LT')
      //   var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
      //         return <ul key={i}>
      //           <li>{item.ingredient.name}</li>
      //         </ul>
      //     })
      //
      //   return <ActiveOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} showDetails={() => this.showDetails(i)} pickedUp={() => this.pickedUp(i)} delivered={() => this.delivered(i)} updatePaymentAmountValue={(e) => this.updatePaymentAmountValue(e, i)} submitTotalCost={() => this.submitTotalCost(i)}/>
      //   })

      // var availableOrders = this.props.dataAvailable.map((item, i) => {
      //   let startTime = moment(item.order.delivery_start_time).format('LT')
      //   let endTime = moment(item.order.delivery_end_time).format('LT')
      //   var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
      //         return <ul key={i}>
      //           <li>{item.ingredient.name}</li>
      //         </ul>
      //     })
      //
      //   return <AvailableOrderItem data={item} startTime={startTime} endTime={endTime} ingredients={ingredients} key={i} showDetails={() => this.showAvailableDetails(i)} accepted={() => this.accepted(i)} message={this.props.update} />
      //   })

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
            {/* {this.props.activeOrders?activeOrders:availableOrders} */}
            </div>
        </div>
    }
}

const mapStateToProps = function(store) {
  return {
    active: store.sharedOrder.active,
    available: store.sharedOrder.available,
    update: store.sharedOrder.update
  }
}

export default connect(mapStateToProps)(DriverOrders)
