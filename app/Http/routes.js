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

Route.get('/profile', 'SessionController.profile')
Route.post('/login', 'SessionController.login')

Route.group('v1', function () {
 Route.resource('/cookers', 'api/CookerController')
 Route.resource('/drivers', 'api/DriverController')
 Route.resource('/favorites', 'api/FavoriteController')
 Route.resource('/ingredients', 'api/IngredientController')
 Route.resource('/orders', 'api/OrderController')
 Route.resource('/recipes', 'api/RecipeController')
 Route.resource('/shoppinglists', 'api/ShoppingListController')
 Route.resource('/statuses', 'api/StatusController')
 Route.resource('/stores', 'api/StoreController')
 Route.resource('/users', 'api/UserController')
}).prefix('/api/v1')


Route.any('*', function * (request, response) {
  yield response.sendView('index')
})
