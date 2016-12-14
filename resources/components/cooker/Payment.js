import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import store from '../redux/_ReduxStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Payment extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

        this.state = {
            billingFirstName: "",
            billingLastName: "",
            billingTelephone: "",
            billingAddress: "",
            billingCity: "",
            billingState: "",
            billingZipcode: "",
            paymentCardHolderName: "",
            ship_to_address: "",
            paymentSuccess: false,
            cardNumber: "",
            cvc: "",
            processing: false
        }

    }

    componentWillMount() {
      // Stripe.setPublishableKey(Env.get('STRIPE_PUBLISHABLE_KEY'));
      Stripe.setPublishableKey('pk_test_bJhtDy3CDmQ77XOQ1JQgCUde');

    }
    componentDidMount() {
      var storage = JSON.parse(sessionStorage.getItem('user'))
      var user = storage.user
      var cooker = storage.cooker

      this.setState({
        billingFirstName: user.first_name,
        billingLastName: user.last_name,
        billingTelephone: user.phone,
        billingAddress: cooker.home_address,
        billingCity: cooker.home_city,
        billingState: cooker.home_state,
        billingZipcode: cooker.home_zip,
        paymentCardHolderName: user.first_name + ' ' + user.last_name,
      })
    }


  submitPayment(e) {
    var $form = $('#payment-form');

    // Disable the submit button to prevent repeated clicks:
    $form.find('#submit-button').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, this.stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
    }

  stripeResponseHandler(status, response) {
    // Grab the form:
    var $form = $('#payment-form');


    if (response.error) { // Problem!

      // Show the errors on the form:
      $form.find('.payment-errors').text(response.error.message);
      $form.find('#submit-button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!
      store.dispatch({type: 'LIST_AVAILABLE', shoppingListAvailable: false})

      this.setState({
        processing: true
      })

      // Get the token ID:
      var token = response.id;

      fetch('/api/v1/payment', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(
          {
            stripeToken: token,
            // stripeEmail: this.state.email,
            // customerFirstName: this.state.firstName,
            // customerLastName: this.state.lastName,
            // customerShippingStreetAddress: this.state.shippingStreetAddress,
            // customerShippingCity: this.state.shippingCity,
            // customerShippingState: this.state.shippingState,
            // customerShippingZipCode: this.state.shippingZipCode,
            // customerShippingCountry: this.state.shippingCountry,
            // customerBillingStreetAddress: this.state.billingStreetAddress,
            // customerBillingCity: this.state.billingCity,
            // customerBillingState: this.state.billingState,
            // customerBillingZipCode: this.state.billingZipCode,
            // customerBillingCountry: this.state.billingCountry,
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(this.handleStripResponse)

    }
  }

  handleStripResponse(response) {
    // console.log('handleStripResponse', response)

    fetch('/api/v1/payment/save', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(
        {
          stripe_customer: response.stripe_customer,
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          paymentSuccess: true
        })
        store.dispatch({type:'PAYMENT_SUCCESS', paymentSuccess: true})
        store.dispatch({type: 'PAYMENT_AVAILABLE', paymentAvailable: false})
        store.dispatch({type: 'ORDERS_AVAILABLE', ordersAvailable: true})
        browserHistory.push('/cooker/orders')
      })

  }

    // if (response.success) {
    //   sharedState({
    //     line_items: [],
    //     itemsInCart: 0,
    //     cartToken: '',
    //     checkedOut: true,
    //     cart: {}
    //   })
    //   browserHistory.push('/')
    // }


    typing(e) {
        var updatedState = {}
        updatedState[e.target.name] = e.target.value
        // console.log(updatedState)
        this.setState(updatedState)
        // this.collectShippingAddress()

    }

    render() {
        // Form Action set to route to /#.  Need to update this to push billing information appropriately.
        var amount = Number(this.props.amount).toFixed(2)
        if (amount == 0) {
          var payment = 0.00.toFixed(2)
        } else {
          var payment = (amount - 5).toFixed(2)
        }
        return <ReactCSSTransitionGroup
          transitionName="component"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <div className={this.state.processing ? 'payment col-xs-12': 'hidden'}>
            <h1 className="heading">Processing Your Payment</h1>
            <span className="fa fa-refresh fa-spin fa-5x fa-fw"></span>
            <span className="sr-only">Payment Processing...</span>
          </div>
      <div className={!this.state.processing? 'payment col-xs-12': 'hidden'}>
          <form action="/api/v1/payment" method="POST" id="payment-form">
            <div className="form-group">
                <div className="row">
                  <div className="col-sm-6">
                    <h2 className="heading">Payment</h2>
                  </div>
                  <div className="col-sm-6 text-right">
                    <h3 className="total-payment lead">Your total payment: ${amount}</h3>
                    <p>Ingredient Cost: ${payment}</p>
                    <p>Delivery Fee: $5.00</p>
                    </div>
                </div>
                <div className="form-group well">
                  <div className="row">
                    <div className="col-sm-12">
                      <span className="payment-errors"></span>
                    </div>
                  </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label htmlFor="paymentCardHolderName">Cardholder Name</label>
                            <input className="form-control" type="text" name="paymentCardHolderName" id="paymentCardHolderName" value={this.state.paymentCardHolderName} onChange={this.typing} placeholder="Joseph P Sampsonite" required/>
                        </div>
                    </div>
                    <div className="row">
                      <br />
                        <div className="col-sm-8">
                            <label htmlFor="paymentCardNumber">Card Number</label>
                            <input className="form-control" type="text" id="paymentCardNumber" data-stripe="number" name="cardNumber" value={this.state.cardNumber} onChange={this.typing} required/>
                        </div>
                        <div className="col-sm-4">
                          <label htmlFor="paymentCvc">CVC</label>
                          <input className="form-control" type="text"  data-stripe="cvc" required name="cvc" value={this.state.cvc} onChange={this.typing}/>
                        </div>
                    </div>
                    <div className="row">
                    <br />
                        <div className="col-sm-6">
                            <label htmlFor="paymentExpirationMonth">Exp Month</label>
                            <select id="paymentExpirationMonth" className="form-control" data-stripe="exp_month" required>
                                <option value="01">01-January</option>
                                <option value="02">02-February</option>
                                <option value="03">03-March</option>
                                <option value="04">04-April</option>
                                <option value="05">05-May</option>
                                <option value="06">06-June</option>
                                <option value="07">07-July</option>
                                <option value="08">08-August</option>
                                <option value="09">09-September</option>
                                <option value="10">10-October</option>
                                <option value="11">11-November</option>
                                <option value="12">12-December</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="paymentExpirationYear">Exp Year</label>
                            <select id="paymentExpirationYear" className="form-control" data-stripe="exp_year" defaultValue="2017">
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2 className="heading">Billing Address</h2>
                <div className="form-group well">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="billingFirstName">First Name</label>
                            <input className="form-control" type="text" name="billingFirstName" id="billingFirstName" value={this.state.billingFirstName} onChange={this.typing} placeholder="Snow" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="billingLastName">Last Name</label>
                            <input className="form-control" type="text" name="billingLastName" id="billingLastName" value={this.state.billingLastName} onChange={this.typing} placeholder="White" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="billingAddress">Address</label>
                            <input className="form-control" type="text" name="billingAddress" id="billingAddress" value={this.state.billingAddress} onChange={this.typing} placeholder="12 Upup Downdown PKWY" required/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="billingCity">City</label>
                            <input className="form-control" type="text" name="billingCity" id="billingCity" value={this.state.billingCity} onChange={this.typing} placeholder="Bee Ayystart" required/>
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="col-sm-6">
                            <label htmlFor="billingState">State</label>
                            <select id="billingState" name="billingState" className="form-control" value={this.state.billingState} onChange={this.typing}>
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
                            <label htmlFor="billingZipcode">Zipcode</label>
                            <input className="form-control" type="text" name="billingZipcode" id="billingZipcode" value={this.state.billingZipcode} onChange={this.typing} placeholder="46202" required/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                <div className="row">
                  <div className="col-xs-6 col-xs-offset-3">
                    <button id="submit-button" className={this.state.cardNumber.length < 16 || this.state.cvc < 3?'btn btn-default btn-block submit-payment-btn-disabled':'btn btn-default btn-block submit-payment-btn'} onClick={this.submitPayment} disabled={this.state.cardNumber.length < 16 || this.state.cvc < 3?true:false}>Submit Payment</button>
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
    ordersAvailable: store.sharedRecipe.ordersAvailable
  }
}

export default connect(mapStateToProps)(Payment)
