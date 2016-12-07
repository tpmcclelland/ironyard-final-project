'use strict'

const Env = use('Env')
const Cooker = use('App/Model/Cooker')
const Order = use('App/Model/Order')
const State = use('App/Model/State')
const Database = use('Database')



class PaymentController {

  * saveOrder(request, response) {
    const user = yield request.auth.getUser()
    console.log('user', user)
    const cooker = yield user.cooker().fetch()
    console.log('cooker', cooker)

    if (cooker.stripe_id === null) {
      cooker.stripe_id = request.input('stripe_customer')
      yield cooker.save()
    }

    var order = yield cooker.orders().pending().pluck('id')
    // var order = yield cooker.orders().fetch()
    var order = yield Order.query().where(
    console.log(order)

    // order.payment_received = true


    var state = yield State.findBy('type', 'available')
    // order.state_id = state.id
    console.log(order)
    console.log(state.id)

    const affectedRows = yield Database
      .table('orders')
      .where('id', order)
      .update({payment_received: true, state_id: state.id})

    // yield order.save()



    return response.json({saved: true, affectedRows: affectedRows})

  }

  * charge(request, response) {
    const user = yield request.auth.getUser()
    // const cooker = user.cooker().all()

     // const cooker = yield Cooker.findBy('user_id', user.id)

    const cooker = yield user.cooker().fetch()
    var amount = 1000

    // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
//     var stripe = require("stripe")(Env.get('STRIPE_TEST_KEY'));
    var stripe = require('stripe')('sk_test_LASvfiR41I34qZCseYxy0DVA')

// Get the credit card details submitted by the form
//     var token = request.body.stripeToken; // Using Express
    var token = request.input('stripeToken')

    var self = this

    if (cooker.stripe_id) {
      stripe.charges.create({
        amount: amount, // Amount in cents
        currency: "usd",
        customer: cooker.stripe_id // Previously stored, then retrieved
      }).then(function(charge) {
        response.json({payment_success: true})
      });
    } else {
      stripe.customers.create({
        source: token,
        description: 'Ingredients Today Cooker',
        email: user.email
      }).then(function(customer) {
        return stripe.charges.create({
          amount: amount, // Amount in cents
          currency: "usd",
          customer: customer.id
        })
      })
        .then(function (charge) {

          function * saveStripeID () {
            // console.log('saveStripeAPI', charge)
            // console.log(user)
            // console.log(cooker)
            // console.log(charge.customer)
              cooker.stripe_id = charge.customer
              cooker.update('stripe_id', charge.customer)
              yield cooker.save()
            console.log(cooker)
              yield Database.close()
          }

          var test = saveStripeID()
          test.next()
          test.next()
          test.next()
          response.json({payment_success: true, stripe_customer: charge.customer})
          return

        })
      //   .then( function (charge) {
      //   // yield self.saveStripeAPI(charge, cooker).next().value
      //   // YOUR CODE: Save the customer ID and other info in a database for later!
      //   // console.log('saveStripeAPI', charge)
      //   // // cooker.update('stripe_id', charge.customer)
      //   // cooker.stripe_id = charge.customer
      //   // yield cooker.save()
      //   response.json({payment_success: true})
      // })
    }

  }

}

module.exports = PaymentController
