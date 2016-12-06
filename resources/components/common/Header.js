import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { Link, browserHistory} from 'react-router'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class Header extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)
  }

  logout() {
    fetch('api/v1/logout', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        sessionStorage.removeItem('user')
        browserHistory.push('/')


        setTimeout(function() {
          store.dispatch({type: 'CURRENT_USER', user: null})
        },0)

      })
  }

  render() {

    const user = JSON.parse(sessionStorage.getItem('user'))

    return <nav className="navbar navbar-default header fixed hidden-print">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Ingredients Today</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="hidden-sm hidden-md hidden-lg text-right"><a href="#">My Favorites</a></li>
            <li className="hidden-sm hidden-md hidden-lg text-right"><a href="#">My Orders</a></li>
            <li className="hidden-sm hidden-md hidden-lg text-right"><a href="#">My Profile</a></li>
            <li className="hidden-sm hidden-md hidden-lg text-right"><a href="#">Log Out</a></li>
            <li className="dropdown hidden-xs">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.sharedMessage + ' ' +  this.props.currentUser.username} <img src="../assets/user-icon.svg" alt="user icon" className="user-icon" /><span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">My Favorites <span className="badge">{this.props.favoriteCount}</span></a></li>
                <li><a href="#">My Orders</a></li>
                {/*<li><a href="#">My Profile</a></li>*/}
                <li role="separator" className="divider"></li>
                <li><a href="#" onClick={this.logout}>Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  }
}

const mapStateToProps = function(store) {
  return {
    sharedMessage: store.sharedState.sharedMessage,
    currentUser: store.sharedUser.currentUser,
    favoriteCount: store.sharedUser.favoriteCount
  }
}

export default connect(mapStateToProps)(Header)
