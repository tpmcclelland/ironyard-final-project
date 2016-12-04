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
      return this.hasMany('App/Model/IngredientShoppingList')
    }

    recipeIngredients () {
    return this.hasManyThrough('App/Model/IngredientRecipe', 'App/Model/IngredientShoppingList')
    }

}

module.exports = ShoppingList
