'use strict'

const Lucid = use('Lucid')

class IngredientShoppingList extends Lucid {
    shoppingList () {
        return this.belongsTo('App/Model/ShoppingList')
    }

    recipeIngredient () {
        return this.belongsTo('App/Model/IngredientRecipe')
    }
}

module.exports = IngredientShoppingList
