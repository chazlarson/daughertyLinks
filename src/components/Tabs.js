import React, { Component } from 'react';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('http://localhost:3000/api/links.json')
            .then(response => response.json())
            .then(parsedJSON => console.log(JSON.stringify(parsedJSON.items)))
            .catch(error => console.log('Unable to read json', error))
    }
    

    render() {
        return(
            // {
            //     if tabs.length > 0 ? tabs.map(tab => {
            //         return (<p>there is tabs!</p>)
            //     })
            //     : null
            // }
            <allTabs />
        );
    }
}

export default Tabs;