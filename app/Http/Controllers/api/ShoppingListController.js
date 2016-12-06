'use strict'

const ShoppingList = use('App/Model/ShoppingList')
const Cooker = use('App/Model/Cooker')
// const IngredientShoppingList = use('App/Model/IngredientShoppingList')

class ShoppingListController {

  * index(request, response) {

    const userId = request.input('id')
    let cooker = yield Cooker.findBy('user_id', userId)

    const shoppingList = yield cooker.shoppingLists().with('recipeIngredients.ingredient').active().fetch()
    console.log(shoppingList)
    // response.json(yield request.auth.getUser())
    // console.log(shoppingList)

    // const shoppingList = yield ShoppingList.findBy('cooker_id', cooker.id)
    // console.log(shoppingList.recipeIngredients())
     return response.send(shoppingList)

  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
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
    // const record_id = request.input('id')
    // const record_id = request.param('id')
    // console.log(record_id)
    // const findItemForRemovalFromList = yield IngredientShoppingList.findBy('id', record_id)
    // console.log(findItemForRemovalFromList)
    // yield findItemForRemovalFromList.delete()
    //
    // return response.send(true)

  }

}

module.exports = ShoppingListController
