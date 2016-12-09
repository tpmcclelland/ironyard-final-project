import React, { Component } from 'react'

import CookerLayout from './CookerLayout'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import classAutoBind from 'react-helpers/dist/classAutoBind'

class Cooker extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

    }

    componentWillUnMount() {

    }

    componentDidMount() {
      store.dispatch({type:'RESULT_SIZE', resultSize: 20})
    }

    render() {
        return <CookerLayout>
          {this.props.children}
        </CookerLayout>
    }
}

const mapStateToProps = function(store) {
  return {
    currentUser: store.sharedUser.currentUser
  }
}

export default connect(mapStateToProps)(Cooker)
