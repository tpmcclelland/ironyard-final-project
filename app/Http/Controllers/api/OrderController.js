'use strict'

const Order = use('App/Model/Order')
const Cooker = use('App/Model/Cooker')
const ShoppingList = use('App/Model/ShoppingList')
const Database = use('Database')


class OrderController {

  * index(request, response) {
    const orders = yield Order.query().with('store', 'state', 'driver.user', 'shoppingList.cooker.user', 'shoppingList.recipeIngredients.ingredient', 'shoppingList.recipeIngredients.recipe', 'driver.ratings', 'review').fetch()

    response.send(orders)
  }

  * create(request, response) {
    //
  }

  * updateEstimatedCost(passedOrder) {
    const wrappedOrder = yield Order.query().where('id', passedOrder.id).with('shoppingList.recipeIngredients.ingredient').fetch()
    console.log('tom ****  ', wrappedOrder.value())
    var order = wrappedOrder.value()

    var recipeIngredients = order.shoppingList()
    console.log(recipeIngredients)

  }

  * store(request, response) {
    console.log('hi')
    const user = yield request.auth.getUser()
    const cooker = yield Cooker.findBy('user_id', user.id)

    // const shoppingList = yield cooker.shoppingLists().with('recipeIngredients.ingredient').active().fetch()

    const order = new Order()

    order.delivery_start_time = request.input('delivery_start_time')
    order.delivery_end_time = request.input('delivery_end_time')
    order.payment_received = false
    order.driver_paid = false

    yield order.save()

    const shoppingListUpdate = Number(yield ShoppingList.query().where('cooker_id', cooker.id).where('order_id', null).pluck('id'))
    const update = yield Database
      .table('shopping_lists')
      .where('id', shoppingListUpdate)
      .update('order_id', order.id)

    // yield this.updateEstimatedCost(order)

    return response.json({orderSaved: true})
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    const update = yield Database
      .table('orders')
      .where('id', request.param('id'))
       .update({ state_id: request.input('state_id'), driver_id: request.input('driver_id')})
  }

  * destroy(request, response) {
    //
  }

}

module.exports = OrderController
