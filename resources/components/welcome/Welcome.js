import React from 'react'

import WelcomeLayout from './WelcomeLayout'
import Recipes from '../cooker/Recipes'


class Welcome extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <WelcomeLayout>
            <h1>Welcome</h1>
            <Recipes resultSize={5} />
        </WelcomeLayout>
    }
}

export default Welcome
