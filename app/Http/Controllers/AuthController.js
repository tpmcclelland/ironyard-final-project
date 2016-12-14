'use strict'

const User = use('App/Model/User')
const Cooker = use('App/Model/Cooker')
const Driver = use('App/Model/Driver')

class AuthController {

  * login(request, response) {
    try {
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

        const cooker = yield Cooker.findBy('user_id', user.id)
        const driver = yield Driver.findBy('user_id', user.id)

        var type
        cooker ? type = 'cooker' : type = 'driver'

        return response.json({success: loginMessage.success, user: {user, cooker, driver}, route: type})
      }

      response.json({error: loginMessage.error})
    } catch (e) {
      console.error(e)
      response.json({error: e.message})
    }
  }

  * logout(request, response) {
    try {
      yield request.auth.logout()
      return response.json({success: true})
    } catch(e) {
      console.error(e)
      return response.json({error: e.message})
    }

  }
}

module.exports = AuthController
