import React, { Component } from "react";
import Wrapper from "./components/Wrapper.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDaughertyLinks } from "./actions/daugherty-links.actions";
import { updateSelectedTab } from "./actions/tabs.action";
import { withCookies } from "react-cookie";
import "airbnb-js-shims";
import { getLinks, initialize, signIn } from "./actions/firebase.actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Close from "./components/Close";
import EditLinksContainer from "./components/editLinks/EditLinksContainer";
import NoMatch from './components/NoMatch';

function mapStateToProps(state) {
  return {
    links: state.links,
    tabs: state.tabs,
    lastFetch: state.firebase.lastFetch,
    daughertyLinks: state.firebase.firebaseLinks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDaughertyLinks: bindActionCreators(getDaughertyLinks, dispatch),
    updateSelectedTab: bindActionCreators(updateSelectedTab, dispatch),
    getFirebaseLinks: bindActionCreators(getLinks, dispatch),
    initializeFirebase: bindActionCreators(initialize, dispatch),
    firebaseSignIn: bindActionCreators(signIn, dispatch)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: this.props.cookies
    };
  }

  componentWillMount() {
    //this.props.getDaughertyLinks();
    this.props.initializeFirebase();
    this.props.getFirebaseLinks();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Wrapper
                  {...props}
                  links={this.props.links}
                  daughertyLinks={this.props.daughertyLinks}
                  tabs={this.props.tabs}
                  updateSelectedTab={this.props.updateSelectedTab}
                  cookies={this.state.cookies}
                  lastFetch={this.props.lastFetch}
                />
              )}
            />
            <Route path="/close" component={Close} />
            <Route
              path="/editLinks"
              render={props => (
                <EditLinksContainer
                  {...props}
                  links={this.props.daughertyLinks}
                  lastFetch={this.props.lastFetch}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(App));
