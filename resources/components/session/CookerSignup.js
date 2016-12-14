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
            serverError: false,
            displayErrors: false,
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
      } else {
        this.setState({
          displayErrors: true,
        })
      }

    }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if(this.isValid()) {
        this.signup()
      } else {
        this.setState({
          displayErrors: true,
        })
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

      if (key === 'phone') {
        !validator.isLength(this.state[key], {min:10, max:14}) ? newErrorMessages.push(key + '-invalid') : ''
      }

      if (key === 'zip') {
        !validator.isLength(this.state[key], {min:5, max:5}) ? newErrorMessages.push(key + '-invalid') : ''
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
                  {this.state.errorMessages.includes('first_name') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="last_name" className="form-control"  value={this.state.last_name} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('last_name')  && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" className="form-control"  value={this.state.username} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('username')  && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className="form-control"  value={this.state.email} onChange={this.handleChanges}/>
                  {/* {this.state.errorMessages.includes('email') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                  {this.state.errorMessages.includes('email-invalid')  && this.state.displayErrors?<div className="validation-message">Please enter a valid email address</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className="form-control"  value={this.state.password} onChange={this.handleChanges}/>
                  {/* {this.state.errorMessages.includes('password') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                  {this.state.errorMessages.includes('password-invalid')  && this.state.displayErrors?<div className="validation-message">Password must be longer than 6 digits</div>: '' }
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" className="form-control"  value={this.state.address} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('address')  && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" className="form-control" value={this.state.city} onChange={this.handleChanges}/>
                  {this.state.errorMessages.includes('city')  && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" className="form-control" value={this.state.state} onChange={this.handleChanges}>
                    <option disabled value="">-Select State-</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  {this.state.errorMessages.includes('state')  && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="zip">Zip</label>
                  <input type="text" id="zip" name="zip" className="form-control" value={this.state.zip} onChange={this.handleChanges}/>
                  {/* {this.state.errorMessages.includes('zip') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                  {this.state.errorMessages.includes('zip-invalid')  && this.state.displayErrors?<div className="validation-message">Please enter a valid zip code</div>: '' }
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="form-control" value={this.state.phone} onChange={this.handleChanges} onKeyPress={this.handleKeyPress}/>
                  {/* {this.state.errorMessages.includes('phone') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                    {this.state.errorMessages.includes('phone-invalid')  && this.state.displayErrors?<div className="validation-message">Please enter a valid phone number</div>: '' }
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
