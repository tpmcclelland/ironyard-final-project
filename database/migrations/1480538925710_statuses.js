'use strict'

const Schema = use('Schema')

class StatusesTableSchema extends Schema {

  up () {
    this.create('statuses', (table) => {
      table.increments()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('statuses')
  }

}

module.exports = StatusesTableSchema
