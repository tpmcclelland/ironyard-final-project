import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Modal from 'react-modal'
import update from 'react-addons-update'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

import OrderStatusDetail from './OrderStatusDetail'

// Details Modal Style
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
    maxWidth              : '95%'
  }
};

// Review Modal Style
const reviewStyles = {
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
    maxHeight             : '800px',
    maxWidth              : '95%'
  }
};

class OrderStatus extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)
    this.state = {
      orders: [],
      tempModalObject: [],
    //   orders: [{
    //     orderID: 1000,
    //     scheduleStart: "12:00pm",
    //     scheduleEnd: "5:00pm",
    //     orderState: "Available",
    //   },
    //   {
    //     orderID: 611,
    //     scheduleStart: "11:00am",
    //     scheduleEnd: "2:00pm",
    //     orderState: "Delivered",
    //   }
    // ],
    modalIsOpen: false,
    reviewModalIsOpen: false,
    orderState: "Active",
    toggle: false
  }
}

componentDidMount() {
    fetch('/api/v1/orders', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(this.handleOrders)
}
handleOrders(response) {
  var storage = JSON.parse(sessionStorage.getItem('user'))
  var userId = storage.user.id
  response.forEach((res) => {
      if (res.shoppingList.cooker.user.id === userId) {
        let updatedOrders = this.state.orders
        updatedOrders.push({
          order: res,
          state: res.state.type,
          detailsShown: false,
          reviewShown: false
        })
        this.setState({
          orders: updatedOrders
        })
      }
  })
}
showDetails(currentIndex) {
  let updatedOrders = this.state.orders
  updatedOrders[currentIndex].detailsShown = !updatedOrders[currentIndex].detailsShown
  this.setState({
    orders: updatedOrders
  })
  this.setState({
    toggle: !this.state.toggle
  })
}
showReview(currentIndex) {
  let updatedOrders = this.state.orders
  updatedOrders[currentIndex].reviewShown = !updatedOrders[currentIndex].reviewShown
  this.setState({
    orders: updatedOrders
  })
  this.setState({
    toggle: !this.state.toggle
  })
}

// Details Modal
  sendModalData(i) {
// console.log(i)
    console.log("sendModalData:", this.state.orders[i])
    this.setState({
      tempModalObject: this.state.orders[i]
    })
  }
openModal() {
  this.setState({
    modalIsOpen: true
  })
}
closeModal() {
  this.setState({
    modalIsOpen: false
  })
}

// Review Modal
openReviewModal() {
  this.setState({
    reviewModalIsOpen: true
  })
}
closeReviewModal() {
  this.setState({
    reviewModalIsOpen: false
  })
}
  tempFiller(item) {

  }

  cancel() {
    console.log("testing")
    console.log("tempModalObject:", this.state.tempModalObject.id)
    fetch('/api/v1/orders/' + this.state.tempModalObject.id, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify({
        state: "cancelled",

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  gatherPrice() {
    if (this.state.tempModalObject.shoppingList !== null) {
      if (this.state.tempModalObject.total_cost === null) {
        return <div className="input-group">
          <div className="input-group-addon">Estimated Price</div>
          <input type="text" className="form-control" id="exampleInputAmount" placeholder="Amount" value={this.state.tempModalObject.shoppingList.estimated_price} readOnly/>
        </div>
      }
      else {
        return <div className="input-group">
          <div className="input-group-addon">Final Price</div>
          <input type="text" className="form-control" id="exampleInputAmount" placeholder="Amount" value={this.state.tempModalObject.total_cost} readOnly/>
        </div>
      }
    }
  }

  gatherDriverPhone() {
    if (this.state.tempModalObject.driver !== null){
      if (this.state.tempModalObject.driver_id && this.state.tempModalObject.driver_id != 'undefined') {
        return <p>Phone Number: {this.state.tempModalObject.driver.user.phone}</p>
      }
    }
  }

  gatherDriverName() {
    if (this.state.tempModalObject.driver !== null){
      if (this.state.tempModalObject.driver_id && this.state.tempModalObject.driver_id != 'undefined') {
        return <p>Driver Name: {this.state.tempModalObject.driver.user.first_name + " " + this.state.tempModalObject.driver.user.last_name}</p>
      }
    }
  }
  showCancelButton() {
    if (this.state.tempModalObject.state_id == "4") {
      return <button type="button" onClick={this.cancel} className="btn btn-default btn-block">Cancel Order</button>
    }
  }

  showReviewButton() {
    if (this.state.tempModalObject.state_id == "2") {
      return <button type="button" className="btn btn-default btn-block" onClick={this.openReviewModal}>Review Driver
      </button>

    }
  }
render() {
    const userOrders = this.state.orders.map((item, i) => {
      console.log(item.state)
      if (item.order.state_id !== null) {
        var orderDate = moment(item.order.updated_at).format('dddd, MMMM Do - h:mm A')
        var cost = item.order.shoppingList.estimated_price
        var totalCost = cost + 5
        if (item.order.driver !== null) {
          var driver = item.order.driver.user.first_name + " " +  item.order.driver.user.last_name
          var phone = item.order.driver.user.phone
        }
        var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
          return <ul key={i}>
            <li>{item.ingredient.name}</li>
          </ul>
        })
        if (item.order.state.type == 'available') {
          var status = 'placed'
        } else if (item.order.state.type == 'active') {
          var status = 'in progress'
        } else if (item.order.state.type == 'picked_up') {
          var status = 'out for delivery'
        } else {
          var status = item.order.state.type
        }
        var classes = 'col-xs-12 order-heading status '
        switch (status) {
          case 'placed':
            var statusClass = classes + 'placed'
            break;
          case 'in progress':
            var statusClass = classes + 'in-progress'
            break;
          case 'out for delivery':
            var statusClass = classes + 'picked_up'
            break;
          case 'delivered':
            var statusClass = classes + 'delivered'
            break;
          case 'cancelled':
            var statusClass = classes + 'cancelled'
            break;
        }
        return <div key={i} className="cookerOrders">
          <div className="list-group-item row order-heading">
              <div className={statusClass}>
                <div className="row">
                  <div className="col-xs-5">
                    <h3 className="list-group-item-heading">{status}</h3>
                  </div>
                  <div className="col-xs-7 text-right">
                    <h3 className="list-group-item-heading order">Placed on {orderDate}</h3>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-9">
                <p className="list-group-item-text">Delivery requested between <span> {moment(item.order.delivery_start_time).format('h:mm a')} and {moment(item.order.delivery_end_time).format('h:mm a')}</span></p>
              </div>
                <div className="col-xs-12 col-sm-3">
                  <button type="button" className="btn btn-default btn-block" onClick={() => this.showDetails(i)}>Details
                  </button>
                </div>
                <div className={item.detailsShown?'col-xs-12 order-details well':'hidden'}>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <p className="lead">Total Cost</p>
                      <p>Ingredient Cost: ${cost}</p>
                      <p>Delivery Fee: $5.00</p>
                      <p>Total Cost: ${totalCost}</p>
                      <div className={item.state == 'available'?'hidden':'driver-details'}>
                        <p className="lead">Driver</p>
                        <p className="capitalize">{driver} - {phone}</p>
                        <div className="text-center">
                          <button type="button" className={item.state == 'delivered'?'btn btn-default':'hidden'} onClick={() => this.showReview(i)}>Review Driver</button>
                        </div>
                        <div className={item.reviewShown?'':'hidden'}>
                          <div className="form-group">
                              <label htmlFor="rateDriver">Rate your driver</label>
                              <select name="rateDriver" id="rateDriver" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="driverReviewComment">Say something:</label>
                            <textarea className="form-control" name="driverReviewComment" id="driverReviewComment"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p className="lead">Ingredients</p>
                      {ingredients}
                    </div>
                    <div className={item.state == 'available'?'col-xs-12 text-right':'hidden'}>
                      <button type="button" className="btn btn-danger">Cancel Order</button>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      }
    })

  return <div className="orderStatus col-xs-12">
    <h1 className="heading">Order Status</h1>
    {this.props.paymentSuccess? <div className="alert alert-success" role="alert">You've completed your order</div>: ''}
    <div className="list-group container-fluid">
      {userOrders}
    </div>

    {/* Being Modal */}
    <div className="container">
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Active Order Modal"
        >
          <div className="row">
            <div className="col-xs-10">
              <h2>Order ID: {this.state.tempModalObject.id}</h2>
            </div>
            <div className="col-xs-2 text-right">
              <button className="btn btn-default" onClick={this.closeModal}>X</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>From {moment(this.state.tempModalObject.delivery_start_time).format('h:mm:ss a')} to {moment(this.state.tempModalObject.delivery_end_time).format('h:mm:ss a')}</p>
              {this.gatherDriverName()}
              {this.gatherDriverPhone()}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <form className="form-inline">
                <div className="form-group">
                  <label className="sr-only" htmlFor="exampleInputAmount">Amount (in dollars)</label>
                  {this.gatherPrice()}
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <br/>
            <div className="col-xs-6 col-xs-offset-6">
              {this.showCancelButton()}
              {this.showReviewButton()}
            </div>
          </div>
        </Modal>
      </div>

      {/* Driver Review Modal */}
      <div className="container">
        <Modal
          isOpen={this.state.reviewModalIsOpen}
          onRequestClose={this.closeReviewModal}
          style={reviewStyles}
          contentLabel="Active Order Modal"
          >
            <div className="row">
              <div className="col-xs-10">
                <h2>Order ID: 1233</h2>
              </div>
              <div className="col-xs-2 text-right">
                <button className="btn btn-default" onClick={this.closeReviewModal}>X</button>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p>Driver Name</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <form className="form-inline">
                  <div className="form-group">
                    <label htmlFor="rateDriver">Rate your driver</label>
                    <select name="rateDriver" id="rateDriver">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <br/>
              <div className="col-xs-12">
                <label htmlFor="driverReviewComment">Say something:</label>
                <input type="text" className="form-control input-lg" name="driverReviewComment" id="driverReviewComment" />
              </div>
            </div>
          </Modal>
        </div>
        {/* End Modal */}
      </div>
    }
  }

const mapStateToProps = function(store) {
  return {
    paymentSuccess: store.sharedList.paymentSuccess

  }
}

export default connect(mapStateToProps)(OrderStatus)
