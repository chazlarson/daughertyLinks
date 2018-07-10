import React, { Component } from 'react';



class Links extends Component {
    render () {
        let linksArray = this.props.links.map(
            link => {
                return (
                    <div className="col-sm-4 float-left link-container box-shadow rounded" 
                        style={{backgroundImage: `url(${decodeURIComponent(link.image)})`}}>
                        <a href={decodeURIComponent(link.link)} target="_blank" >
                            <div className="link-title">
                                {link.title}
                            </div>
                        </a>
                    </div>
                );
            }
        )
        return ( 
            <div>
                {linksArray}
            </div>
        );
    }
}

export default Links;