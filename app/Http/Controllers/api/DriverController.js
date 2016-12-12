'use strict'

const Driver = use('App/Model/Driver')
const Order = use('App/Model/Order')

class DriverController {

  * index(request, response) {
    response.send('success')
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * averageRating (driver) {
    const passedDriver = driver.toJSON()
    var ratings = passedDriver[0].ratings
    var ratingArray = []
    var allRatings = ratings.forEach(function(rating) {
      ratingArray.push(rating.rating)
    })
    var averageRating = ratingArray.reduce(function(a, b) {
      return a + b;
    }, 0)
    return averageRating / (ratingArray.length)
  }

  * reviews(driver) {
    const passedDriver = driver.toJSON()
    var orders = passedDriver[0].orders
    var reviewArray = []
    var orderReviews = orders.forEach(function(order) {
      reviewArray.push(order.review)
    })
    var reviews = []
    var parseReviews = reviewArray.forEach(function(review) {
      if (review !== null) {
        reviews.push(review.review)
      }
    })
    return reviews
  }

  * deliveredOrders(driver) {
    const passedDriver = driver.toJSON()
    var orders = passedDriver[0].orders
    var ordersArray = []
    var ordersThisMonth = orders.forEach(function(order) {
      if (order.state.type === 'delivered') {
        ordersArray.push(order)
      }
    })
    return ordersArray
  }

  * show(request, response) {
    const driver = yield Driver.query().where('id', request.param('id')).with('ratings', 'orders', 'orders.review', 'orders.state').fetch()

    const avgRating = yield this.averageRating(driver)
    const reviews = yield this.reviews(driver)
    const deliveredOrders = yield this.deliveredOrders(driver)

    response.json({average_rating: avgRating, reviews: reviews, delivered_orders: deliveredOrders})
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

module.exports = DriverController
