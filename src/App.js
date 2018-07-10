import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from './actions/daugherty-links.actions';
import PocketAuth  from './components/PocketAuth';

function mapStateToProps(state) {
  return {
    links: [...state.daughertyLinks.items]
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
        <PocketAuth/>
        <Wrapper />
      </div>  
    );
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
