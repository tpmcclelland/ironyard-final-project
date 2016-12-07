import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'

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
            shippingAddressAdditional: "",
            shippingCity: "",
            shippingState: "",
            shippingZipcode: "",
            ship_to_address: "",
        }
    }

    componentWillMount() {

    }
    componentDidMount() {
        var today = new Date()
        console.log(today)
        var storage = JSON.parse(sessionStorage.getItem('user'))
        var user = storage.user
        var cooker = storage.cooker

        this.setState({
            email: user.email,
            shippingAddress: cooker.home_address,
            shippingCity: cooker.home_city,
            shippingState: (cooker.home_state).toUpperCase(),
            shippingZipcode: cooker.home_zip,
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
        e.preventDefault()
        // this.createOrder()
    }
    createOrder() {
        fetch('/api/v1/orders', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                delivery_start_time: this.state.startDelivery,
                delivery_end_time: this.state.endDeliveryWindow,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response))
        .then(function(response) {
            if(response.ok) {
                console.log(response)
            } else {
                throw 'Network response was not ok.'
            }
        })
    }

    render() {
        return <form action="#payment" encType="multipart/form-data">
        <div className="anchor-top-margin">
            <div className="form-group col-xs-6 col-xs-offset-3 well">
                <h2>Delivery Window</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="startDeliveryWindow">Start</label>
                            <select id="startDeliveryWindow" name="startDeliveryWindow" className="form-control" value={this.state.startDeliveryWindow} onChange={this.typing} required>
                                <option disabled defaultValue="">-Select Start Time-</option>
                                <option value="anytime">Anytime</option>
                                <option value="2013-02-08 09:30:26">12:00 AM</option>
                                <option value="1 AM">1:00 AM</option>
                                <option value="2 AM">2:00 AM</option>
                                <option value="3 AM">3:00 AM</option>
                                <option value="4 AM">4:00 AM</option>
                                <option value="5 AM">5:00 AM</option>
                                <option value="6 AM">6:00 AM</option>
                                <option value="7 AM">7:00 AM</option>
                                <option value="8 AM">8:00 AM</option>
                                <option value="9 AM">9:00 AM</option>
                                <option value="10 AM">10:00 AM</option>
                                <option value="11 AM">11:00 AM</option>
                                <option value="12 PM">12:00 PM</option>
                                <option value="1 PM">1:00 PM</option>
                                <option value="2 PM">2:00 PM</option>
                                <option value="3 PM">3:00 PM</option>
                                <option value="4 PM">4:00 PM</option>
                                <option value="5 PM">5:00 PM</option>
                                <option value="6 PM">6:00 PM</option>
                                <option value="7 PM">7:00 PM</option>
                                <option value="8 PM">8:00 PM</option>
                                <option value="9 PM">9:00 PM</option>
                                <option value="10 PM">10:00 PM</option>
                                <option value="11 PM">11:00 PM</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="endDeliveryWindow">End</label>
                            <select id="endDeliveryWindow" name="endDeliveryWindow" className="form-control" value={this.state.endDeliveryWindow} onChange={this.typing}>
                                <option disabled defaultValue="">-Select End Time-</option>
                                <option value="anytime">Anytime</option>
                                <option value="12 AM">12:00 AM</option>
                                <option value="1 AM">1:00 AM</option>
                                <option value="2 AM">2:00 AM</option>
                                <option value="3 AM">3:00 AM</option>
                                <option value="4 AM">4:00 AM</option>
                                <option value="5 AM">5:00 AM</option>
                                <option value="6 AM">6:00 AM</option>
                                <option value="7 AM">7:00 AM</option>
                                <option value="8 AM">8:00 AM</option>
                                <option value="9 AM">9:00 AM</option>
                                <option value="10 AM">10:00 AM</option>
                                <option value="11 AM">11:00 AM</option>
                                <option value="12 PM">12:00 PM</option>
                                <option value="1 PM">1:00 PM</option>
                                <option value="2 PM">2:00 PM</option>
                                <option value="3 PM">3:00 PM</option>
                                <option value="4 PM">4:00 PM</option>
                                <option value="5 PM">5:00 PM</option>
                                <option value="6 PM">6:00 PM</option>
                                <option value="7 PM">7:00 PM</option>
                                <option value="8 PM">8:00 PM</option>
                                <option value="9 PM">9:00 PM</option>
                                <option value="10 PM">10:00 PM</option>
                                <option value="11 PM">11:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2>Delivery Address</h2>
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
                        <div className="col-sm-12">
                            <label htmlFor="shippingAddress">Address</label>
                            <input className="form-control" type="text" name="shippingAddress" id="shippingAddress" value={this.state.shippingAddress} onChange={this.typing} placeholder="12 Upup Downdown PKWY" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-12">
                            <input className="form-control" type="text" name="shippingAddressAdditional" id="shippingAddressAdditional" value={this.state.shippingAddressAdditional} onChange={this.typing} placeholder="Unit Left Right Left Right" />
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-12">
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
                            {/* <input className="form-control" type="text" name="shippingZipcode" id="shippingZipcode" value={this.state.shippingZipcode} onChange={this.typing} placeholder="46202" required/> */}
                        </div>
                    </div>
                </div>
                {/* Button doesn't push content anywhere yet. */}
                <button className="col-xs-12" className="btn btn-default btn-block" onClick={this.submitOrder}>Submit Address</button>
            </div>
        </div>
    </form>
}
}

export default Schedule
