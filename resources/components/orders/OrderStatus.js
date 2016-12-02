import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Modal from 'react-modal'

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
      orders: [{
        orderID: 1000,
        scheduleStart: "12:00pm",
        scheduleEnd: "5:00pm",
        orderState: "Available",
      },
      {
        orderID: 611,
        scheduleStart: "11:00am",
        scheduleEnd: "2:00pm",
        orderState: "Delivered",
      }
    ],
    modalIsOpen: false,
    reviewModalIsOpen: false,
    orderState: "Active",
  }
}

// Details Modal
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
render() {

  return <div className="container-fluid">
    <h1>Order Status</h1>
    <div className="list-group container-fluid">
      <div className="list-group-item row">
        <div className="col-xs-12 order-heading">
          <h3 className="list-group-item-heading">Order ID: {this.state.orders[0].orderID}</h3>
        </div>
        <div className="col-xs-12 col-sm-4">
          <h4 className="list-group-item-text">From {this.state.orders[0].scheduleStart} to {this.state.orders[0].scheduleEnd}</h4>
        </div>
        <div className="col-xs-4 col-sm-2 col-sm-offset-2">
          <label forHTML="orderState">Order State:</label>
          <input type="text" className="form-control" id="orderState" name="orderState" value={this.state.orders[0].orderState} readOnly />
        </div>
        <div className="col-xs-4 col-sm-2">
          <button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button>
        </div>
        <div className="col-xs-4 col-sm-2">
          <button type="button" className="btn btn-default btn-block" onClick={this.openReviewModal}>Review Driver</button>
        </div>
      </div>
      <div className="list-group-item row">
        <div className="col-xs-12 order-heading">
          <h3 className="list-group-item-heading">Order ID: {this.state.orders[1].orderID}</h3>
        </div>
        <div className="col-xs-12 col-sm-6">
          <h4 className="list-group-item-text">From {this.state.orders[1].scheduleStart} to {this.state.orders[1].scheduleEnd}</h4>
        </div>
        <div className="col-xs-4 col-sm-2">
          <label forHTML="orderState">Order State:</label>
          <input type="text" className="form-control" id="orderState" name="orderState" value={this.state.orders[1].orderState} readOnly />
        </div>
        <div className="col-xs-4 col-sm-2 list-group-button">
          <button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button>
        </div>
        <div className="col-xs-4 col-sm-2">
          <button type="button" className="btn btn-default btn-block" onClick={this.openReviewModal}>Review Driver</button>
        </div>
      </div>
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
              <h2>Order ID: 1234</h2>
            </div>
            <div className="col-xs-2 text-right">
              <button className="btn btn-default" onClick={this.closeModal}>X</button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>From 2:00 PM to 5:00 PM</p>
              <p>Driver Name</p>
              <p>555-555-5555</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <form className="form-inline">
                <div className="form-group">
                  <label className="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                  <div className="input-group">
                    <div className="input-group-addon">$</div>
                    <input type="text" className="form-control" id="exampleInputAmount" placeholder="Amount" readOnly/>
                    <div className="input-group-addon">.00</div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <br/>
            <div className="col-xs-6 col-xs-offset-6">
              <button type="button" className="btn btn-default btn-block">Cancel Order</button>
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
                    <label forHTML="rateDriver">Rate your driver</label>
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
                <label forHTML="driverReviewComment">Say something:</label>
                <input type="text" className="form-control input-lg" name="driverReviewComment" id="driverReviewComment" />
              </div>
            </div>
          </Modal>
        </div>
        {/* End Modal */}
      </div>
    }
  }

  export default OrderStatus
