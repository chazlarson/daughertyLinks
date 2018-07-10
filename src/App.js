import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from './actions/daugherty-links.actions';
import PocketAuth  from './components/PocketAuth';

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return { getDaughertyLinks: bindActionCreators(getDaughertyLinks, dispatch) };
}

class App extends Component {
  componentWillMount(){
    this.props.getDaughertyLinks();
  }

  render() {
    const links = this.props.daughertyLinks.items.map(item => {
      return (
        <div key={item.id}>
          {item.title}
        </div>
      )
    });

    return (
      <div className="App">

      <PocketAuth/>

      hi -- doug is awesome
      {links}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
