import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from './actions/daugherty-links.actions';

function mapStateToProps(state) {
  return {
    links: [...state.daughertyLinks.items],
    tabs: {...state.tabs}
  };
}

function mapDispatchToProps(dispatch) {
  return { getDaughertyLinks: bindActionCreators(getDaughertyLinks, dispatch) };
}

class App extends Component {
  componentWillMount(){
    this.props.getDaughertyLinks();
  }

  render() {
    return (
      <div className="App">
        <Wrapper />
      </div>
    );
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
