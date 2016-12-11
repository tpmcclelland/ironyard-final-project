import React from 'react'
import WelcomeHeader from './WelcomeHeader'

class WelcomeLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="welcome">
      <WelcomeHeader />
      <main>
            {this.props.children}
      </main>
    </div>
  }
}

export default WelcomeLayout
