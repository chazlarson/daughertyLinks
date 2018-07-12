import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPocketRequest } from '../actions/pocket.actions';



function mapStateToProps(state) {
  return {
    reqToken: state.pocket.reqToken,
    accessToken: state.pocket.accessToken
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

    componentWillReceiveProps(nextProps) {
      // set cookie if ! cookie found, and diff accessToken
      if((this.props.accessToken !== nextProps.accessToken) && !this.props.cookies.get('pocketAccessToken')) {
        this.props.cookies.set('pocketAccessToken', this.props.accessToken, { path: '/' });
      }
    }


    signIn() {
      this.props.getPocketRequest();
    }

    render() {
        return (
          <div>
          { this.props.cookies.get('pocketAccessToken' || this.props.accessToken) ?
            <button className="btn btn-primary-danger" >Do Nothing!</button> :
            <button className="btn btn-primary" onClick={this.signIn} >Login</button>
          }
        </div> )
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Login)