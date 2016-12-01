'use strict'

const Schema = use('Schema')

class RecipesTableSchema extends Schema {

  up () {
    this.create('recipes', (table) => {
        table.increments()
        table.string('api_id')
        table.string('name')
        table.integer('serving_size')
        table.text('instructions')
        table.string('prep_time')
        table.string('total_time')

      table.timestamps()
    })
  }

  down () {
    this.drop('recipes')
  }

}

module.exports = RecipesTableSchema
