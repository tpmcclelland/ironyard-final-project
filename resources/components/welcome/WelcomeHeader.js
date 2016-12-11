import React from 'react'
import { Link } from 'react-router'

class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="welcome-header">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-6">
          <h3 className="lead">Ingredients Today</h3>
        </div>
        <div className="col-xs-6 text-right">
          <Link to="/login" className="log-in">
            <h3 className="lead">Log In <span><img src="../assets/user-icon.svg" /></span></h3>
          </Link>
        </div>
      </div>
    </div>

    </div>
  }
}

export default WelcomeHeader
