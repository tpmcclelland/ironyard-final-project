import React from 'react'
import { Link, browserHistory} from 'react-router'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import validator from 'validator'


class CookerSignup extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        // this.state = sharedState()
        this.state = {
            username: '',
            email: '',
            password: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            first_name: '',
            last_name: '',
            phone: '',
            home_lat: '',
            home_long: '',
            mock: false,
            errorMessages: [],
            serverError: false
        }
    }

    mockResponse() {
        var response = {
            user: {
                id: 1,
                username: 'Tom',
                email: 'me@me.com',
                avatar: '',
                api_token: 'xxxxxxxxxxxxx',
                first_name: 'Whitney',
                last_name: 'Weir',
                phone: '555-555-5555',
                home_lat: '39.76440729999999',
                home_long: '-86.14734140000002',
            }
        }

        this.signedUpHandler(response)
    }


  signup() {
        if(!this.state.mock) {
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + ',' + this.state.city + ',' + this.state.state)
            .then(response => response.json())
            .then(response => this.setGeolocation(response.results[0]))
          // .then(response => console.log(response))
            .then(response => fetch('/api/v1/register', {
              method: 'POST',
              credentials: 'same-origin',
              body: JSON.stringify({
                type: 'cooker',
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                home_lat: this.state.home_lat,
                home_long: this.state.home_long
              }),
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
              .then(this.signedUpHandler)
              .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message)
              }))
           }
        else {
            this.mockResponse()
        }
        }

    setGeolocation(address) {
      console.log(address)
      this.setState({
        home_lat: address.geometry.location.lat,
        home_long: address.geometry.location.lng,
      })

    }
    signedUpHandler(response){

      if (response.error) {
        this.setState({
          serverError: 'Email already in use. Please use a different email.'})
      }

        if(typeof response.user != 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(response.user))
          store.dispatch({type:'MESSAGE', message:'Welcome'})
          store.dispatch({type:'CURRENT_USER', user: response.user})

          browserHistory.push('/cooker')
        // } else {
        //     response.forEach(function(error) {
        //         var errorDiv = document.createElement('div')
        //         errorDiv.classList.add('alert', 'alert-danger')
        //         errorDiv.innerHTML = error
        //         document.querySelector('#errors').appendChild(errorDiv)
        //     })
        }
      }

    handleClick() {
      if (this.isValid()){
        this.signup()
      }

    }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if(this.isValid()) {
        this.signup()
      }

    }
  }

  isValid() {
    var newErrorMessages = []

    var keys = Object.keys(this.state)

    keys.forEach(key => {
      if(key !== 'home_lat' && key !== 'home_long') {
        if (typeof this.state[key] == 'string' &&  validator.isEmpty(this.state[key])) newErrorMessages.push(key)
      }

      if (key === 'email') {
        !validator.isEmail(this.state[key]) ? newErrorMessages.push(key + '-invalid') : ''
      }

      if (key === 'password') {
        !validator.isLength(this.state[key], {min:6, max:undefined}) ? newErrorMessages.push(key + '-invalid') : ''
      }

    })

    // console.log(newErrorMessages)

    this.setState({
      errorMessages: newErrorMessages,
      serverError: false
    })

    return newErrorMessages.length == 0
  }

    handleChanges(event) {
      var updatedState = {}
      updatedState[event.target.name] = event.target.value
      this.setState(updatedState)
      setTimeout(() => {this.isValid()},0)
    }

    render() {
      return <div className="cooker-sign-up">
        <div className="background">
          <br />
          <br />
          <br />
          <br />
          <div className="container well form">
            <div className="row">
              <div className="col-xs-12">
                <h2>Cooker Sign Up</h2>
                <br/>
              </div>
              <div className="col-xs-12">
                {this.state.serverError ?<div className="validation-message">{this.state.serverError}</div>: '' }
                <br/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="first_name" className="form-control" value={this.state.first_name} onChange={this.handleChanges} autoFocus/>
                  {this.state.errorMessages.includes('first_name') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="last_name" className="form-control"  value={this.state.last_name} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('last_name') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" className="form-control"  value={this.state.username} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('username') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className="form-control"  value={this.state.email} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('email') ?<div className="validation-message">Please fill in this field</div>: '' }
                  {this.state.errorMessages.includes('email-invalid') ?<div className="validation-message">Please enter a valid email</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className="form-control"  value={this.state.password} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('password') ?<div className="validation-message">Please fill in this field</div>: '' }
                  {this.state.errorMessages.includes('password-invalid') ?<div className="validation-message">Password must be longer than 6 digits</div>: '' }
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" className="form-control"  value={this.state.address} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('address') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" className="form-control" value={this.state.city} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('city') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input type="text" id="state" name="state" className="form-control" value={this.state.state} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('state') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="zip">Zip</label>
                  <input type="text" id="zip" name="zip" className="form-control" value={this.state.zip} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('zip') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="form-control" value={this.state.phone} onChange={this.handleChanges} onKeyPress={this.handleKeyPress}/>
                  {this.state.errorMessages.includes('phone') ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <button id="signup" type="button" className="btn btn-success btn-block" onClick={this.handleClick}>Sign Up</button>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="form-group">
                  <Link to='/' className="btn btn-danger btn-block">Cancel </Link>
                </div>
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

export default connect(mapStateToProps)(CookerSignup)
