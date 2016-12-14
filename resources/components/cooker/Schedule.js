import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import {browserHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import validator from 'validator'

class Schedule extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            startDeliveryWindow: "",
            endDeliveryWindow: "",
            shippingFirstName: "",
            shippingLastName: "",
            email: "",
            shippingTelephone: "",
            shippingAddress: "",
            shippingCity: "",
            shippingState: "",
            shippingZipcode: "",
            errorMessages: [],
            displayErrors: false,
        }
    }
    componentWillMount() {

    }

    componentWillUpdate() {
      // this.isValid()

    }

    componentDidMount() {
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var cooker = storage.cooker

        this.setState({
            email: user.email,
            shippingAddress: cooker.home_address,
            shippingCity: cooker.home_city,
            shippingState: (cooker.home_state).toUpperCase(),
            shippingZipcode: cooker.home_zip,
            shippingFirstName: user.first_name,
            shippingLastName: user.last_name,
            shippingTelephone: user.phone,
        })
    }

    typing(e) {
        var updatedState = {}
        if (e.target.name == 'startDeliveryWindow' || e.target.name == 'endDeliveryWindow') {
            // updatedState[e.target.name] = moment(e.target.value).utc().format()
            updatedState[e.target.name] = e.target.value

        } else {
            updatedState[e.target.name] = e.target.value
        }
        this.setState(updatedState)

        // this.collectShippingAddress()
       setTimeout(() => {this.isValid()},0)
    }
    submitOrder(e) {
      e.preventDefault()

      if (this.isValid()) {
        store.dispatch({type: 'PAYMENT_AVAILABLE', paymentAvailable: true})
        store.dispatch({type: 'LIST_AVAILABLE', shoppingListAvailable: false})

        this.createOrder()
    } else {
        this.setState({
            displayErrors: true,
        })
    }

    }

    isValid() {
      var newErrorMessages = []

      var keys = Object.keys(this.state)
      // console.log(keys)

      keys.forEach(key => {
          if (typeof this.state[key] == 'string' &&  validator.isEmpty(this.state[key])) newErrorMessages.push(key)

          if (key === 'email') {
              !validator.isEmail(this.state[key]) ? newErrorMessages.push(key + '-invalid') : ''
          }

          if (key === 'password') {
            !validator.isLength(this.state[key], {min:6, max:undefined}) ? newErrorMessages.push(key + '-invalid') : ''
          }

          if (key === 'shippingTelephone') {
            !validator.isLength(this.state[key], {min:10, max:14}) ? newErrorMessages.push(key + '-invalid') : ''
          }

          if (key === 'shippingZipcode') {
            !validator.isLength(this.state[key], {min:5, max:5}) ? newErrorMessages.push(key + '-invalid') : ''
          }
      })




      this.setState({
        errorMessages: newErrorMessages
      })

      return newErrorMessages.length == 0
    }

    createOrder() {
        fetch('/api/v1/orders', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                delivery_start_time: this.state.startDeliveryWindow,
                delivery_end_time: this.state.endDeliveryWindow,
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
        .then(this.orderHandler)
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
          })
    }

    orderHandler(response) {
     store.dispatch({type: 'AMOUNT', amount: response.amount})
      browserHistory.push('/cooker/payment')
    }

    render() {

        var today = moment().format('YYYY-MM-DD')

        return <ReactCSSTransitionGroup
          transitionName="component"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={true}
          transitionEnterTimeout={2000}
          transitionLeave={false}>
          <div className="schedule col-xs-12">
            {/*{errorMessages.length? <div className="alert alert-danger"><ul>{errorMessages}</ul></div> : ''}*/}
      <form onSubmit={this.submitOrder} encType="multipart/form-data">
        {/*<ValidateGroup>*/}
            <div className="form-group">
                <h2 className="heading">Delivery Window</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="startDeliveryWindow">Start</label>
                          {/*<Validate validators={[(v) => !validator.isEmpty(v)]}>*/}
                            <select id="startDeliveryWindow" name="startDeliveryWindow" value={this.state.startDeliveryWindow} className="form-control" onChange={this.typing}>
                                <option disabled value="">Select a time</option>
                                <option value={today + 'T12:00:00Z'}>7:00 AM</option>
                                <option value={today + 'T13:00:00Z'}>8:00 AM</option>
                                <option value={today + 'T14:00:00Z'}>9:00 AM</option>
                                <option value={today + 'T15:00:00Z'}>10:00 AM</option>
                                <option value={today + 'T16:00:00Z'}>11:00 AM</option>
                                <option value={today + 'T17:00:00Z'}>12:00 PM</option>
                                <option value={today + 'T18:00:00Z'}>1:00 PM</option>
                                <option value={today + 'T19:00:00Z'}>2:00 PM</option>
                                <option value={today + 'T20:00:00Z'}>3:00 PM</option>
                                <option value={today + 'T21:00:00Z'}>4:00 PM</option>
                                <option value={today + 'T22:00:00Z'}>5:00 PM</option>
                                <option value={today + 'T23:00:00Z'}>6:00 PM</option>
                                <option value={today + 'T24:00:00Z'}>7:00 PM</option>
                                <option value={today + 'T01:00:00Z'}>8:00 PM</option>
                                <option value={today + 'T02:00:00Z'}>9:00 PM</option>
                                <option value={today + 'T03:00:00Z'}>10:00 PM</option>
                                <option value={today + 'T04:00:00Z'}>11:00 PM</option>
                                <option value={today + 'T05:00:00Z'}>12:00 AM</option>
                                <option value={today + 'T06:00:00Z'}>1:00 AM</option>
                                <option value={today + 'T07:00:00Z'}>2:00 AM</option>
                                <option value={today + 'T08:00:00Z'}>3:00 AM</option>
                                <option value={today + 'T09:00:00Z'}>4:00 AM</option>
                                <option value={today + 'T10:00:00Z'}>5:00 AM</option>
                                <option value={today + 'T11:00:00Z'}>6:00 AM</option>
                            </select>
                          {this.state.errorMessages.includes('startDeliveryWindow') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                            {/*<ErrorMessage>Start Time is Required</ErrorMessage>*/}
                          {/*</Validate>*/}
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="endDeliveryWindow">End</label>
                            <select id="endDeliveryWindow" name="endDeliveryWindow" className="form-control" value={this.state.endDeliveryWindow} onChange={this.typing}>
                                <option disabled value="">Select a time</option>
                                <option value={today + 'T12:00:00Z'}>7:00 AM</option>
                                <option value={today + 'T13:00:00Z'}>8:00 AM</option>
                                <option value={today + 'T14:00:00Z'}>9:00 AM</option>
                                <option value={today + 'T15:00:00Z'}>10:00 AM</option>
                                <option value={today + 'T16:00:00Z'}>11:00 AM</option>
                                <option value={today + 'T17:00:00Z'}>12:00 PM</option>
                                <option value={today + 'T18:00:00Z'}>1:00 PM</option>
                                <option value={today + 'T19:00:00Z'}>2:00 PM</option>
                                <option value={today + 'T20:00:00Z'}>3:00 PM</option>
                                <option value={today + 'T21:00:00Z'}>4:00 PM</option>
                                <option value={today + 'T22:00:00Z'}>5:00 PM</option>
                                <option value={today + 'T23:00:00Z'}>6:00 PM</option>
                                <option value={today + 'T24:00:00Z'}>7:00 PM</option>
                                <option value={today + 'T01:00:00Z'}>8:00 PM</option>
                                <option value={today + 'T02:00:00Z'}>9:00 PM</option>
                                <option value={today + 'T03:00:00Z'}>10:00 PM</option>
                                <option value={today + 'T04:00:00Z'}>11:00 PM</option>
                                <option value={today + 'T05:00:00Z'}>12:00 AM</option>
                                <option value={today + 'T06:00:00Z'}>1:00 AM</option>
                                <option value={today + 'T07:00:00Z'}>2:00 AM</option>
                                <option value={today + 'T08:00:00Z'}>3:00 AM</option>
                                <option value={today + 'T09:00:00Z'}>4:00 AM</option>
                                <option value={today + 'T10:00:00Z'}>5:00 AM</option>
                                <option value={today + 'T11:00:00Z'}>6:00 AM</option>
                            </select>
                          {this.state.errorMessages.includes('endDeliveryWindow') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                    </div>
                </div>
                <h2 className="heading">Delivery Address</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="shippingFirstName">First Name</label>
                          {/*<Validate validators={[(v) => !validator.isEmpty(v)]}>*/}
                            <input className="form-control" type="text" name="shippingFirstName" id="shippingFirstName" value={this.state.shippingFirstName} onChange={this.typing} placeholder="Firstname"/>
                            {/*<ErrorMessage>First Name is Required</ErrorMessage>*/}
                          {/*</Validate>*/}
                          {this.state.errorMessages.includes('shippingFirstName') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingLastName">Last Name</label>
                            <input className="form-control" type="text" name="shippingLastName" id="shippingLastName" value={this.state.shippingLastName} onChange={this.typing} placeholder="White"/>
                          {this.state.errorMessages.includes('shippingLastName') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" id="email" value={this.state.email} onChange={this.typing} placeholder="Winter@is.coming"/>
                          {this.state.errorMessages.includes('email') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingTelephone">Telephone</label>
                            <input className="form-control" type="tel" name="shippingTelephone" id="shippingTelephone" value={this.state.shippingTelephone} onChange={this.typing} placeholder="123 456 7890" />
                          {this.state.errorMessages.includes('shippingTelephone-invalid') && this.state.displayErrors?<div className="validation-message">Please enter a valid phone number</div>: '' }
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="shippingAddress">Address</label>
                            <input className="form-control" type="text" name="shippingAddress" id="shippingAddress" value={this.state.shippingAddress} onChange={this.typing} placeholder="12 Upup Downdown PKWY" />
                          {this.state.errorMessages.includes('shippingAddress') && this.state.displayErrors ?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingCity">City</label>
                            <input className="form-control" type="text" name="shippingCity" id="shippingCity" value={this.state.shippingCity} onChange={this.typing} placeholder="Bee Ayystart" />
                          {this.state.errorMessages.includes('shippingCity') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="shippingState">State</label>
                            <select id="shippingState" name="shippingState" className="form-control" value={this.state.shippingState} onChange={this.typing}>
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
                          {this.state.errorMessages.includes('shippingState') && this.state.displayErrors?<div className="validation-message">Please fill in this field</div>: '' }
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingZipcode">Zipcode</label>
                            <input className="form-control" type="text" name="shippingZipcode" id="shippingZipcode" value={this.state.shippingZipcode} onChange={this.typing} placeholder="46202" />
                          {this.state.errorMessages.includes('shippingZipcode-invalid') && this.state.displayErrors?<div className="validation-message">Please enter a valid zip code</div>: '' }
                        </div>
                    </div>
                </div>
                <div className="form-group">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        {/*<button className="btn btn-default btn-block" type="submit" disabled={this.state.startDeliveryWindow == 'select' || this.state.endDeliveryWindow == 'select'?true:false}>Submit Address</button>*/}
                      <button className="btn btn-default btn-block submit-btn" type="submit">Submit Address</button>
                    </div>
                </div>
                </div>
            </div>
        {/*</ValidateGroup>*/}
        </form>
    </div>
        </ReactCSSTransitionGroup>
}
}

const mapStateToProps = function(store) {
  return {
    amount: store.sharedList.amount,
    shoppingListAvailable: store.sharedRecipe.shoppingListAvailable,
    paymentAvailable: store.sharedRecipe.paymentAvailable,
  }
}

export default connect(mapStateToProps)(Schedule)
