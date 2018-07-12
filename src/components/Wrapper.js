import React, { Component } from 'react';
import Tabs from './Tabs';
import Links from './Links';
import Login from './Login';
import StatusBar from '../components/statusbar';

class Wrapper extends Component {
    render() {
        return (
            <div className="wrapper ">
    <div className="sidebar" data-color="danger" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
      <div className="sidebar-wrapper">
      <Tabs links={this.props.links}
                              tabs={this.props.tabs}
                              updateSelectedTab={this.props.updateSelectedTab} />
      </div>
    </div>
    <div className="main-panel">
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <a className="navbar-brand" href="#">Daugherty Links</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
          <form className="navbar-form"></form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Login cookies={this.props.cookies}/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="container-fluid">
        <Links links={this.props.links} 
                               tabs={this.props.tabs} />
        </div>
      </div>
      <footer className="footer">
        <div className="container-fluid">
         <StatusBar message={this.props.tabs.statusMessage}/>
          <div className="copyright float-right">
            &copy;
            {new Date().getFullYear()} Daugherty Business Solutions.
          </div>
        </div>
      </footer>
    </div>
  </div>
        );
    }
}

export default Wrapper;