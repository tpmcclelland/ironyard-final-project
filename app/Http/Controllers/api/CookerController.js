'use strict'

const Cooker = use('App/Model/Cooker')

class CookerController {

  * index(request, response) {
    //
    response.send('This is the cooker page')
  }

  * create(request, response) {
     //
  }

  * store(request, response) {
     //
  }

  * findOpenOrder(orders) {
    var open = []
    const findOrder = orders.forEach(function(order) {
      if (order.payment_received === false && order.state_id === null) {
        open.push(order)
      }
    })
    if (open.length > 0) {
      return true
    } else {
      return false
    }
  }

  * orderComplete(orders) {
      var complete = []
      const completed = orders.forEach(function(order) {
          if (order.payment_received !== false && order.state_id !== null) {
            complete.push(order)
          }
        })

      if (complete.length > 0) {
        return true
      } else {
        return false
      }
  }

  * show(request, response) {
    const cooker = yield Cooker.query().where('id', request.param('id')).with('orders').fetch()
    const getCooker = cooker.toJSON()
    const orders = getCooker[0].orders
    const openOrder = yield this.findOpenOrder(orders)
    const completeOrder = yield this.orderComplete(orders)
    const numOrders = orders.length
    response.json({cooker: cooker, numOrders: numOrders, openOrder: openOrder, completeOrders: completeOrder})
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

module.exports = CookerController
