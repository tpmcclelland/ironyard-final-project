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

class FavoritesSeeder {

  * createFavorite() {
      const cooker = Factory.model('App/Model/Cooker').make()
      const recipe = Factory.model('App/Model/Recipe').make()
      const favorite = Factory.model('App/Model/Favorite').make()
      yield cooker.save()
      yield recipe.save()
      favorite.cooker_id = cooker.id
      favorite.recipe_id = recipe.id
      yield favorite.save()
  }

  * run () {
    yield this.createFavorite()
  }

}

module.exports = FavoritesSeeder
