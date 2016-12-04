'use strict'

const Lucid = use('Lucid')

class Rating extends Lucid {
  driver () {
    return this.belongsTo('App/Model/Driver')
  }
}

module.exports = Rating
