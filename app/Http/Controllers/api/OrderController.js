'use strict'

const Order = use('App/Model/Order')
const Cooker = use('App/Model/Cooker')
const ShoppingList = use('App/Model/ShoppingList')
const Database = use('Database')


class OrderController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const user = yield request.auth.getUser()
    const cooker = yield Cooker.findBy('user_id', user.id)

    const shoppingList = yield cooker.shoppingLists().with('recipeIngredients.ingredient').active().fetch()

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
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = OrderController
