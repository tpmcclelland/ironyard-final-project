'use strict'

const Schema = use('Schema')

class IngredientRecipeTableSchema extends Schema {

  up () {
    this.create('ingredient_recipes', (table) => {
      table.increments()
      table.integer('quantity')
      table.string('unit')

      table.integer('recipe_id').references('id').inTable('recipes')
      table.integer('ingredient_id').references('id').inTable('ingredients')

      table.index('recipe_id')
      table.index('ingredient_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('ingredient_recipes')
  }

}

module.exports = IngredientRecipeTableSchema
