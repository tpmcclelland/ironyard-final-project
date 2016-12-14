

import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import ShoppingList from '../../../resources/components/cooker/ShoppingList'

// The Redux store object must be passed into each component as a prop because we're using Redux
import store from '../../../resources/components/redux/_ReduxStore'



describe('mounts with a Shopping List heading', function() {
  it('has an H1 JSX tag within it, accessed via component search (contains method)', function() {
    // expect(true).to.equal(true)
    expect(mount(<ShoppingList store={store} />).contains(<h1 className="heading">Shopping List</h1>)).to.equal(true)
  })

  // it('render with state', function() {
  //   const component = mount(<ShoppingList store={store} />)
  //
  //   component.setState({
  //     recipeIngredients: JSON.parse('[{"id":9,"estimated_price":null,"cooker_id":1,"order_id":null,"created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","shoppingListIngredients":[{"id":62,"shopping_list_id":9,"ingredient_recipe_id":1,"quantity":8,"unit":"oz","created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","recipeIngredient":{"id":1,"quantity":8,"unit":"oz","recipe_id":1,"ingredient_id":1,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32","ingredient":{"id":1,"name":"cream cheese, softened","unit_cost":3.61,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32"}}},{"id":63,"shopping_list_id":9,"ingredient_recipe_id":5,"quantity":8,"unit":"oz","created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","recipeIngredient":{"id":5,"quantity":8,"unit":"oz","recipe_id":1,"ingredient_id":2,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32","ingredient":{"id":2,"name":"feta cheese, crumbled","unit_cost":6.54,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32"}}},{"id":64,"shopping_list_id":9,"ingredient_recipe_id":3,"quantity":null,"unit":null,"created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","recipeIngredient":{"id":3,"quantity":null,"unit":null,"recipe_id":1,"ingredient_id":3,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32","ingredient":{"id":3,"name":"⅓ cup chives, chopped","unit_cost":2.23,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32"}}},{"id":65,"shopping_list_id":9,"ingredient_recipe_id":2,"quantity":4,"unit":null,"created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","recipeIngredient":{"id":2,"quantity":4,"unit":null,"recipe_id":1,"ingredient_id":5,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32","ingredient":{"id":5,"name":"flour tortillas (10 inch)","unit_cost":6.05,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32"}}},{"id":66,"shopping_list_id":9,"ingredient_recipe_id":4,"quantity":1,"unit":null,"created_at":"2016-12-14 12:29:03","updated_at":"2016-12-14 12:29:03","recipeIngredient":{"id":4,"quantity":1,"unit":null,"recipe_id":1,"ingredient_id":4,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32","ingredient":{"id":4,"name":"½ cups dried cranberries","unit_cost":9.83,"created_at":"2016-12-14 09:24:32","updated_at":"2016-12-14 09:24:32"}}}]}]')[0].shoppingListIngredients
  //   })
  //
  //   component.update()
  //
  //   // console.log('tom', component.html())
  //   // expect(component.state('recipeIngredients').length).to.equal(5)
  //   // expect(component.find('.list-group').children()).to.have.length(5)
  //   // expect(component.find('ShoppingListItem')).to.have.length(5)
  //
  //
  //   // expect(mount(<ShoppingList store={store} />).contains(<h1 className="heading">Shopping List</h1>)).to.equal(true)
  // })

  // it('has FORM tag within it, accessed via a DOM search (find method)', function() {
  //   expect(mount(<ShoppingList store={store} />).find('button').length).to.equal(2)
  // })
  //
  // it('has a property called "store" passed in', function() {
  //   expect(mount(<ShoppingList store={store} />).props().store).to.not.equal(undefined)
  // })
})
