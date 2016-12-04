'use strict'

const Factory = use('Factory')
const Database = use('Database')

class RatingSeeder {

  * createRating() {
    const rating = Factory.model('App/Model/Rating').make()
    yield rating.save()
  }

  * run () {
    // yield this.createRating()
  }

}

module.exports = RatingSeeder
