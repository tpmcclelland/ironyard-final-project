'use strict'

const Lucid = use('Lucid')

class Order extends Lucid {
    status () {
        return this.belongsTo('App/Model/Status')
    }

    driver () {
        return this.belongsTo('App/Model/Driver')
    }

    store () {
        return this.belongsTo('App/Model/Store')
    }

    shoppingList () {
      return this.hasOne('App/Model/ShoppingList')
    }

}

module.exports = Order
