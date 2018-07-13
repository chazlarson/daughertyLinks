import React, { Component } from 'react';

class StatusBar extends Component {
    render () {
        
        return ( 
            <div className="float-left">
                {this.props.message}
            </div>
        );
    }
}

export default StatusBar;