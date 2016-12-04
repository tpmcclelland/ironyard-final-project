'use strict'

const Schema = use('Schema')

class RatingsTableSchema extends Schema {

  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('rating')

      table.integer('driver_id').references('id').inTable('drivers')

      table.index('driver_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }

}

module.exports = RatingsTableSchema
