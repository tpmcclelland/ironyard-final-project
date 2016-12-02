'use strict'

const Lucid = use('Lucid')

class Cooker extends Lucid {
  user () {
      return this.belongsTo('App/Model/User')
  }

  favorites () {
    return this.hasManyThrough('App/Model/Recipe', 'App/Model/Favorite')
  }

  shoppingLists () {
    return this.hasMany('App/Model/ShoppingList')
  }

  orders () {
  return this.hasManyThrough('App/Model/Order', 'App/Model/ShoppingList')
  }

//This was the rails model code to get favorite recipes for a cooker
// has_many :favorite_recipes, through: :favorites, source: :recipe

}

module.exports = Cooker
