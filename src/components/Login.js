import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPocketRequest } from '../actions/pocket.actions';



function mapStateToProps(state) {
  return {
    reqToken: state.pocket.reqToken
  };
}

function mapDispatchToProps(dispatch) {
  return { getPocketRequest: bindActionCreators(getPocketRequest, dispatch) };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }
    signIn() {
      this.props.getPocketRequest();
    }
    render() {
        return (
          <button className="btn btn-primary" onClick={this.signIn} >Login</button>);
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Login)