'use strict'

const Schema = use('Schema')

class IngredientsTableSchema extends Schema {

  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.string('name')
      table.float('unit_cost')
      table.timestamps()
    })
  }

  down () {
    this.drop('ingredients')
  }

}

module.exports = IngredientsTableSchema
