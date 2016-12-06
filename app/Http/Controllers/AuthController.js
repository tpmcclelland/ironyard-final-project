'use strict'

const User = use('App/Model/User')
const Cooker = use('App/Model/Cooker')
const Driver = use('App/Model/Driver')

class AuthController {

  // * index(request, response) {
  //   yield response.sendView('login')
  // }

  * login(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    const loginMessage = {
      success: 'Logged-in Successfully!',
      error: 'Invalid Credentials'
    }

    // Attempt to login with email and password
    const authCheck = yield request.auth.attempt(email, password)
    if (authCheck) {
      const user = yield request.auth.getUser()

      // const user = request.currentUser

      // console.log(user)

      const cooker = yield Cooker.findBy('user_id', user.id)
      const driver = yield Driver.findBy('user_id', user.id)

      var type
      // user.cooker()? type = 'cooker': type = 'driver'
      cooker? type = 'cooker': type = 'driver'

      // console.log(user.cooker().id)
      // console.log(user.driver().id)

      return response.json({success: loginMessage.success, user: {user, cooker, driver}, route: type})
    }

    yield response.json({ error: loginMessage.error })
  }

  * logout(request, response) {
    yield request.auth.logout()

    return response.json(true)
  }
}

module.exports = AuthController
