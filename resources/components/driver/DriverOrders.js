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
          modalIsOpen: false,
          totalCostShown: false,
          activeOrders: this.props.activeOrders,
          heading: heading,
          anchor: anchor,
          locationSearchTerm: '',
        }
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
    delivered() {
      alert('Delivered!')
      this.setState({
        modalIsOpen: false
      })
    }
    accepted() {
      alert('Accepted!')
      this.setState({
        modalIsOpen: false
      })
    }
    openModal() {
      this.setState({
        modalIsOpen: true
      })
    }
    showTotalCost() {
      this.setState({
        totalCostShown: !this.state.totalCostShown
      })
    }
    closeModal() {
      this.setState({
        modalIsOpen: false,
      })
    }
    render() {
        return <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-sm-9">
              <h1 id={this.state.anchor} className="anchor">{this.state.heading}</h1>
            </div>
            <div className={this.state.activeOrders?'col-xs-6 col-sm-3':'hidden'}>
                <form className="navbar-form navbar-left" onSubmit={this.updateLocation}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Update Location" value={this.state.locationSearchTerm} onChange={this.updateLocationSearchTerm} />
                    </div>
                    <button type="button" className="btn btn-default search-button" onClick={this.updateLocation}>Update</button>
                </form>
            </div>
          </div>
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
                <div className={this.state.activeOrders?'col-xs-4 col-sm-2 list-group-button':'col-xs-6 col-sm-3 list-group-button'}>
                  <button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button>
                </div>
                <div className={this.state.activeOrders?'col-xs-4 col-sm-2 list-group-button':'hidden'}>
                  <button type="button" className="btn btn-default btn-block" onClick={this.showTotalCost}>Picked Up</button>
                </div>
                <div className={this.state.activeOrders?'col-xs-4 col-sm-2 list-group-button':'hidden'}>
                  <button type="button" className="btn btn-default btn-block" onClick={this.delivered}>Delivered</button>
                </div>
                <div className={this.state.activeOrders?'hidden':'col-xs-6 col-sm-3 list-group-button'}>
                  <button type="button" className="btn btn-default btn-block" onClick={this.accepted}>Accept</button>
                </div>
                <div className={this.state.totalCostShown?'row':'hidden'}>
                  <form className="form-inline col-xs-12 col-sm-7 col-sm-offset-5 total-amount">
                    <div className="form-group">
                        <label htmlFor="total-amount">Total Amount:</label>
                      <div className="input-group text-center">
                        <div className="input-group-addon">$</div>
                        <input type="text" className="form-control" id="total-amount" />
                      </div>
                      <button type="button" className="btn btn-default hide-total-amount" onClick={this.showTotalCost}>Close</button>
                    </div>
                  </form>
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
                    <div className="col-sm-6">
                      <div className="col-xs-12">
                        <p>From 2:00 PM to 5:00 PM</p>
                        <p>Kroger</p>
                        <p>Customer Name</p>
                        <p>555-555-5555</p>
                      </div>
                      <div className="col-xs-12">
                        <h3 className="modal-subheading">Map</h3>
                        <div className="map"></div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-xs-12">
                        <h3 className="modal-subheading">Shopping List</h3>
                        <ul>
                          <li>flour</li>
                          <li>sugar</li>
                          <li>butter</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className={this.state.activeOrders?'col-xs-6 col-sm-5 col-sm-offset-1 order-status-button':'hidden'}>
                      <button type="button" className="btn btn-default btn-block" onClick={this.showTotalCost}>Picked Up</button>
                    </div>
                    <div className={this.state.activeOrders?'col-xs-6 col-sm-5 order-status-button':'hidden'}>
                      <button type="button" className="btn btn-default btn-block" onClick={this.delivered}>Delivered</button>
                    </div>
                    <div className={this.state.activeOrders?'hidden':'col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 order-status-button'}>
                      <button type="button" className="btn btn-default btn-block" onClick={this.accepted}>Accept</button>
                    </div>
                  </div>
                  <div className={this.state.totalCostShown?'row':'hidden'}>
                    <form className="form-inline col-xs-12 total-amount">
                      <div className="form-group text-center">
                          <label htmlFor="total-amount">Total Amount:</label>
                        <div className="input-group">
                          <div className="input-group-addon">$</div>
                          <input type="text" className="form-control" id="total-amount" />
                        </div>
                      </div>
                    </form>
                  </div>
                  </Modal>
                </div>
                {/* End Modal */}
        </div>
    }
}

export default DriverOrders
