
'use strict'

const User = use('App/Model/User')
const Cooker = use('App/Model/Cooker')
const Driver = use('App/Model/Driver')
const Hash = use('Hash')

class RegisterController {
  // * index(request, response) {
  //   yield response.sendView('register')
  // }

  * register(request, response) {
    const user = new User()
    const cooker = new Cooker()
    const driver = new Driver()
    var error = false

    const signupType = request.input('type')

    user.username = request.input('username')
    user.email = request.input('email')
    // user.password = yield Hash.make(request.input('password'))
    user.password = request.input('password')
    user.first_name = request.input('first_name')
    user.last_name = request.input('last_name')
    user.phone = request.input('phone')

    yield user.save()

    switch (signupType) {
      case 'cooker':
        cooker.home_address = request.input('address');
        cooker.home_city = request.input('city');
        cooker.home_state = request.input('state');
        cooker.home_zip = request.input('zip');

        yield user.cooker().save(cooker);
        break;
      case 'driver':
        driver.license = request.input('license');
        driver.license_expiration = request.input('license_expiration');
        driver.driving_location = request.input('driving_location');

        yield user.driver().save(driver);
        break;
      default:
        error = true;

    }

    yield request.auth.login(user)


    var registerMessage = {
      success: 'Success',
      error: 'Error creating user'
    }

    response.json({
      registerMessage : error? registerMessage.error: registerMessage.success,
      user: {user, cooker, driver},
      type: signupType
    })
  }
}

module.exports = RegisterController
