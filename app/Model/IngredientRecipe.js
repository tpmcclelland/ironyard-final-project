'use strict'

const Lucid = use('Lucid')

class IngredientRecipe extends Lucid {
    recipe () {
        return this.belongsTo('App/Model/Recipe')
    }

    ingredient () {
        return this.belongsTo('App/Model/Ingredient')
    }
}

module.exports = IngredientRecipe
