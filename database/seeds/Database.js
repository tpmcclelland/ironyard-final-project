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
// const User = use('App/Model/User')
// const Driver = use('App/Model/Driver')

class DatabaseSeeder {

  * resetDb() {
    // TODO: need to figure out how to delete all the seed data before rerunning the seed
  }

  * createUser(num) {
    yield Factory.model('App/Model/User').create(num)
  }

  * createDriver() {
    const user = Factory.model('App/Model/User').make()
    const driver = Factory.model('App/Model/Driver').make()
    yield user.save()
    yield user.driver().save(driver)
  }

  * createCooker() {
    const user = Factory.model('App/Model/User').make()
    const cooker = Factory.model('App/Model/Cooker').make()
    yield user.save()
    yield user.cooker().save(cooker)
  }

  * run () {
    yield this.createDriver()
    yield this.createCooker()
  }

}

module.exports = DatabaseSeeder
