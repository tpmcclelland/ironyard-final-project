'use strict'

const Review = use('App/Model/Review')
const Rating = use('App/Model/Rating')


class ReviewController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const review = new Review()

    review.review = request.input('review')
    review.order_id = request.input('order_id')

    yield review.save()

    const rating = new Rating()

    rating.rating = request.input('rating')
    rating.driver_id = request.input('driver_id')

    yield rating.save()

    return response.json({reviewId: review.review, ratingId: rating.rating})
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

module.exports = ReviewController
