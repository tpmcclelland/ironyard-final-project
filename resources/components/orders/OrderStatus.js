import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Modal from 'react-modal'
import update from 'react-addons-update'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

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
  }
}

componentDidMount() {
  console.log(this.props)
  var routes = this.props.routes
  var useRoute = ''
  routes.forEach((route, i) => {
    console.log(i)
    if (i < 2) {
      var r = route.path
    } else {
      var r = '/' + route.path
    }
    useRoute += r
  })
  console.log(useRoute)
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
    // console.log('handlingOrders:', response)
  var storage = JSON.parse(sessionStorage.getItem('user'))
  // console.log('storage', storage)
  var userId = storage.user.id
  // console.log('user.id', userId)
  response.forEach((res) => {
      // console.log('preIF', res)
      // console.log('userID', userId)
    // console.log('preCondition', res.shoppingList.cooker.user_id)
      if (res.shoppingList.cooker.user.id === userId) {
        // console.log('userFound', res)
        this.setState({
          orders: update(this.state.orders, {$push: [res]})
        })
      }
        // console.log(this.state.orders)
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
    const userOrders = this.state.orders.map((order, i) => {
      if (order.state_id !== null) {
        var orderDate = moment(order.updated_at).format('dddd, MMMM Do - h:mm A')
        if (order.state.type == 'available') {
          var status = 'placed'
        } else if (order.state.type == 'active') {
          var status = 'in progress'
        } else {
          var status = order.state.type
        }
        var classes = 'col-xs-12 order-heading status '
        switch (status) {
          case 'placed':
            var statusClass = classes + 'placed'
            break;
          case 'in progress':
            var statusClass = classes + 'in-progress'
            break;
          case 'picked_up':
            var statusClass = classes + 'picked_up'
            break;
          case 'delivered':
            var statusClass = classes + 'delivered'
            break;
          case 'cancelled':
            var statusClass = classes + 'cancelled'
            break;
        }
        return <div key={i} className="cookerOrders bg-danger">
          <div className="list-group-item row order-heading">
              <div className={statusClass}>
                <div className="row">
                  <div className="col-xs-4">
                    <h3 className="list-group-item-heading"> {status}</h3>
                  </div>
                  <div className="col-xs-8 text-right">
                    <h3 className="list-group-item-heading order">Placed on {orderDate}</h3>
                  </div>
                </div>

              </div>

            <div className="col-xs-12 col-sm-9">
              <p className="list-group-item-text">Delivery requested between <span> {moment(order.delivery_start_time).format('h:mm a')} and {moment(order.delivery_end_time).format('h:mm a')}</span></p>
            </div>
            {/* <div className="col-xs-4 col-sm-4 form-group">
              <label htmlFor="orderState">Status:</label>
              <input type="text" className="form-control" id="orderState" name="orderState" value={order.state.type}
                     readOnly/>
            </div> */}
            <div className="col-xs-12 col-sm-3">
              <button type="button" className="btn btn-default btn-block" onClick={() => {
                this.sendModalData(i), this.openModal()
              }}
              >Details
              </button>
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
