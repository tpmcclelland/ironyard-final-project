'use strict'

const Schema = use('Schema')

class FavoritesTableSchema extends Schema {

  up () {
    this.create('favorites', (table) => {
        table.increments()

        table.integer('cooker_id').references('id').inTable('cookers')
        table.integer('recipe_id').references('id').inTable('recipes')

        table.index('cooker_id')
        table.index('recipe_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('favorites')
  }

}

module.exports = FavoritesTableSchema
