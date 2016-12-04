'use strict'

const Schema = use('Schema')

class StatesTableSchema extends Schema {

  up () {
    this.create('states', (table) => {
      table.increments()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('states')
  }

}

module.exports = StatesTableSchema
