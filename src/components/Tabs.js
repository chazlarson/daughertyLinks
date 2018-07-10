import React, { Component } from 'react';
import Tab from './Tab';

class Tabs extends Component {
    render() {

        let tabsArray = [];
        this.props.links.map(
            link => {
                tabsArray = tabsArray.concat(link.tags);
            }
        )
        const tabs = tabsArray.map(
            tab => {
                return (
                    <Tab displayText={tab.tags} />
                );
            }
        );
        return (
            'Is this working?'
        );
    }   
}

export default Tabs;