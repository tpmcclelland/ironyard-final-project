'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ReviewSeeder {

  * createReview() {
    const review = Factory.model('App/Model/Review').make()
    yield review.save()
  }

  * run () {
    // yield this.createReview()
  }

}

module.exports = ReviewSeeder
