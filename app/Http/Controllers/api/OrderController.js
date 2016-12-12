'use strict'

const Order = use('App/Model/Order')
const Cooker = use('App/Model/Cooker')
const ShoppingList = use('App/Model/ShoppingList')
const State = use('App/Model/State')
const Database = use('Database')


class OrderController {

  * index(request, response) {
    const orders = yield Order.query().with('store', 'state', 'review', 'driver.user', 'shoppingList.cooker.user', 'shoppingList.recipeIngredients.ingredient', 'shoppingList.recipeIngredients.recipe', 'driver.ratings').orderBy('updated_at', 'desc').orderBy('delivery_end_time', 'asc').fetch()

    response.send(orders)
  }

  * create(request, response) {
    //
  }

  * updateEstimatedCost(passedOrder) {
    const wrappedOrder = yield Order.query().where('id', passedOrder.id).with('shoppingList.recipeIngredients.ingredient').fetch()
    var order = wrappedOrder.toJSON()
    console.log(order)
    //
    var recipeIngredients = order[0].shoppingList.recipeIngredients
    var ingredientsArray = []
    var ingredients = recipeIngredients.forEach(function(ingredient) {
      ingredientsArray.push(ingredient.ingredient)
    })
    var totalCost = ingredientsArray.reduce(function(a, b) {
      return a + b.unit_cost;
    }, 0);
    return totalCost + 5
  }

  * store(request, response) {
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

    const amount = yield this.updateEstimatedCost(order)

    yield Database
      .table('shopping_lists')
      .where('id', shoppingListUpdate)
      .update('estimated_price', amount)


    return response.json({orderSaved: true, amount: amount.toFixed(2)})

  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    const state = yield State.query().where('type', request.input('state')).fetch()
    const stateValue = state.value()

    if (request.input('driver_id') == undefined) {
      console.log('updating state, no driver')
      const update = yield Database
        .table('orders')
        .where('id', request.param('id'))
        .update('state_id', stateValue[0].id)

      return response.json({message: 'Updated state'})

    } else if (request.input('type') == 'state') {
      console.log('updating state with driver')
      const update = yield Database
        .table('orders')
        .where('id', request.param('id'))
         .update({ state_id: stateValue[0].id, driver_id: request.input('driver_id')})

      return response.json({message: 'Updated state and driver'})

    } else if (request.input('type') == 'cost') {
      console.log('updating cost')
      const update = yield Database
      .table('orders')
      .where('id', request.param('id'))
      .update('total_cost', request.input('total_cost'))

      return response.json({message: 'Updated total cost'})
    }

  }

  * destroy(request, response) {
    //
  }

}

module.exports = OrderController
