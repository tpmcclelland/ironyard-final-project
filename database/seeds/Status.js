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

class StatusSeeder {

  * createStatus() {
      const status = Factory.model('App/Model/Status').make()
      yield status.save()
  }

  * run () {
    yield this.createStatus()
  }

}

module.exports = StatusSeeder
