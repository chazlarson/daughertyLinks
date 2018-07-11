import React, { Component } from 'react';
import Tabs from './Tabs';
import Links from './Links';
import Login from './Login';

class Wrapper extends Component {
    render() {
        return (
            <div className="container">
                <div className="header-container clearfix">
                    <h1 className="app-title">Daugherty Links</h1>
                    <div className="float-right navbar clearfix">
                        <Login />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 justify-content-md-center left-col rounded">
                        <Tabs links={this.props.links}
                              tabs={this.props.tabs}
                              updateSelectedTab={this.props.updateSelectedTab} />
                    </div>
                    <div className="col-lg-9 right-col rounded">
                        <Links links={this.props.links} 
                               tabs={this.props.tabs} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Wrapper;