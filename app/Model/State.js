'use strict'

const Lucid = use('Lucid')

class State extends Lucid {
    orders () {
      return this.hasMany('App/Model/Order')
    }
}

module.exports = State
