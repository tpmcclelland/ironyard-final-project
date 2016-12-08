'use strict'
const Hash = use('Hash')

const Ingredient = exports = module.exports = {}

Ingredient.fillUnitCost = function * (next) {
  this.unit_cost = Number((Math.random() * 10)).toFixed(2)
  yield next
}
