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
    
    review () {
      return this.hasOne('App/Model/Review')
    }

    shoppingList () {
      return this.hasOne('App/Model/ShoppingList')
    }



  static scopePending (builder) {
    builder.where('state_id', null)
  }

}

module.exports = Order
