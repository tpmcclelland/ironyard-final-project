import React from 'react'
import { Link, browserHistory } from 'react-router'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { sharedState, attachSharedState, detachSharedState } from 'react-helpers/dist/sharedState'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

class Login extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        // this.state = sharedState()
        this.state = {
            email: '',
            password: '',
            mock: false
        }
    }

    componentDidMount() {
        // attachSharedState(this, (state) => this.setState({sharedState: state}))
        // attachSharedState(this)
    }

    componentWillUnmount() {
        // detachSharedState(this)
    }

    mockResponse() {
        var response = {
            user: {
                id: 1,
                name: 'Tom',
                email: 'me@me.com',
                avatar: '',
                api_token: 'xxxxxxxxxxxxx'
            }
        }

        this.loggedInHandler(response)
    }

    login() {

        if (!this.state.mock) {
            // console.log(this.state)
            fetch('/api/v1/login', {
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
              if(response.ok) {
                return response.json()
              } else {
                  throw 'Network response was not ok.'              }
            })
            .then(this.loggedInHandler)
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message)
            })
        } else {
            this.mockResponse()
        }
    }

    loggedInHandler(response) {
        // response = ['error 1', 'error 2']
        // response.user = undefined
        console.log(response.user)

        if(typeof response.user != 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(response.user))
          store.dispatch({type:'MESSAGE', message:'Welcome'})
          store.dispatch({type:'CURRENT_USER', user: response.user})
          browserHistory.push('/' + response.route)
        }
    }

    handleClick() {
        this.login()
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
            })
    }

    handlePasswordChange(e) {
        this.setState({
                password: e.target.value
            })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.login()
        }
    }

    render() {
        return <div className="well">
                          <h2>Login</h2>
                          <br/>
                          <div id="errors"></div>
                          <br/>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control" required value={this.state.email} onChange={this.handleEmailChange}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" required value={this.state.password} onChange={this.handlePasswordChange} onKeyPress={this.handleKeyPress}/>
                          </div>
                          <div className="form-group">
                              <button id="signin" type="button" className="btn btn-primary btn-block" onClick={this.handleClick}>Log In</button>
                          </div>
                          <div className="form-group">
                            <Link to='/' className="btn btn-danger btn-block">Cancel</Link>
                        </div>
                    </div>
    }
}

const mapStateToProps = function(store) {
  return {
    sharedMessage: store.sharedState.sharedMessage,
    currentUser: store.sharedUser.currentUser
    // currentUser: store.sharedUser.currentUser
  }
}

export default connect(mapStateToProps)(Login)
