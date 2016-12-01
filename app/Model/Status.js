'use strict'

const Lucid = use('Lucid')

class Status extends Lucid {
    orders () {
      return this.hasMany('App/Model/Order')
    }
}

module.exports = Status
