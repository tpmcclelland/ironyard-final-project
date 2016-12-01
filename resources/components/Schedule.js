import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Schedule extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {

    }
    componentDidMount() {

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
                            <input className="form-control" type="text" name="startDeliveryWindow" id="startDeliveryWindow" placeholder="6pm" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="endDeliveryWindow">End</label>
                            <input className="form-control" type="text" name="endDeliveryWindow" id="endDeliveryWindow" placeholder="8pm" required/>
                        </div>
                    </div>
                </div>
                <h2>Delivery Address</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="shippingFirstName">First Name</label>
                            <input className="form-control" type="text" name="shippingFirstName" id="shippingFirstName" placeholder="Snow" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingLastName">Last Name</label>
                            <input className="form-control" type="text" name="shippingLastName" id="shippingLastName" placeholder="White" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" id="email" placeholder="Winter@is.coming" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="shippingTelephone">Telephone</label>
                            <input className="form-control" type="tel" name="shippingTelephone" id="shippingTelephone" placeholder="123 456 7890" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-12">
                            <label htmlFor="shippingAddress">Address</label>
                            <input className="form-control" type="text" name="shippingAddress" id="shippingAddress" placeholder="12 Upup Downdown PKWY" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-12">
                            <input className="form-control" type="text" name="shippingAddressAdditional" id="shippingAddressAdditional"  placeholder="Unit Left Right Left Right" />
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-12">
                            <label htmlFor="shippingCity">City</label>
                            <input className="form-control" type="text" name="shippingCity" id="shippingCity" placeholder="Bee Ayystart" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="shippingState">State</label>
                            <select id="shippingState" name="shippingState" className="form-control">
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
                            <input className="form-control" type="text" name="shippingZipcode" id="shippingZipcode" placeholder="46202" required/>
                            {/* <input className="form-control" type="text" name="shippingZipcode" id="shippingZipcode" value={this.state.shippingZipcode} onChange={this.typing} placeholder="46202" required/> */}
                        </div>
                    </div>
                </div>
                <button className="col-xs-12"type="submit">Submit Address</button>
            </div>
        </div>
    </form>
}
}

export default Schedule
