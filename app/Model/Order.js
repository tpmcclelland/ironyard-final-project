'use strict'

const Lucid = use('Lucid')

class Order extends Lucid {
    state () {
        return this.belongsTo('App/Model/State')
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

    review() {
      return this.hasOne('App/Model/Review')

    }

}

module.exports = Order
