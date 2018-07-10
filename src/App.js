import React, { Component } from 'react';
import './App.css';
import { getRequestToken, pocketAuth } from './services/pocketServices';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const setState = this.setState.bind(this);
    getRequestToken()
      .then(res => res.json())
      .then(res => {
        console.log(res.code);
        setState({'code' : res.code});
        window.open(pocketAuth(res.code))
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div className="App">
      <button onClick={this.signIn}>sign in</button>
      </div>
    );
  }
}

mapDispatchToProps = function()

export default connect(mapStateToProps, mapDispatchToProps)(App);
