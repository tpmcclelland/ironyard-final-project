'use strict'

const Lucid = use('Lucid')

class Ingredient extends Lucid {
    // recipeIngredients () {
    //   return this.hasMany('App/Model/RecipeIngredient')
    // }
    //
    // recipes () {
    // return this.hasManyThrough('App/Model/Recipe', 'App/Model/RecipeIngredient')
    // }

    recipes () {
    return this.belongsToMany('App/Model/Recipe')
    }
}

module.exports = Ingredient
