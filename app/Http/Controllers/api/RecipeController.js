'use strict'
var parser = require('ingredients-parser');

const Recipe = use('App/Model/Recipe')
const Ingredient = use('App/Model/Ingredient')
const IngredientRecipe = use('App/Model/IngredientRecipe')
const IngredientShoppingList = use('App/Model/IngredientShoppingList')
const ShoppingList = use('App/Model/ShoppingList')
const Favorite = use('App/Model/Favorite')
const Cooker = use('App/Model/Cooker')
const Database = use('Database')


class RecipeController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * findIngredient (name) {
    yield Ingredient.query().where('name', name).limit(1).pluck('id')
  }

  * findRecipeIngredient (number) {
    yield IngredientRecipe.query().where('ingredient_id', number).limit(1).pluck('id')
  }

  * store(request, response) {
      // find cooker based on user id
      const user = yield request.auth.getUser()
      const cooker = yield Cooker.findBy('user_id', user.id)

      // check to see if recipe has already been saved
      const recipeCheck = yield Recipe.query().where('api_id', request.input('api_id')).pluck('id')
      if (Number(recipeCheck) === 0) {
        // create new Recipe
        const recipe = new Recipe()

        recipe.api_id = request.input('api_id')
        recipe.name = request.input('name')
        recipe.serving_size = request.input('serving_size')
        recipe.instructions = request.input('instructions')
        recipe.prep_time = request.input('prep_time')
        recipe.total_time = request.input('total_time')
        recipe.cook_time = request.input('cook_time')
        recipe.image = request.input('image')
        recipe.api_data = request.input('api_data')

        yield recipe.save()
        var recipeId = recipe.id
      } else {
        var recipeId = Number(recipeCheck)
      }


      // if statement for add or favorite
      var type = request.input('type')
      var returnMessage

      if (type === 'add') {
        // check if cooker has an active shopping list
        const shoppingListCheck = yield ShoppingList.query().where('cooker_id', cooker.id).where('order_id', null).pluck('id')
        if (Number(shoppingListCheck) === 0) {
          // create new ShoppingList
          const shoppingList = new ShoppingList()
          shoppingList.cooker().associate(cooker)
          yield shoppingList.save()
          var shoppingListId = shoppingList.id
        } else {
          var shoppingListId = Number(shoppingListCheck)
        }

        // empty arrays to be filled later through for/forEach loops
        var ingredientArray = []
        var ingredientRecipeArray = []
        var ingredientShoppingListArray = []

        // ingredients array from request
        var ingredients = request.input('recipe_ingredients')
        for (let i = 0; i < ingredients.length; i++) {
          var ingredient = ingredients[i]
          // npm parser for ingredient, amount, and unit
          var result = parser.parse(ingredient)

          // check to see if ingredient already exists
          var ingredientCheck = Number(yield this.findIngredient(result.ingredient).next().value)
          if (ingredientCheck === 0) {
            // ingredientArrayItem added to ingredientArray to use for createMany in the Ingredient table
            var ingredientArrayItem = {
              name: result.ingredient
            }
            ingredientArray.push(ingredientArrayItem)
          }
        }
        // create ingredients
        yield Ingredient.createMany(ingredientArray)

        // for loop through ingredients to create recipe ingredients
        for (let i = 0; i < ingredients.length; i++) {
          var ingredient = ingredients[i]
          var result = parser.parse(ingredient)

          // if quantity can't be converted to an integer, value is null
          if (isNaN(parseInt(result.amount, 10))) {
            var quantity = null
          } else {
            var quantity = parseInt(result.amount, 10)
          }

          var ingredientRecipeArrayItem = {
            quantity: quantity,
            unit: result.unit,
            recipe_id: recipeId,
            ingredient_id: Number(yield this.findIngredient(result.ingredient).next().value)
          }
          ingredientRecipeArray.push(ingredientRecipeArrayItem)
        }
        yield IngredientRecipe.createMany(ingredientRecipeArray)

        // for loop through ingredients to create shopping list ingredinets
        for (let i = 0; i < ingredients.length; i++) {
          var ingredient = ingredients[i]
          var result = parser.parse(ingredient)
          // use findIngredient method to get the ingredient id to pass to the findRecipeIngredient method later
          var ingredient_id = Number(yield this.findIngredient(result.ingredient).next().value)

          // if quantity can't be converted to an integer, value is null
          if (isNaN(parseInt(result.amount, 10))) {
            var quantity = null
          } else {
            var quantity = parseInt(result.amount, 10)
          }

          var ingredientShoppingListArrayItem = {
            quantity: quantity,
            unit: result.unit,
            shopping_list_id: shoppingListId,
            ingredient_recipe_id: Number(yield this.findRecipeIngredient(ingredient_id).next().value)
          }
          ingredientShoppingListArray.push(ingredientShoppingListArrayItem)
        }
        yield IngredientShoppingList.createMany(ingredientShoppingListArray)
        returnMessage = 'saved'

      } else if (type === 'favorite') {
        // check if favorite already exists
        const favoriteCheck = yield Favorite.query().where('cooker_id', cooker.id).where('recipe_id', recipeId).pluck('id')
        if (Number(favoriteCheck) === 0) {
          // create new favorite
          const favorite = new Favorite()
          favorite.recipe_id = recipeId
          favorite.cooker().associate(cooker)
          yield favorite.save()

          returnMessage = yield cooker.favorites().fetch()
        }
      }

      response.json({type, returnMessage})
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = RecipeController
