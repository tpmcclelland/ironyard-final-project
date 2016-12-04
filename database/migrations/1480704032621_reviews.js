'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {
      table.increments()
      table.text('review')

      table.integer('order_id').references('id').inTable('orders')

      table.index('order_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
