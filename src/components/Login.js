import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPocketRequest, getPocketLinks, pocketAccessSuccess, removePocketData } from '../actions/pocket.actions';



function mapStateToProps(state) {
  return {
    reqToken: state.pocket.reqToken,
    accessToken: state.pocket.accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    getPocketRequest: bindActionCreators(getPocketRequest, dispatch),
    getPocketLinks: bindActionCreators(getPocketLinks, dispatch),
    pocketAccessSuccess: bindActionCreators(pocketAccessSuccess, dispatch),
    removePocketData: bindActionCreators(removePocketData, dispatch),
  };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
      const accessTokenCookie = this.props.cookies.get('pocketAccessToken')
      // if cookie found, and accesstoke not stored, store access token from cookie and fetch links
      if (accessTokenCookie && !this.props.accessToken) {
        // consider creating new single action creator to reduce re-renders
        this.props.pocketAccessSuccess(accessTokenCookie);
        this.props.getPocketLinks(accessTokenCookie);
      }

    }

    componentWillReceiveProps(nextProps) {
      // set cookie if ! cookie found, and diff accessToken
      const accessTokenCookie = this.props.cookies.get('pocketAccessToken')

      if(nextProps.accessToken && (this.props.accessToken !== nextProps.accessToken) && !accessTokenCookie) {
        this.props.cookies.set('pocketAccessToken', nextProps.accessToken, { path: '/' });
      }
    }

    signIn() {
      this.props.getPocketRequest();
    }

    signOut() {
      // delete cookie and remove all pocketData from redux store
      this.props.cookies.remove('pocketAccessToken', { path: '/' });
      this.props.removePocketData();
    }

    render() {
        return (
          <div>
          { this.props.cookies.get('pocketAccessToken' || this.props.accessToken) ?
            <button className="btn btn-primary-danger" onClick={this.signOut} >Logout</button> :
            <button className="btn btn-primary" onClick={this.signIn} >Login</button>
          }
        </div> )
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Login)