import React from 'react'

import WelcomeLayout from './layouts/WelcomeLayout'


class Welcome extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <WelcomeLayout>
            <h1>Welcome</h1>
        </WelcomeLayout>
    }
}

export default Welcome
