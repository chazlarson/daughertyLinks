import React, { Component } from 'react';
import Tabs from './Tabs';

class wrapper extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="app-title">Daugherty Links</h1>
                <div className="row">
                    <div className="col-sm-2 justify-content-md-center right-col rounded">
                        <Tabs />
                    </div>
                    <div className="col-lg-8 left-col">
                        Show the links here
                    </div>
                </div>
            </div>
        );
    }
}

export default wrapper;