'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


Route.group('v1', function () {
 Route.resource('/cookers', 'api/CookerController')
 Route.resource('/drivers', 'api/DriverController')
 Route.resource('/favorites', 'api/FavoriteController')
 Route.resource('/ingredients', 'api/IngredientController')
 Route.resource('/orders', 'api/OrderController')
 Route.resource('/recipes', 'api/RecipeController')
 Route.resource('/shoppinglists', 'api/ShoppingListController')
 Route.resource('/shoppinglistIngredient', 'api/ShoppingListIngredientController')
 Route.resource('/statuses', 'api/StatusController')
 Route.resource('/stores', 'api/StoreController')
 Route.resource('/users', 'api/UserController')
 Route.resource('/reviews', 'api/ReviewController')
 Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')
 Route.post('/register', 'RegisterController.register')
  Route.post('/payment', 'api/PaymentController.charge')
  Route.post('/payment/save', 'api/PaymentController.saveOrder')
  Route.get('/cooker/:id/favorites', 'api/CookerController.favorites')
}).prefix('/api/v1')


Route.any('*', function * (request, response) {
  yield response.sendView('index')
})
