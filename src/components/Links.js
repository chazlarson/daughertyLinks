import React, { Component } from 'react';

class Links extends Component {
    substituteTitle (title) {
        let linkURL = decodeURIComponent(title);

        const linkArray = linkURL.split('/')
        console.log("substituteTitle", linkArray);
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
                        className="col-xs-12 col-sm-6 col-md-3 col-lg-2 " >
                        <a href={decodeURIComponent(link.link)} target="_blank" >
                        <div className="card text-center">
                        <div className="card-header">
                            {this.substituteTitle(link.link)}
                        </div>
                        <div className="card-body" style={{backgroundImage: `url(${decodeURIComponent(link.image)})`}}>
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