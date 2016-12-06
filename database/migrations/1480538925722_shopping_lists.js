'use strict'

const Schema = use('Schema')

class ShoppingListsTableSchema extends Schema {

  up () {
    this.create('shopping_lists', (table) => {
        table.increments()
        table.float('estimated_price')

        table.integer('cooker_id').references('id').inTable('cookers')
        table.integer('order_id').references('id').inTable('orders')

        table.index('cooker_id')
        table.index('order_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('shopping_lists')
  }

}

module.exports = ShoppingListsTableSchema
