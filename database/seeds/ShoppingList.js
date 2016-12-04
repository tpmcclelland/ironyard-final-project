/**
 * Created by n0190775 on 12/2/16.
 */

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
const Database = use('Database')

class ShoppingListSeeder {

  * resetDb() {
    // TODO: need to figure out how to delete all the seed data before rerunning the seed
  }
  //* resetShoppingList() {
  //  const shoppingListReset = Factory.model('App/Model/ShoppingList').reset()
  //  yield shoppingListReset
  //}

  * createShoppingList(num) {
    const order = Database.from('orders').first()
    const orderId = order.id
    const cooker = Factory.model('App/Model/Cooker').make()
    const shoppingList = Factory.model('App/Model/ShoppingList').make(num)
    yield cooker.save()
    shoppingList.cooker_id = cooker.id
    shoppingList.order_id = orderId
    yield cooker.shoppingLists().save(shoppingList)

  }

  * run () {
    // yield this.resetDb()
    // yield this.createUser(2) //don't need this since we create a new user when creating a cooker/driver
    //yield this.resetShoppingList()
    // yield this.createShoppingList(1)

  }

}

module.exports = ShoppingListSeeder
