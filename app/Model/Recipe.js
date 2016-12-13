'use strict'

const Lucid = use('Lucid')

class Recipe extends Lucid {

    favorites () {
      return this.hasMany('App/Model/Favorite')
    }

    // recipeIngredients () {
    //   return this.hasMany('App/Model/RecipeIngredient')
    // }
    //
    // ingredients () {
    // return this.hasManyThrough('App/Model/Ingredient')
    // }

    // ingredients () {
    // return this.belongsToMany('App/Model/Ingredient')
    // }

    ingredients () {
    return this.hasManyThrough(
      'App/Model/Ingredient',
      'App/Model/IngredientRecipe',
      'id',
      'recipe_id',
      'ingredient_id',
      'id'

    )
  }

}

module.exports = Recipe
