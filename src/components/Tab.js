import React, { Component } from 'react';


class Tab extends Component {
    onClickHandle() {
        this.props.updateSelectedTab(this.props.displayText);
    }

    render () {

        return(
           <div className={`tab box-shadow rounded ${this.props.isActive ? " active" : "" }`} onClick={this.onClickHandle.bind(this)}>
                {this.props.displayText}
           </div>
        );
    }
}

export default Tab;