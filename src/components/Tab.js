import React, { Component } from 'react';


class Tab extends Component {
    onClickHandle() {
        this.props.updateSelectedTab(this.props.displayText);
    }

    render () {

        return(
           <li className={`nav-item ${this.props.isActive ? " active" : "" }`}>
                <a className="nav-link" href="javascript:void(null);"  onClick={this.onClickHandle.bind(this)}>
                <p>{this.props.displayText}</p>
                </a>
           </li>
        );
    }
}

export default Tab;