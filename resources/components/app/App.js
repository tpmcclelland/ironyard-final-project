import React from 'react'

import AppLayout from './AppLayout'

class App extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <AppLayout>
            {this.props.children}
        </AppLayout>
    }
}

export default App
