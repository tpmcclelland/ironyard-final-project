'use strict'

const Cooker = use('App/Model/Cooker')

class FavoriteController {

  * index(request, response) {

    const user = yield request.auth.getUser()
    const cooker = yield Cooker.findBy('user_id', user.id)

    return response.json(cooker.favorites().fetch())
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

module.exports = FavoriteController
