
'use strict'

const User = use('App/Model/User')
const Cooker = use('App/Model/Cooker')
const Hash = use('Hash')

class RegisterController {
  // * index(request, response) {
  //   yield response.sendView('register')
  // }

  * register(request, response) {
    const user = new User()
    const cooker = new Cooker()

    user.username = request.input('username')
    user.email = request.input('email')
    // user.password = yield Hash.make(request.input('password'))
    user.password = request.input('password')


    cooker.home_address = request.input('address')
    cooker.home_city = request.input('city')
    cooker.home_state = request.input('state')
    cooker.home_zip = request.input('zip')

    yield user.save()
    yield user.cooker().save(cooker)
    yield request.auth.login(user)


    var registerMessage = {
      success: 'Success'
    }

    response.json({
      registerMessage : registerMessage,
      user: user
    })
  }
}

module.exports = RegisterController
