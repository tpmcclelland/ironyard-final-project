import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import moment from 'moment'
import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import {browserHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Schedule extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            startDeliveryWindow: "select",
            endDeliveryWindow: "select",
            shippingFirstName: "",
            shippingLastName: "",
            email: "",
            shippingTelephone: "",
            shippingAddress: "",
            shippingCity: "",
            shippingState: "",
            shippingZipcode: "",
        }
    }
    componentWillMount() {

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
        updatedState[e.target.name] = e.target.value
        // console.log(updatedState)
        this.setState(updatedState)
        // this.collectShippingAddress()
    }
    submitOrder(e) {
        store.dispatch({type: 'PAYMENT_AVAILABLE', paymentAvailable: true})
        store.dispatch({type: 'LIST_AVAILABLE', shoppingListAvailable: false})
        // e.preventDefault()
        this.createOrder()
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
      <form encType="multipart/form-data">
            <div className="form-group">
                <h2 className="heading">Delivery Window</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="startDeliveryWindow">Start</label>
                            <select id="startDeliveryWindow" name="startDeliveryWindow" className="form-control" value={this.state.startDeliveryWindow} onChange={this.typing} required>
                                <option disabled value="select">Select a time</option>
                                <option value={today + ' 07:00:00'}>7:00 AM</option>
                                <option value={today + ' 08:00:00'}>8:00 AM</option>
                                <option value={today + ' 09:00:00'}>9:00 AM</option>
                                <option value={today + ' 10:00:00'}>10:00 AM</option>
                                <option value={today + ' 11:00:00'}>11:00 AM</option>
                                <option value={today + ' 12:00:00'}>12:00 PM</option>
                                <option value={today + ' 13:00:00'}>1:00 PM</option>
                                <option value={today + ' 14:00:00'}>2:00 PM</option>
                                <option value={today + ' 15:00:00'}>3:00 PM</option>
                                <option value={today + ' 16:00:00'}>4:00 PM</option>
                                <option value={today + ' 17:00:00'}>5:00 PM</option>
                                <option value={today + ' 18:00:00'}>6:00 PM</option>
                                <option value={today + ' 19:00:00'}>7:00 PM</option>
                                <option value={today + ' 20:00:00'}>8:00 PM</option>
                                <option value={today + ' 21:00:00'}>9:00 PM</option>
                                <option value={today + ' 22:00:00'}>10:00 PM</option>
                                <option value={today + ' 23:00:00'}>11:00 PM</option>
                                <option value={today + ' 24:00:00'}>12:00 AM</option>
                                <option value={today + ' 01:00:00'}>1:00 AM</option>
                                <option value={today + ' 02:00:00'}>2:00 AM</option>
                                <option value={today + ' 03:00:00'}>3:00 AM</option>
                                <option value={today + ' 04:00:00'}>4:00 AM</option>
                                <option value={today + ' 05:00:00'}>5:00 AM</option>
                                <option value={today + ' 06:00:00'}>6:00 AM</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="endDeliveryWindow">End</label>
                            <select id="endDeliveryWindow" name="endDeliveryWindow" className="form-control" value={this.state.endDeliveryWindow} onChange={this.typing} required>
                                <option disabled value="select">Select a time</option>
                                <option value={today + ' 07:00:00'}>7:00 AM</option>
                                <option value={today + ' 08:00:00'}>8:00 AM</option>
                                <option value={today + ' 09:00:00'}>9:00 AM</option>
                                <option value={today + ' 10:00:00'}>10:00 AM</option>
                                <option value={today + ' 11:00:00'}>11:00 AM</option>
                                <option value={today + ' 12:00:00'}>12:00 PM</option>
                                <option value={today + ' 13:00:00'}>1:00 PM</option>
                                <option value={today + ' 14:00:00'}>2:00 PM</option>
                                <option value={today + ' 15:00:00'}>3:00 PM</option>
                                <option value={today + ' 16:00:00'}>4:00 PM</option>
                                <option value={today + ' 17:00:00'}>5:00 PM</option>
                                <option value={today + ' 18:00:00'}>6:00 PM</option>
                                <option value={today + ' 19:00:00'}>7:00 PM</option>
                                <option value={today + ' 20:00:00'}>8:00 PM</option>
                                <option value={today + ' 21:00:00'}>9:00 PM</option>
                                <option value={today + ' 22:00:00'}>10:00 PM</option>
                                <option value={today + ' 23:00:00'}>11:00 PM</option>
                                <option value={today + ' 24:00:00'}>12:00 AM</option>
                                <option value={today + ' 01:00:00'}>1:00 AM</option>
                                <option value={today + ' 02:00:00'}>2:00 AM</option>
                                <option value={today + ' 03:00:00'}>3:00 AM</option>
                                <option value={today + ' 04:00:00'}>4:00 AM</option>
                                <option value={today + ' 05:00:00'}>5:00 AM</option>
                                <option value={today + ' 06:00:00'}>6:00 AM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2 className="heading">Delivery Address</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="shippingFirstName">First Name</label>
                            <input className="form-control" type="text" name="shippingFirstName" id="shippingFirstName" value={this.state.shippingFirstName} onChange={this.typing} placeholder="Snow" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingLastName">Last Name</label>
                            <input className="form-control" type="text" name="shippingLastName" id="shippingLastName" value={this.state.shippingLastName} onChange={this.typing} placeholder="White" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" id="email" value={this.state.email} onChange={this.typing} placeholder="Winter@is.coming" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingTelephone">Telephone</label>
                            <input className="form-control" type="tel" name="shippingTelephone" id="shippingTelephone" value={this.state.shippingTelephone} onChange={this.typing} placeholder="123 456 7890" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="shippingAddress">Address</label>
                            <input className="form-control" type="text" name="shippingAddress" id="shippingAddress" value={this.state.shippingAddress} onChange={this.typing} placeholder="12 Upup Downdown PKWY" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingCity">City</label>
                            <input className="form-control" type="text" name="shippingCity" id="shippingCity" value={this.state.shippingCity} onChange={this.typing} placeholder="Bee Ayystart" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="shippingState">State</label>
                            <select id="shippingState" name="shippingState" className="form-control" value={this.state.shippingState} onChange={this.typing}>
                                <option disabled value="default">-Select State-</option>
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
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingZipcode">Zipcode</label>
                            <input className="form-control" type="text" name="shippingZipcode" id="shippingZipcode" value={this.state.shippingZipcode} onChange={this.typing} placeholder="46202" required/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <button className="btn btn-default btn-block" type="button" onClick={this.submitOrder} disabled={this.state.startDeliveryWindow == 'select' || this.state.endDeliveryWindow == 'select'?true:false}>Submit Address</button>
                    </div>
                </div>
                </div>
            </div>
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
