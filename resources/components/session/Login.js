import React from 'react'
import { Link, browserHistory } from 'react-router'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import validator from 'validator'

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
            mock: false,
            errorMessages: [],
            serverError: false
        }
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

        if (this.isValid()) {
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
              console.log('login fetch: ' + error.message)
            })
        }
    }

    loggedInHandler(response) {
        // response = ['error 1', 'error 2']
        // response.user = undefined
        // console.log(response.user)

      if (response.error) {
        this.setState({
          serverError: response.error})
      }


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
      setTimeout(() => {this.isValid()},0)
    }

    handlePasswordChange(e) {
        this.setState({
                password: e.target.value
            })
      setTimeout(() => {this.isValid()},0)
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.login()
        }
    }

  isValid() {
    var newErrorMessages = []

    var keys = Object.keys(this.state)
    // console.log(keys)

    keys.forEach(key => {
      if (typeof this.state[key] == 'string' &&  validator.isEmpty(this.state[key])) newErrorMessages.push(key)

      if (typeof this.state[key] == 'string'
        && this.state[key] == 'email'
        && !validator.isEmail(this.state[key])) {
          newErrorMessages.push(key + '-invalid')
      }
    })

    // console.log(newErrorMessages)


    this.setState({
      errorMessages: newErrorMessages,
      serverError: false
    })

    return newErrorMessages.length == 0
  }

  render() {
    return <div className="sign-in-page">
      <div className="background">
        <div className="flex">
          <br />
          <br />
          <br />
          <br />

        <div className="form well col-xs-8 col-sm-6 col-md-4">
          <h2>Login</h2>
          <br/>
          {this.state.serverError ?<div className="validation-message">{this.state.serverError}</div>: '' }
          <br/>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange} autoFocus/>
            {this.state.errorMessages.includes('email') ?<div className="validation-message">Email is Required</div>: '' }
            {this.state.errorMessages.includes('email-invalid') ?<div className="validation-message">Email is Invalid</div>: '' }
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} onKeyPress={this.handleKeyPress}/>
            {this.state.errorMessages.includes('password') ?<div className="validation-message">Password is Required</div>: '' }
          </div>
          <div className="form-group">
            <button id="signin" type="button" className="btn btn-primary btn-block" onClick={this.handleClick}>Log In</button>
          </div>
          <div className="form-group">
            <Link to='/' className="btn btn-danger btn-block">Cancel</Link>
          </div>
        </div>
        </div>
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
