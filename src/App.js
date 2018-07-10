import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import Wrapper from './components/Wrapper.js'

class App extends Component {
=======
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDaughertyLinks } from './actions/daugherty-links.actions';

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
>>>>>>> 4bb20a4f4509d11a57b67c6aa9fe87d7475aa014

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
<<<<<<< HEAD
        <Wrapper />
=======
      hi -- doug is awesome
      {links}
>>>>>>> 4bb20a4f4509d11a57b67c6aa9fe87d7475aa014
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
