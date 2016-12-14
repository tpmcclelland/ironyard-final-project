'use strict'

const Schema = use('Schema')

class DriversTableSchema extends Schema {

  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.string('license')
      table.string('license_expiration')
      table.string('driving_location')
      table.string('driving_location_lat')
      table.string('driving_location_long')

      table.integer('user_id').references('id').inTable('users')

      table.index('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }

}

module.exports = DriversTableSchema
