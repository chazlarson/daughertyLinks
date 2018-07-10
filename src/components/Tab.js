import React, { Component } from 'react';

class Tab extends Component {
    render () {
        return(
           <Tab displayText={this.props.displayText} />
        );
    }
}

export default Tab;