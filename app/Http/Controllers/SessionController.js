'use strict'

class SessionController {


  * profile (request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      response.ok(user)
      return
    }
    response.unauthorized('You must login to view your profile')
  }

}

module.exports = SessionController


