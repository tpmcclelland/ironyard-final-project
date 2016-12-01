'use strict'
const Env = use('Env')

class LandingController {

  * index(request, response) {
      yield response.sendView('template')
    }
}

module.exports = LandingController
