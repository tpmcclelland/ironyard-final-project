'use strict'

const ShoppingList = use('App/Model/ShoppingList')
const Cooker = use('App/Model/Cooker')
// const IngredientShoppingList = use('App/Model/IngredientShoppingList')

class ShoppingListController {

  * index(request, response) {

    const userId = request.input('id')
    let cooker = yield Cooker.findBy('user_id', userId)

    const shoppingList = yield cooker.shoppingLists().with('recipeIngredients.recipe','recipeIngredients.ingredient').active().fetch()

    return response.json(shoppingList)

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
    const shoppingList = yield ShoppingList.query().where('id', request.param('id'))
    console.log(shoppingList)
    shoppingList.update('order_id', request.input('order_id'))
    yield shoppingList.save()

    response.send(shoppingList.order_id)
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
