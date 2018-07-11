import React, { Component } from 'react';
import Tab from './Tab';

class Tabs extends Component {
    render() {
        let keyId = 0;
        let tabsArray = [];
        this.props.links.forEach(element => {
            if (element.tags.length === 0) {
                tabsArray = tabsArray.concat('Uncategorized');
            }
            tabsArray = tabsArray.concat(element.tags);
        });
        
        tabsArray = [...new Set(tabsArray)];
        const allTabs = tabsArray.map(
            tab => {
                return (
                    <div key={`tabId_${++keyId}`} >
                        <Tab displayText={tab} 
                             updateSelectedTab={this.props.updateSelectedTab} 
                             isActive={(tab === this.props.tabs.selectedTab)} />
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