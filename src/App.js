import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from './actions/daugherty-links.actions';
import { updateSelectedTab } from './actions/tabs.action';
import { withCookies } from 'react-cookie';

function mapStateToProps(state) {
  return {
    links: state.links,
    tabs: state.tabs
  };
}

function mapDispatchToProps(dispatch) {
  return { 
    getDaughertyLinks: bindActionCreators(getDaughertyLinks, dispatch),
    updateSelectedTab:  bindActionCreators(updateSelectedTab, dispatch)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: this.props.cookies,
    };
  }

  componentWillMount(){
    this.props.getDaughertyLinks();
  }

  render() {
    return (
      <div className="App">
        <Wrapper links={this.props.links} 
                 tabs={this.props.tabs} 
                 updateSelectedTab={this.props.updateSelectedTab}
                 cookies={this.state.cookies}
        />
      </div>
    );
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
