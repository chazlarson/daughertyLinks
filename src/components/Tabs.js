import React, { Component } from 'react';
import Tab from './Tab';

export const UNCATEGORIZED_TAB = 'Uncategorized';
class Tabs extends Component {
    render() {
        let keyId = 0;
        let tabsArray = [];
        this.props.links.forEach(element => {
            if (element.tags.length === 0) {
                tabsArray = tabsArray.concat(UNCATEGORIZED_TAB);
            }
            tabsArray = tabsArray.concat(element.tags);
        });
        
        tabsArray = [...new Set(tabsArray)].sort((a, b) => {
            const d = 'Daugherty';
            if(a === d) return -1;
            if(b === d) return 1;
            if(a === UNCATEGORIZED_TAB) return -1;
            if(b === UNCATEGORIZED_TAB) return 1;
            
            return a.toUpperCase() > b.toUpperCase() ? 1 : -1;
        });;
        const allTabs = tabsArray.map(
            tab => {
                return (
                        <Tab displayText={tab}  key={`tabId_${++keyId}`} 
                             updateSelectedTab={this.props.updateSelectedTab} 
                             isActive={(tab === this.props.tabs.selectedTab)} />
                );
            }
        );
        return (
            <ul className='nav'>
                {allTabs}
            </ul>
        );
    }   
}

export default Tabs;