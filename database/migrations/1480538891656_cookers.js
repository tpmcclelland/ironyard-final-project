'use strict'

const Schema = use('Schema')

class CookersTableSchema extends Schema {

  up () {
    this.create('cookers', (table) => {
        table.increments()
        table.string('stripe_id')
        table.string('home_address')
        table.string('home_city')
        table.string('home_state')
        table.string('home_zip')
        table.string('home_lat')
        table.string('home_long')

        table.integer('user_id').references('id').inTable('users')

        table.index('user_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('cookers')
  }

}

module.exports = CookersTableSchema
