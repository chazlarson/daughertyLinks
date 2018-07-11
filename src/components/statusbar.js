import React, { Component } from 'react';

class StatusBar extends Component {
    render () {
        
        return ( 
            <div className="col-sm-12 col-md-12 statusbar">
                {this.props.message}
            </div>
        );
    }
}

export default StatusBar;