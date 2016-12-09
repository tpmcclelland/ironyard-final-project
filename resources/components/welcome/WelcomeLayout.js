import React from 'react'
import WelcomeLeftNav from './WelcomeLeftNav'
// import MasterLeftNav from '../leftNav/MasterLeftNav'

// const WelcomeLayout = (props) => <div>
//     {props.children}
// </div>
class WelcomeLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div id="welcome">
      <main className="row">
        {/*<WelcomeLeftNav />*/}
        <div id="order" className="col-xs-12">
          <section className="col-xs-12 main-section landing-page">
            {this.props.children}
          </section>
        </div>
      </main>
    </div>
  }
}

export default WelcomeLayout


// <WelcomeLeftNav />
