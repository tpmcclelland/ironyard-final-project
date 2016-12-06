'use strict'

const ShoppingList = use('App/Model/ShoppingList')
const Cooker = use('App/Model/Cooker')

class ShoppingListController {

  * index(request, response) {

    const userId = request.input('id')
    let cooker = yield Cooker.findBy('user_id', userId)

    const shoppingList = yield cooker.shoppingLists().with('recipeIngredients.ingredient').active().fetch()
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
  }

}

module.exports = ShoppingListController
