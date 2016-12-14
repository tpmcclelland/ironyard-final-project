import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import update from 'react-addons-update';
import ShoppingListItem from './ShoppingListItem'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import store from '../redux/_ReduxStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            recipeIngredients: []
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.fetchIngredients()

    }

    // componentWillReceiveProps(nextProps) {
    //   this.fetchIngredients()
    // }

    fetchIngredients() {
      var user = JSON.parse(sessionStorage.getItem('user'))

      fetch('/api/v1/shoppinglists?id=' + user.user.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.handleInitialFetch)
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })

    }

    handleInitialFetch(response) {
      // console.log('tom fetch', response)
      this.setState({
        recipeIngredients: response[0].shoppingListIngredients
      })

    }

    componentWillUnmount() {

    }


    markRemoved(i) {
      var items = this.state.recipeIngredients

      fetch('/api/v1/shoppinglistIngredient/' + items[i].id, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(response => {
          items.splice(i, 1)

          this.setState({
            recipeIngredients: items
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })

    }

    changeQuantity(i, quantity) {
      var items = this.state.recipeIngredients


      fetch('/api/v1/shoppinglistIngredient/' + items[0].id, {
          method: 'PATCH',
          credentials: 'same-origin',
          body: JSON.stringify({
            quantity: quantity
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(function(response) {
            if(response.ok) {
              return response.json()
            } else {
              throw 'Network response was not ok.'
            }
          })
          .then(response => {
            items[i].quantity = quantity

            this.setState({
              recipeIngredients: items
            })
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
          })
    }

    clearList() {

      this.setState({
        recipeIngredients: []
      })

    }

    schedule() {
      browserHistory.push('/cooker/schedule')
    }

    render() {


      var ShoppingListItems = this.state.recipeIngredients.map((ingredient, i) =>{
        return <ShoppingListItem item={ingredient} changeQuantity={(quantity) => this.changeQuantity(i, quantity)} key={i} markRemoved={() => this.markRemoved(i)}/>
      })

        return <ReactCSSTransitionGroup
          transitionName="component"
          transitionAppear={true}
          transitionAppearTimeout={2000}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="shopping col-xs-12">
          <h1 className="heading">Shopping List</h1>
          <p>Make any changes necessary to the quantities or remove items before completing your order. <br /> Click the ingredient quantity to edit.</p>
          {/*<button type="button" className="btn btn-default btn-danger" onClick={this.clearList}>Remove All</button>*/}
          <ul className="list-group">
            <ReactCSSTransitionGroup
              transitionName="list"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {ShoppingListItems}
            </ReactCSSTransitionGroup>
          </ul>
            <div className="col-xs-6 col-xs-offset-3">
              <button type="button" className="btn btn-block btn-default schedule-button" onClick={this.schedule}>Schedule</button>
            </div>
        </div>
        </ReactCSSTransitionGroup>
    }
}

const mapStateToProps = function(store) {
  return {
    refreshShoppingList: store.sharedRecipe.refreshShoppingList
  }
}

export default connect(mapStateToProps)(ShoppingList)
