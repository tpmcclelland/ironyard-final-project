'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  driver () {
    return this.hasOne('App/Model/Driver')
  }

  cooker () {
    return this.hasOne('App/Model/Cooker')
  }

}

module.exports = User
