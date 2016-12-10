'use strict'
const IngredientShoppingList = use('App/Model/IngredientShoppingList')

class ShoppingListIngredientController {

  * index(request, response) {

    const shopping_list_id = request.input('shopping_list_id')
    const ingredient_recipe_id = request.input('ingredient_recipe_id')
    const shoppingList = yield IngredientShoppingList
      .query()
      .where("shopping_list_id", shopping_list_id)
      .where("ingredient_recipe_id", ingredient_recipe_id)
      .fetch()
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
    const id = request.param('id')
    const quantity = request.input('quantity')
    const ingredient = yield IngredientShoppingList.findBy('id', id)

    if(quantity !== '') {
      ingredient.quantity = quantity
      yield ingredient.save()
    }

    return response.send(true)
  }

  * destroy(request, response) {
    const record_id = request.param('id')
    console.log(record_id)
    const findItemForRemovalFromList = yield IngredientShoppingList.findBy('id', record_id)
    console.log(findItemForRemovalFromList)
    yield findItemForRemovalFromList.delete()

    return response.send(true)
  }

}

module.exports = ShoppingListIngredientController
