import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import update from 'react-addons-update'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class OrderStatus extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)
    this.state = {
      orders: [],
      toggle: false,
      ordersReady: false,
      displayPaymentSuccess: false
  }
}

  componentDidMount() {

    if (this.props.paymentSuccess) {
      this.setState({
        displayPaymentSuccess: true
      })

      var alert = setTimeout(() => {
        this.setState({displayPaymentSuccess: false})
        this.subscribeToUpdatedState()
        this.fetchOrders()
      }, 3000)
    } else {
      this.setState({
        displayPaymentSuccess: false
      })
      this.subscribeToUpdatedState()
      this.fetchOrders()
    }

  }

  fetchOrders() {
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

  subscribeToUpdatedState() {
    var storage = JSON.parse(sessionStorage.getItem('user'))
    var cookerId = storage.cooker.id

    var pusher = new Pusher('0233f61567581ef06f8b', {
      encrypted: true
    })

    //need to change this to use the cooker channel
    var pusherChannel = pusher.subscribe('cooker_' + cookerId)

    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

     pusherChannel.bind('state_change', (data) => {
      console.log('pusher', data)
       this.setState({
         orderReady: false,
         orders: []
       })
       this.fetchOrders()
    })
  }

  handleOrders(response) {

    var storage = JSON.parse(sessionStorage.getItem('user'))
    var userId = storage.user.id
    if (response.state_id !== null) {
      let updatedOrders = this.state.orders
      response.forEach((res) => {
          if (res.shoppingList.cooker.user.id === userId) {
            if (res.review !== null) {
              var review = res.review.review
              var reviewTime = res.review.created_at
            } else {
              var review = ''
            }
            if (res.driver !== null && res.driver.ratings !== null) {
              var ratings = res.driver.ratings
            } else {
              var ratings = undefined
            }
            if (ratings !== undefined) {
              var ratingArray = []
              ratings.forEach((rating, i) => {
                if (rating.created_at === reviewTime) {
                  ratingArray.push(rating.rating)
                }
              })
            }
            if (ratingArray !== undefined && ratingArray.length !== 0) {
              var orderRating = ratingArray[0]
              var reviewShown = true
              var disable = true
            } else {
              var orderRating = 'default'
              var reviewShown = false
              var disable = false
            }
              updatedOrders.push({
                order: res,
                state: res.state.type,
                detailsShown: false,
                reviewShown: reviewShown,
                rating: orderRating,
                review: review,
                disable: disable
              })
            }
            this.setState({
              orders: updatedOrders,
              ordersReady: true,
              displayPaymentSuccess: false
            })
          })
      }
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

  cancel(currentIndex) {
    let updatedOrders = this.state.orders
    let order_id = updatedOrders[currentIndex].order.id
    updatedOrders[currentIndex].detailsShown = !updatedOrders[currentIndex].detailsShown
    updatedOrders[currentIndex].state = 'cancelled'
    fetch('/api/v1/orders/' + order_id, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify({
        state: "cancelled",
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => (
      this.setState({
        orders: updatedOrders
      })
    ))
  }
  updateRating(e, currentIndex) {
    let updatedOrders = this.state.orders
    updatedOrders[currentIndex].rating = e.target.value
    this.setState({
      orders: updatedOrders
    })
  }
  updateReview(e, currentIndex) {
    let updatedOrders = this.state.orders
    updatedOrders[currentIndex].review = e.target.value
    this.setState({
      orders: updatedOrders
    })
  }

  submitReview(currentIndex) {
    let updatedOrders = this.state.orders
    let orderId = updatedOrders[currentIndex].order.id
    let driverId = updatedOrders[currentIndex].order.driver_id
    let rating = updatedOrders[currentIndex].rating
    let review = updatedOrders[currentIndex].review
    fetch('/api/v1/reviews', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        order_id: orderId,
        rating: rating,
        review: review,
        driver_id: driverId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => (
      updatedOrders[currentIndex].rating = response.rating,
      updatedOrders[currentIndex].review = response.review,
      updatedOrders[currentIndex].disable = true,
      this.setState({
        orders: updatedOrders
      })
    ))
  }

render() {
    const userOrders = this.state.orders.map((item, i) => {
        var orderID = item.order.id
        var orderDate = moment(item.order.updated_at).format('dddd, MMMM Do - h:mm A')
        var cost = item.order.shoppingList.estimated_price - 5
        var driverSubmittedCost = Number(item.order.total_cost)
        var totalCost = cost + 5.00
        var totalSubmittedCost = driverSubmittedCost + 5.00
        cost = Number(cost).toFixed(2)
        driverSubmittedCost = Number(driverSubmittedCost).toFixed(2)
        totalCost = Number(totalCost).toFixed(2)
        totalSubmittedCost = Number(totalSubmittedCost).toFixed(2)
        if (item.order.driver !== null) {
          var driver = item.order.driver.user.first_name + " " +  item.order.driver.user.last_name
          var phone = item.order.driver.user.phone
        }
        var ingredients = item.order.shoppingList.recipeIngredients.map((item, i) => {
          return <ul key={i}>
            <li>{item.ingredient.name}</li>
          </ul>
        })
        if (item.state == 'available') {
          var status = 'placed'
        } else if (item.state == 'active') {
          var status = 'in progress'
        } else if (item.state == 'picked_up') {
          var status = 'out for delivery'
        } else {
          var status = item.state
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
                      <p className="lead">Order ID: {orderID}</p>
                      <p className="lead">Total Cost</p>
                      <p>Ingredient Cost: ${(item.state == 'picked_up'||item.state == 'delivered')&&driverSubmittedCost!=='0.00'?driverSubmittedCost:cost}</p>
                      <p>Delivery Fee: $5.00</p>
                      <p>Total Cost: ${(item.state == 'picked_up'||item.state == 'delivered')&&driverSubmittedCost!=='0.00'?totalSubmittedCost:totalCost}</p>
                      <div className={item.state == 'available'?'hidden':'driver-details'}>
                        <p className="lead">Driver</p>
                        <p className="capitalize">{driver} - {phone}</p>
                        <div className="text-center">
                          <button type="button" className={item.disable?'btn review-complete':item.state == 'delivered'?'btn btn-default review-button':'hidden'} onClick={() => this.showReview(i)} disabled={item.disable?true:false}>{item.disable?'Review Complete':'Review Driver'}</button>
                        </div>
                        <div className={item.reviewShown?'':'hidden'}>
                          <div className="form-group">
                              <label htmlFor="rateDriver">Rate your driver:</label>
                              <select name="rateDriver" id="rateDriver" className="form-control" defaultValue={item.rating} onChange={(e) => this.updateRating(e, i)} disabled={item.disable?true:false}>
                                <option value="default">Select a rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="driverReviewComment">Say something:</label>
                            <textarea className="form-control" name="driverReviewComment" id="driverReviewComment" onChange={(e) => this.updateReview(e, i)} value={item.review} disabled={item.disable?true:false}></textarea>
                          </div>
                          <div className="form-group">
                            <button type="button" className={item.disable?'hidden':'btn btn-default btn-block'} onClick={() => this.submitReview(i)}>Submit</button>
                          </div>
                        </div>
                      </div>
                      <div className={item.state == 'available'?'col-xs-12 text-center cancel-button':'hidden'}>
                        <button type="button" className="btn btn-danger" onClick={() => this.cancel(i)}>Cancel Order</button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p className="lead">Ingredients</p>
                      {ingredients}
                    </div>
                  </div>
                </div>
          </div>
        </div>
    })

  return <ReactCSSTransitionGroup
    transitionName="component"
    transitionAppear={true}
    transitionAppearTimeout={2000}
    transitionEnter={true}
    transitionEnterTimeout={2000}
    transitionLeave={false}>
    <div className="orderStatus col-xs-12">
    <div className={this.state.displayPaymentSuccess? 'alert alert-success': 'hidden'} role="alert">
      <h3>You've completed your order</h3>
    </div>
    <div className={!this.state.ordersReady && !this.state.displayPaymentSuccess? 'container': 'hidden'}>
      <h1 className="heading">Preparing your orders</h1>
      <span className="fa fa-refresh fa-spin fa-5x fa-fw"></span>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={this.state.ordersReady?'list-group container-fluid':'hidden'}>
      <h1 className="heading">Order Status</h1>
      <ReactCSSTransitionGroup
        transitionName="list"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {userOrders}
      </ReactCSSTransitionGroup>
    </div>
  </div>
  </ReactCSSTransitionGroup>
    }
  }

const mapStateToProps = function(store) {
  return {
    paymentSuccess: store.sharedList.paymentSuccess

  }
}

export default connect(mapStateToProps)(OrderStatus)
