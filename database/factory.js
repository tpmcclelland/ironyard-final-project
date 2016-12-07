'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| User Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for User Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/
Factory.blueprint('App/Model/User', (fake) => {
  return {
    username: fake.username(),
    email: fake.email(),
    password: fake.password(),
    first_name: fake.first(),
    last_name: fake.last(),
    phone: fake.string({length: 10})
  }
})

Factory.blueprint('App/Model/Driver', (fake) => {
  return {
    license: fake.integer({min: 1}),
    license_expiration: fake.date(),
    driving_location: fake.coordinates(),
    driving_location_lat: fake.latitude(),
    driving_location_long: fake.longitude()
  }
})

Factory.blueprint('App/Model/Cooker', (fake) => {
  return {
    stripe_id: fake.guid(),
    home_address: fake.address(),
    home_city: fake.city(),
    home_state: fake.state(),
    home_zip: fake.zip(),
    home_lat: fake.latitude(),
    home_long: fake.longitude()
  }
})

Factory.blueprint('App/Model/Recipe', (fake) => {
  return {
    api_id: fake.string({length: 15}),
    name: fake.sentence({words: 5}),
    serving_size: fake.natural({min: 1, max: 7}),
    instructions: fake.paragraph(),
    prep_time: fake.minute(),
    total_time: fake.minute(),
    cook_time: fake.minute(),
    image: fake.avatar({protocol: 'https'})
  }
})

Factory.blueprint('App/Model/IngredientRecipe', (fake) => {
  return {
    quantity: fake.integer({min: 1, max: 10}),
    unit: fake.string({length: 6})
  }
})

Factory.blueprint('App/Model/Ingredient', (fake) => {
  return {
    name: fake.string({length: 8}),
    unit_cost: fake.integer({min: 1, max: 20})
  }
})

Factory.blueprint('App/Model/State', (fake) => {
  return {
    // type: fake.string({length: 6})
  }
})

Factory.blueprint('App/Model/Favorite', (fake) => {
  return {

  }
})


Factory.blueprint('App/Model/Store', (fake) => {
  return {
    name: fake.string({length: 8}),
    address: fake.address(),
    city: fake.city(),
    state: fake.state(),
    zip: fake.zip(),
    location_lat: fake.latitude(),
    location_long: fake.longitude()
  }
})

Factory.blueprint('App/Model/ShoppingList', (fake) => {
  return {
    estimated_price: fake.floating({min: 0, max: 5, fixed: 2}),
  }
})

Factory.blueprint('App/Model/Order', (fake) => {
  return {
    total_cost: fake.floating({min: 0, max: 100, fixed: 2}),
    delivery_start_time: fake.date(),
    delivery_end_time: fake.date(),
    payment_received: fake.bool(),
    driver_paid: fake.bool()
  }
})

Factory.blueprint('App/Model/IngredientShoppingList', (fake) => {
  return {
    quantity: fake.integer({min: 1, max: 5}),
    unit: fake.string({length: 5})
  }
})

Factory.blueprint('App/Model/Rating', (fake) => {
  return {
    rating: fake.integer({min: 1, max:5})

  }
})

Factory.blueprint('App/Model/Review', (fake) => {
  return {
    review: fake.paragraph()
  }
})
