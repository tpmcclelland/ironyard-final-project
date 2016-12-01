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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Store</th>
                        <th>Deadline</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#1</td>
                        <td>Kroger</td>
                        <td>5:00 PM</td>
                        <td><button type="button" className="btn btn-default btn-block" onClick={this.openModal}>Details</button></td>
                    </tr>
                </tbody>

            </table>

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
                      <h2>Modal Title</h2>
                    </div>
                    <div className="col-xs-2 text-right">
                      <button className="btn btn-default" onClick={this.closeModal}>X</button>
                    </div>
                  </div>
                  </Modal>
                </div>
                {/* End Modal */}
        </div>
    }
}

export default ActiveOrders
