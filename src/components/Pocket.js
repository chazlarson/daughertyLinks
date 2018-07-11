import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPocketRequest } from '../actions/pocket.actions';



function mapStateToProps(state) {
  return {
    reqToken: state.pocketAuth.reqToken
  };
}

function mapDispatchToProps(dispatch) {
  return { getPocketRequest: bindActionCreators(getPocketRequest, dispatch) };
}

class PocketAuth extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }
    signIn() {
      this.props.getPocketRequest();
    }
    render() {
        return (
          <button onClick={this.signIn} >Sign in</button>);
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(PocketAuth)