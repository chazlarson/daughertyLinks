import React, { Component } from 'react';
import { getRequestToken, pocketReroute } from '../services/pocketServices';

class PocketAuth extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }
    signIn() {
      getRequestToken()
        .then(res => res.json())
        .then(res => {
          console.log(res.code);
          var win = window.open(pocketReroute(res.code) , "SignIn", "");
          var pollTimer = window.setInterval(function() {
            if (win.closed !== false) {
              alert('dialog closed');
              window.clearInterval(pollTimer);
            }
          }, 200);
        })
        .catch(e => console.log(e));
    }
    render() {
        return (
          <button onClick={this.signIn} >Sign in</button>);
  }
}

  export default PocketAuth