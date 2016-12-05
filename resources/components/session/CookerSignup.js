import React from 'react'
import { Link, browserHistory} from 'react-router'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { sharedState, attachSharedState, detachSharedState } from 'react-helpers/dist/sharedState'

class CookerSignup extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        // this.state = sharedState()
        this.state = {
            username: '',
            email: '',
            password: '',
            // avatar: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            mock: false
        }
    }

    componentDidMount() {
        attachSharedState(this, (state) => this.setState({sharedState: state}))
        // attachSharedState(this)
    }

    componentWillUnmount() {
        detachSharedState(this)
    }

    mockResponse() {
        var response = {
            user: {
                id: 1,
                username: 'Tom',
                email: 'me@me.com',
                avatar: '',
                api_token: 'xxxxxxxxxxxxx'
            }
        }

        this.signedUpHandler(response)
    }


  signup() {
        if(!this.state.mock) {
            fetch('/api/v1/register', {
              method: 'POST',
              credentials: 'same-origin',
              body: JSON.stringify({
                type: 'cooker',
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
              }),
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
            .then(this.signedUpHandler)
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message)
            })
        } else {
            this.mockResponse()
        }
    }

    signedUpHandler(response){
        // response = ['error 1', 'error 2']
        // response.user = undefined
        // console.log(this.state)
        // console.log(response)

        if(typeof response.user != 'undefined') {
            sessionStorage.setItem('user', JSON.stringify(response.user))

          browserHistory.push('/cooker')
        // } else {
        //     response.forEach(function(error) {
        //         var errorDiv = document.createElement('div')
        //         errorDiv.classList.add('alert', 'alert-danger')
        //         errorDiv.innerHTML = error
        //         document.querySelector('#errors').appendChild(errorDiv)
        //     })
        }
      }

    handleClick() {
         this.signup()
    }

    // handleChanges(event) {
    //   var updatedState = {}
    //   updatedState[event.target.name] = event.target.value
    //   this.setState(updatedState)
    // }

    render() {
        return  <div className="well">
                    <h2>Cooker Sign Up</h2>
                    <br/>
                    <div id="errors"></div>
                    <br/>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" className="form-control" required value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" id="avatar" name="avatar" className="form-control" required onChange={(e) => this.setState({avatar:e.target.files[0]})}/>
                      </div> */}
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-control" required value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="form-control" required value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" className="form-control" required value={this.state.address} onChange={(e) => this.setState({address: e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" className="form-control" required value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" className="form-control" required value={this.state.state} onChange={(e) => this.setState({state: e.target.value})}/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="state">Zip</label>
                        <input type="text" id="zip" name="zip" className="form-control" required value={this.state.zip} onChange={(e) => this.setState({zip:e.target.value})}/>
                      </div>
                      <div className="form-group">
                        <button id="signup" type="button" className="btn btn-success btn-block" onClick={this.handleClick}>Sign Up</button>
                      </div>
                      <div className="form-group">
                          <Link to='/' className="btn btn-danger btn-block">Cancel </Link>
                      </div>
                </div>
    }
}

export default CookerSignup
