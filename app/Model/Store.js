'use strict'

const Lucid = use('Lucid')

class Store extends Lucid {
    orders () {
      return this.hasMany('App/Model/Order')
    }
}

module.exports = Store
