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
  currentUser: JSON.parse(sessionStorage.getItem('user')),
  favoriteCount: 0
}, action) {
  var newState = Object.assign({}, state)

  switch (action.type) {
    case 'CURRENT_USER':
      newState.currentUser = action.user
      break
  }

  switch (action.type) {
    case 'FAVORITE_COUNT':
      newState.favoriteCount = action.favoriteCount
      break
  }

  return newState
}

const store = createStore(
  combineReducers({
    sharedState: sharedStateReducer,
    sharedUser: sharedUserReducer,
    routing: routerReducer
  })
)

export default store
