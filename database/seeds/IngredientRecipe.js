'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')
const Database = use('Database')

class IngredientRecipeSeeder {

  * createIngredientRecipe() {
      const ingredient = Factory.model('App/Model/Ingredient').make()
      const recipe = Factory.model('App/Model/Recipe').make()
      const ingredientRecipe = Factory.model('App/Model/IngredientRecipe').make()
      yield ingredient.save()
      yield recipe.save()
      ingredientRecipe.recipe_id = recipe.id
      ingredientRecipe.ingredient_id = ingredient.id
      yield ingredientRecipe.save()
  }

  * run () {
    // yield this.createIngredientRecipe()
  }

}

module.exports = IngredientRecipeSeeder
