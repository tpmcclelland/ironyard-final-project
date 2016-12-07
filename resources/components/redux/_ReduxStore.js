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
  resultSize: 4,
  favoriteCount: 0,
  favoriteRecipes: [],
  displayFavorites: false
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
  }

      return newState
}

const store = createStore(
  combineReducers({
    sharedState: sharedStateReducer,
    sharedUser: sharedUserReducer,
    sharedRecipe: recipeReducer,
    routing: routerReducer
  })
)

export default store
