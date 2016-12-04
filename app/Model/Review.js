'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
  order () {
    return this.belongsTo('App/Model/Order')
  }
}

module.exports = Review
