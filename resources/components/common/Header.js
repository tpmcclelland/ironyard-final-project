import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { Link, browserHistory} from 'react-router'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class Header extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)

    this.state = {
      driver: false,
      cooker: {}
    }
  }

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const driver = user.driver

    if (driver != null) {
      if (driver.id !== undefined ) {
        this.setState({driver: true})
      }
    } else {
      this.setState({cooker: user.cooker})
      this.getFavoriteCount()
    }


  }

  logout(e) {
    // e.preventDefault()
    fetch('/api/v1/logout', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        sessionStorage.removeItem('user')

        setTimeout(function() {
          store.dispatch({type: 'CURRENT_USER', user: null})
          store.dispatch({type:'RESULT_SIZE', resultSize: 20})
          store.dispatch({type:'DISPLAY_FAVORITES', displayFavorites: false})
          store.dispatch({type: 'FAVORITE_COUNT', favoriteCount: 0})
          store.dispatch({type: 'FAVORITE_RECIPES', favoriteRecipes: null})
        },0)

        browserHistory.push('/')

      })
  }

  getFavoriteCount() {
    fetch('/api/v1/favorites', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if(response.ok) {
          return response.json()
        } else {
          throw 'Network response was not ok.'
        }
      })
      .then(response => {
        store.dispatch({type: 'FAVORITE_COUNT', favoriteCount: response.length})
        store.dispatch({type: 'FAVORITE_RECIPES', favoriteRecipes: response})
        // console.log(response)
      })
      .catch(function(error) {
        console.log('getFavoriteCount(): fetch operation: ' + error.message)
      })
  }

  filterFavorites(e) {
    // e.preventDefault()
    store.dispatch({type:'DISPLAY_FAVORITES', displayFavorites: true})
  }

  render() {

    const user = JSON.parse(sessionStorage.getItem('user'))
    // const cooker = user.cooker

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
            {!this.state.driver? <li className="hidden-sm hidden-md hidden-lg text-right"><Link to={'/cooker/' + this.state.cooker.id + '/favorites'}>My Favorites <span className="badge">{this.props.favoriteCount}</span></Link></li>: ''}
            {!this.state.driver? <li className="hidden-sm hidden-md hidden-lg text-right"><Link to="/cooker/orders">My Orders</Link></li>: ''}
            {/*<li className="hidden-sm hidden-md hidden-lg text-right"><a href="#">My Profile</a></li>*/}
            <li className="hidden-sm hidden-md hidden-lg text-right"><a href="#" onClick={this.logout}>Log Out</a></li>
            <li className="dropdown hidden-xs">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.sharedMessage + ' ' +  this.props.currentUser.user.username} <img src="/assets/user-icon.svg" alt="user icon" className="user-icon" /><span className="caret"></span></a>
              <ul className="dropdown-menu">
                {/*{!this.state.driver? <li><a href="#" onClick={this.filterFavorites}>My Favorites <span className="badge">{this.props.favoriteCount}</span></a></li>: '' }*/}
                {!this.state.driver? <li><Link to={'/cooker/' + this.state.cooker.id + '/favorites'}>My Favorites <span className="badge">{this.props.favoriteCount}</span></Link></li>: '' }
                {/*{!this.state.driver? <li><Link to="/cooker/favorites">My Favorites <span className="badge">{this.props.favoriteCount}</span></Link></li>: '' }*/}
                {!this.state.driver? <li><Link to="/cooker/orders">My Orders</Link></li> : ''}

                {/*<li><a href="#">My Profile</a></li>*/}
                <li role="separator" className="divider"></li>
                <li><Link to="/" onClick={this.logout}>Log Out</Link></li>
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
    favoriteCount: store.sharedRecipe.favoriteCount,
    displayFavorites: store.sharedRecipe.displayFavorites

  }
}

export default connect(mapStateToProps)(Header)
