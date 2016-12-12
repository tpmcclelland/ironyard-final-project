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
const State = use('App/Model/State')

class DatabaseSeeder {

  * resetDb() {
    // TODO: need to figure out how to delete all the seed data before rerunning the seed
  }

  * createUser() {
    const user = Factory.model('App/Model/User').make()
    yield user.save()
    return user
  }


  * createRecipe() {
    const recipe = Factory.model('App/Model/Recipe').make()
    yield recipe.save()
    return recipe
  }

  * createIngredient() {
    const ingredient = Factory.model('App/Model/Ingredient').make()
    yield ingredient.save()
    return ingredient
  }

  * createState() {
    const states = yield State.createMany([{type: 'active'}, {type: 'available'}, {type: 'picked_up'}, {type: 'delivered'}, {type: 'cancelled'}])
    return states
  }

  * createStore() {
    const store = Factory.model('App/Model/Store').make()
    yield store.save()
    return store
  }


  * createRating(driver) {
    const rating = Factory.model('App/Model/Rating').make()
    yield driver.ratings().save(rating)
    return rating
  }

  * createReview(order) {
    const review = Factory.model('App/Model/Review').make()
    yield order.review().save(review)
    return review
  }


  * createDriver() {
    const user = yield this.createUser()
    const driver = Factory.model('App/Model/Driver').make()
    yield user.driver().save(driver)
    return driver
  }

  * createCooker() {
    const user = yield this.createUser()
    const cooker = Factory.model('App/Model/Cooker').make()
    yield user.cooker().save(cooker)
    return cooker
  }

  * createFavorite(cooker, recipe) {
    const favorite = Factory.model('App/Model/Favorite').make()
    favorite.cooker_id = cooker.id
    favorite.recipe_id = recipe.id
    yield favorite.save()
    return favorite
  }

  * createIngredientRecipe(recipe, ingredient) {
    const ingredientRecipe = Factory.model('App/Model/IngredientRecipe').make()
    ingredientRecipe.recipe_id = recipe.id
    ingredientRecipe.ingredient_id = ingredient.id
    yield ingredientRecipe.save()
    return ingredientRecipe

  }


  * createIngredientShoppingList(shoppingList, ingredientRecipe) {
    const ingredientShoppingList = Factory.model('App/Model/IngredientShoppingList').make()
    ingredientShoppingList.shopping_list_id = shoppingList.id
    ingredientShoppingList.ingredient_recipe_id = ingredientRecipe.id
    yield ingredientShoppingList.save()
    return ingredientShoppingList

  }

  //
  // * createShoppingList(num) {
  //   const order = Database.from('orders').first()
  //   const orderId = order.id
  //   const cooker = Factory.model('App/Model/Cooker').make()
  //   const shoppingList = Factory.model('App/Model/ShoppingList').make(num)
  //   yield cooker.save()
  //   shoppingList.cooker_id = cooker.id
  //   shoppingList.order_id = orderId
  //   yield cooker.shoppingLists().save(shoppingList)
  //
  // }

  * createShoppingList(cooker, order) {
    const shoppingList = Factory.model('App/Model/ShoppingList').make()
    yield cooker.shoppingLists().save(shoppingList)
    yield order.shoppingList().save(shoppingList)
    return shoppingList

  }

  * createOrder(driver, store) {
    const order = Factory.model('App/Model/Order').make()
    const state = yield State.query().where('type', 'active').first()

    yield driver.orders().save(order)
    yield store.orders().save(order)
    yield state.orders().save(order)

    yield order.save()
    return order
  }



  * run () {
    // this is uses real data because we want to have a defined list of statuses
    const states = yield this.createState()

    // const driver = yield this.createDriver()
    // const cooker = yield this.createCooker()
    //
    // const recipe = yield this.createRecipe()
    // const ingredient = yield this.createIngredient()
    // const ingredientRecipe = yield this.createIngredientRecipe(recipe, ingredient)
    //
    // const favorite = yield this.createFavorite(cooker, recipe)
    //
    // const store = yield this.createStore()
    // const order = yield this.createOrder(driver, store)
    //
    // const shoppingList = yield this.createShoppingList(cooker, order)
    // const shoppingListIngredients = yield this.createIngredientShoppingList(shoppingList, ingredientRecipe)
    //
    // const rating = yield this.createRating(driver)
    // const review = yield this.createReview(order)




  }

}

module.exports = DatabaseSeeder
