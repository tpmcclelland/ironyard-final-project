import React from 'react'
import { Link, browserHistory} from 'react-router'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import validator from 'validator'
import DatePicker from 'react-datepicker'


class DriverSignup extends React.Component {
  constructor(props) {
    super(props)
    classAutoBind(this)
    // this.state = sharedState()
    this.state = {
      email: '',
      password: '',
      username: '',
      license: '',
      license_expiration: '',
      // driving_location: '',
      first_name: '',
      last_name: '',
      phone: '',
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
        phone: '555-555-5555'
      }
    }

    this.signedUpHandler(response)
  }

  signup() {
    if(!this.state.mock) {
      fetch('/api/v1/register', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          type: 'driver',
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          license: this.state.license,
          license_expiration: this.state.license_expiration,
          // driving_location: this.state.driving_location,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone
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
        })
    } else {
      this.mockResponse()
    }
  }

  signedUpHandler(response){
    // response = ['error 1', 'error 2']
    // response = ['error 1', 'error 2']
    // response.user = undefined
    // console.log(this.state)
    // console.log(response)

    if (response.error) {
      this.setState({
        serverError: 'Email already in use. Please use a different email.'})
    }


    if(typeof response.user != 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(response.user))
      store.dispatch({type:'MESSAGE', message:'Welcome'})
      store.dispatch({type:'CURRENT_USER', user: response.user})

      browserHistory.push('/driver')
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
    if (this.isValid()) {
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
      // if(key !== 'home_lat' && key !== 'home_long') {
        if (typeof this.state[key] == 'string' &&  validator.isEmpty(this.state[key])) newErrorMessages.push(key)
      // }

      if (key === 'email') {
        !validator.isEmail(this.state[key]) ? newErrorMessages.push(key + '-invalid') : ''
      }

      if (key === 'password') {
        !validator.isLength(this.state[key], {min:6, max:undefined}) ? newErrorMessages.push(key + '-invalid') : ''
      }

      if (key === 'license') {
        !validator.isLength(this.state[key], {min:6, max:undefined}) ? newErrorMessages.push(key + '-invalid') : ''
      }

      if (key === 'phone') {
        !validator.isLength(this.state[key], {min:10, max:14}) ? newErrorMessages.push(key + '-invalid') : ''
      }


      // if (key === 'license_expiration') {
      //   !validator.isDate(this.state[key]) ? newErrorMessages.push(key + '-invalid') : ''
      // }

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
    return  <div className="driver-sign-up">
      <div className="background">
        <br />
        <br />
        <br />
        <br />
        <div className="container well form">
          <div className="row">
            <div className="col-xs-12">
              <h2>Driver Sign Up</h2>
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
                <input type="text" id="firstName" name="first_name" className="form-control" required value={this.state.first_name} onChange={this.handleChanges} autoFocus/>
                {this.state.errorMessages.includes('first_name') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="last_name" className="form-control" required value={this.state.last_name} onChange={this.handleChanges}/>
                {this.state.errorMessages.includes('last_name') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className="form-control" required value={this.state.username} onChange={this.handleChanges}/>
                {this.state.errorMessages.includes('username') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
              </div>
              {/* <div className="form-group">
               <label htmlFor="avatar">Avatar</label>
               <input type="file" id="avatar" name="avatar" className="form-control" required onChange={(e) => this.setState({avatar:e.target.files[0]})}/>
               </div> */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" required value={this.state.email} onChange={this.handleChanges}/>
                {/* {this.state.errorMessages.includes('email')  && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' } */}
                {this.state.errorMessages.includes('email-invalid') && this.state.displayErrors?<div className="validation-message">Please enter a valid email</div>: '' }
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" required value={this.state.password} onChange={this.handleChanges}/>
                {/* {this.state.errorMessages.includes('password') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                {this.state.errorMessages.includes('password-invalid') && this.state.displayErrors ?<div className="validation-message">Password must be longer than 6 digits</div>: '' }
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="license">License Number</label>
                <input type="text" id="license" name="license" className="form-control" required value={this.state.license} onChange={this.handleChanges}/>
                {/* {this.state.errorMessages.includes('license') ?<div className="validation-message">Please fill in this field</div>: '' } */}
                {this.state.errorMessages.includes('license-invalid') && this.state.displayErrors?<div className="validation-message">Please enter a valid driver's license number</div>: '' }
              </div>
              <div className="form-group">
                <label htmlFor="license_expiration">License Expiration</label>
                <input type="date" placeholder="" id="license_expiration" name="license_expiration" className="form-control" required value={this.state.license_expiration} onChange={this.handleChanges}/>
                {/*<DatePicker*/}
                  {/*name="license_expiration"*/}
                  {/*selected={this.state.license_expiration}*/}
                {/*onChange={this.handleChange} />*/}
                {this.state.errorMessages.includes('license_expiration') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                {/*{this.state.errorMessages.includes('license_expiration-invalid') ?<div className="validation-message">Please enter a valid date.</div>: '' }*/}
              </div>
              {/*<div className="form-group">*/}
                {/*<label htmlFor="location">Preferred Location</label>*/}
                {/*<input type="text" id="location" name="driving_location" className="form-control" required value={this.state.driving_location} onChange={this.handleChanges}/>*/}
                {/*{this.state.errorMessages.includes('driving_location') ?<div className="validation-message">Please fill in this field</div>: '' }*/}
              {/*</div>*/}
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-control" required value={this.state.phone} onChange={this.handleChanges} onKeyPress={this.handleKeyPress}/>
                {this.state.errorMessages.includes('phone-invalid') && this.state.displayErrors?<div className="validation-message">Please enter a valid phone number</div>: '' }
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

export default connect(mapStateToProps)(DriverSignup)
