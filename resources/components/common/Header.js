import React from 'react'


class Header extends React.Component {
  constructor(props) {
    super(props)
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
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{user.username} <img src="../assets/user-icon.svg" alt="user icon" className="user-icon" /><span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">My Favorites</a></li>
                <li><a href="#">My Orders</a></li>
                <li><a href="#">My Profile</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  }
}

export default Header
