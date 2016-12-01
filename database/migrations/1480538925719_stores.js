'use strict'

const Schema = use('Schema')

class StoresTableSchema extends Schema {

  up () {
    this.create('stores', (table) => {
      table.increments()
        table.string('name')
        table.string('address')
        table.string('city')
        table.string('state')
        table.string('zip')
        table.string('location_lat')
        table.string('location_long')

      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }

}

module.exports = StoresTableSchema
