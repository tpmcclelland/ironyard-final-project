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

class DatabaseSeeder {

  * createRecipe() {
      const recipe = Factory.model('App/Model/Recipe').make()
      yield recipe.save()
  }

  * run () {
    yield this.createRecipe()
  }

}

module.exports = DatabaseSeeder
