import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import Modal from 'react-modal'

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

class ActiveOrders extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
          modalIsOpen: false
        }
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
    render() {
        return <div className="container-fluid">
            <h1>Active Orders</h1>
            <div className="list-group container-fluid">
              <div className="list-group-item row">
                <div className="col-xs-12 order-heading">
                  <h3 className="list-group-item-heading">Delivery To: Address</h3>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <h4 className="list-group-item-text">From 2:00 PM to 5:00 PM</h4>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <h4 className="list-group-item-text">Kroger</h4>
                </div>
                <div className="col-xs-4 col-sm-2">
                  <button type="button" className="btn btn-default btn-block">Picked Up</button>
                </div>
                <div className="col-xs-4 col-sm-2">
                  <button type="button" className="btn btn-default btn-block">Delivered</button>
                </div>
                <div className="col-xs-4 col-sm-2">
                  <button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button>
                </div>
              </div>
              <div className="list-group-item row">
                <div className="col-xs-12 order-heading">
                  <h3 className="list-group-item-heading">Delivery To: Address</h3>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <h4 className="list-group-item-text">From 2:00 PM to 5:00 PM</h4>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <h4 className="list-group-item-text">Kroger</h4>
                </div>
                <div className="col-xs-4 col-sm-2 list-group-button">
                  <button type="button" className="btn btn-default btn-block">Picked Up</button>
                </div>
                <div className="col-xs-4 col-sm-2 list-group-button">
                  <button type="button" className="btn btn-default btn-block">Delivered</button>
                </div>
                <div className="col-xs-4 col-sm-2 list-group-button">
                  <button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button>
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
                      <h2>Delivery To: Address</h2>
                    </div>
                    <div className="col-xs-2 text-right">
                      <button className="btn btn-default" onClick={this.closeModal}>X</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <p>From 2:00 PM to 5:00 PM</p>
                      <p>Customer Name</p>
                      <p>555-555-5555</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                    <form class="form-inline">
                      <div class="form-group">
                        <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                        <div class="input-group">
                          <div class="input-group-addon">$</div>
                          <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount" />
                          <div class="input-group-addon">.00</div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Transfer cash</button>
                    </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <button type="button" className="btn btn-default btn-block">Picked Up</button>
                    </div>
                    <div className="col-xs-6">
                      <button type="button" className="btn btn-default btn-block">Delivered</button>
                    </div>
                  </div>
                  </Modal>
                </div>
                {/* End Modal */}
        </div>
    }
}

export default ActiveOrders
