import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function sharedStateReducer (state = {sharedMessage: 'Welcome',
  // currentUser: {}
  }, action) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case 'MESSAGE':
      newState.sharedMessage = action.message
      break
    // case 'CURRENT_USER':
    //   newState.currentUser = action.user
    //   break
  }

  return newState
}

function sharedUserReducer (state = {
  currentUser: JSON.parse(sessionStorage.getItem('user'))
}, action) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case 'CURRENT_USER':
      newState.currentUser = action.user
      break
  }


  return newState
}

function recipeReducer (state = {
  resultSize: 20,
  favoriteCount: 0,
  favoriteRecipes: [],
  displayFavorites: false,
  refreshShoppingList: false
}, action) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case 'RESULT_SIZE':
      newState.resultSize = action.resultSize
      break

    case 'FAVORITE_COUNT':
      newState.favoriteCount = action.favoriteCount
      break

    case 'FAVORITE_RECIPES':
      newState.favoriteRecipes = action.favoriteRecipes
      break

    case 'DISPLAY_FAVORITES':
      newState.displayFavorites = action.displayFavorites
      break

    case 'LIST_REFRESH':
      newState.refreshShoppingList = action.refreshShoppingList
      break
  }

      return newState
}

function sharedListReducer (state = {
  amount: 0,
  payment: false
}, action) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case 'AMOUNT':
      newState.amount = action.amount
      break
    case 'PAYMENT_SUCCESS':
      newState.paymentSuccess = action.paymentSuccess
      break
  }
  return newState
}

function sharedOrderReduer (state = { active: [], available: [], activeCount: '', availableCount: '', component: {}}, action) {
    var newState = Object.assign({}, state)

    switch (action.type) {
      case 'ACTIVE':
          newState.active = action.active
          break
      case 'AVAILABLE':
          newState.available = action.available
          break
      case 'ACTIVE_COUNT':
          newState.activeCount = action.activeCount
          break
      case 'AVAILABLE_COUNT':
          newState.availableCount = action.availableCount
          break
      case 'COMPONENT':
          newState.component = action.component
          break
    }
    return newState
}

const store = createStore(
  combineReducers({
    sharedState: sharedStateReducer,
    sharedUser: sharedUserReducer,
    sharedRecipe: recipeReducer,
    sharedList: sharedListReducer,
    sharedOrder: sharedOrderReduer,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
