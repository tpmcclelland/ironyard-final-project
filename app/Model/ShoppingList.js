'use strict'

const Lucid = use('Lucid')

class ShoppingList extends Lucid {
    order () {
        return this.belongsTo('App/Model/Order')
    }

    cooker () {
        return this.belongsTo('App/Model/Cooker')
    }

    shoppingListIngredients () {
      return this.hasMany(
        'App/Model/IngredientShoppingList',
        'ingredient_shopping_lists'
      )
    }

    recipeIngredients () {
      return this.hasManyThrough(
        'App/Model/IngredientRecipe',
        'App/Model/IngredientShoppingList',
        'id',
        'shopping_list_id',
        'ingredient_recipe_id',
        'id'

      )
    }

  static scopeActive (builder) {
    builder.where('order_id', null)
  }

}

module.exports = ShoppingList
