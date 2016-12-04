'use strict'

const Schema = use('Schema')

class IngredientShoppingListTableSchema extends Schema {

  up () {
    this.create('ingredient_shopping_lists', (table) => {
      table.increments()
      table.integer('shopping_list_id').references('id').inTable('shopping_lists')
      table.integer('ingredient_recipe_id').references('id').inTable('ingredient_recipes')

      table.index('shopping_list_id')
      table.index('ingredient_recipe_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('ingredient_shopping_lists')
  }

}

module.exports = IngredientShoppingListTableSchema
