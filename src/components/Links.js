import React, { Component } from 'react';

class Links extends Component {
    substituteTitle (title) {
        let linkURL = title;

        const linkArray = linkURL.split('/')

        return (linkArray[2]);
    }

    render () {
        
        let linkId = 0;
        const activeTab = this.props.tabs.selectedTab;
        // if selectedTab in link.tag
        let selectedLinks = this.props.links.filter(link => {
            return (activeTab === 'Uncategorized' && link.tags.length === 0 
                ? true
                : link.tags.indexOf(activeTab)>-1);
        })
        let linksArray = selectedLinks.map(
            link => {
                return (
                    <div key={`linksId_${++linkId}`} 
                        className="col-lg-3 col-md-4 col-sm-12" >
                        <a href={decodeURIComponent(link.link)} target="_blank" >
                        <div className="card text-center" style={{backgroundImage: `url(${decodeURIComponent(link.image)})`}}>
                        <div className="card-header">
                            &nbsp;
                        </div>
                        <div className="card-body">
                            &nbsp;
                        </div>
                        <div className="card-footer">
                                {link.title.length === 0 ? this.substituteTitle(link.link) : link.title }
                        </div>
                        </div>
                        </a>
                    </div>
                );
            }
        )
        return ( 
            <div className="row">
                {linksArray}
            </div>
        );
    }
}

export default Links;