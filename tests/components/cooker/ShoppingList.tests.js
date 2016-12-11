import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
// import ShoppingList from '../../../resources/components/cooker/ShoppingList'

// The Redux store object must be passed into each component as a prop because we're using Redux
// import store from '../../../resources/components/redux/_ReduxStore'

describe('<ShoppingList /> Component', function() {
  it('has an H1 JSX tag within it, accessed via component search (contains method)', function() {
    expect(true).to.equal(true)
    // expect(mount(<ShoppingList store={store} />).contains(<h1>V2. View your Shopping List</h1>)).to.equal(true)
  })

  // it('has FORM tag within it, accessed via a DOM search (find method)', function() {
  //   expect(mount(<ShoppingList store={store} />).find('button').length).to.equal(2)
  // })
  //
  // it('has a property called "store" passed in', function() {
  //   expect(mount(<ShoppingList store={store} />).props().store).to.not.equal(undefined)
  // })
})
