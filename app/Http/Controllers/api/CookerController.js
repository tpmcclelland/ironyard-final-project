'use strict'

const Favorite = use('App/Model/Favorite')
const Cooker = use('App/Model/Cooker')


class CookerController {

  * index(request, response) {
    //
    response.send('This is the cooker page')
  }

  * create(request, response) {

  }

  * store(request, response) {

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

  * favorites(request, response) {

    const user = request.params('id')

    const favorites = yield Favorite.query().where('cooker_id', user.id).with('recipe.ingredients').fetch()

    response.json(favorites)

  }

}

module.exports = CookerController
