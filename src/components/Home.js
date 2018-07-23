import React, { Component } from 'react';
import Wrapper from './Wrapper.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from '../actions/daugherty-links.actions';
import { updateSelectedTab } from '../actions/tabs.action';
import { withCookies } from 'react-cookie';
import 'airbnb-js-shims';
import {getLinks, initialize, signIn} from '../actions/firebase.actions';

function mapStateToProps(state) {
  return {
    links: state.links,
    tabs: state.tabs,
    lastFetch: state.firebase.lastFetch,
    daughertyLinks: state.firebase.firebaseLinks,
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    getDaughertyLinks: bindActionCreators(getDaughertyLinks, dispatch),
    updateSelectedTab:  bindActionCreators(updateSelectedTab, dispatch),
    getFirebaseLinks: bindActionCreators(getLinks, dispatch),
    initializeFirebase: bindActionCreators(initialize, dispatch),
    firebaseSignIn: bindActionCreators(signIn, dispatch)
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: this.props.cookies,
    };
  }

  componentWillMount(){
    //this.props.getDaughertyLinks();
    this.props.initializeFirebase();
    this.props.getFirebaseLinks();
  }

  render() {
    return (
      <div className="App">
        <Wrapper links={this.props.links} 
                 daughertyLinks ={this.props.daughertyLinks}
                 tabs={this.props.tabs} 
                 updateSelectedTab={this.props.updateSelectedTab}
                 cookies={this.state.cookies}
                 lastFetch={this.props.lastFetch}
        />
      </div>
    );
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Home));
