import React, { Component } from 'react';
import Tab from './Tab';

class Tabs extends Component {
    render() {

        let tabsArray = [];
        this.props.links.forEach(element => {
            tabsArray = tabsArray.concat(element.tags);
        });
        
        tabsArray = [...new Set(tabsArray)];
        tabsArray.push('TestThis');
        const allTabs = tabsArray.map(
            tab => {
                return (
                    <div>
                        <Tab displayText={tab} 
                             updateSelectedTab={this.props.updateSelectedTab} />
                    </div>
                );
            }
        );
        return (
            <div>
                {allTabs}
            </div>
        );
    }   
}

export default Tabs;