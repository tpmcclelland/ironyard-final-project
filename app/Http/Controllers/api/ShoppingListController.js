'use strict'

const ShoppingList = use('App/Model/ShoppingList')
const Cooker = use('App/Model/Cooker')

class ShoppingListController {

  * index(request, response) {

    const userId = request.input('id')
    let cooker = yield Cooker.findBy('user_id', userId)

    // response.json(cooker.shoppingLists())
    // response.json(yield request.auth.getUser())

    const shoppingList = yield ShoppingList.findBy('cooker_id', cooker.id)
    // console.log(shoppingList.recipeIngredients())
    return response.json({shoppingListId: shoppingList.id, ingredients: shoppingList})

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
