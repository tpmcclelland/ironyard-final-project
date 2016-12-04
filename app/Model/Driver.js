'use strict'

const Lucid = use('Lucid')

class Driver extends Lucid {
    user () {
        return this.belongsTo('App/Model/User')
    }

    orders () {
      return this.hasMany('App/Model/Order')
    }

    ratings() {
      return this.hasMany('App/Model/Rating')
    }
}

module.exports = Driver
