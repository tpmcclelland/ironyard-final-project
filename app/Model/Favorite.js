'use strict'

const Lucid = use('Lucid')

class Favorite extends Lucid {
    recipe () {
        return this.belongsTo('App/Model/Recipe')
    }

    cooker () {
        return this.belongsTo('App/Model/Cooker')
    }
}

module.exports = Favorite
