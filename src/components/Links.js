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
                        <div className="card card-stats" style={{backgroundImage: `url(${decodeURIComponent(link.image)})`}}>
                        <p className="card-category">&nbsp;</p>
                            <div className="card-footer">
                            <div className="stats">
                                    <div className="link-title">
                                        {link.title.length === 0 ? this.substituteTitle(link.link) : link.title } 
                                    </div>
                            </div>
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