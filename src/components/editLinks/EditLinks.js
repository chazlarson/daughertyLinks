import React from 'react';
import EditLinksModal from './EditLinksModal';

class EditLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
    this.updateLinkTitle = this.updateLinkTitle.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.updateLinkImage = this.updateLinkImage.bind(this);
    this.cancelLinkChanges = this.cancelLinkChanges.bind(this);
    this.updateLinks = this.updateLinks.bind(this);
  }

  cancelLinkChanges() {
    this.updateLinks();
  }

  componentDidMount() {
    this.updateLinks();
  }

  componentDidUpdate(prevProps) {
    this.updateLinks(prevProps.links);
  }

  createLink() {

  }

  updateLinks () {
    console.log('called updateLinks!');
  }

  deleteLink () {

  }

  // pass to update link
  updateLinkTitle (index, title) {
    const links = this.state.links.slice();
    links[index].title = title;
    this.setState(links);
  }
  // pass to update link
  updateLink (index, link) {
    const links = this.state.links.slice();
    links[index].link = link;
    this.setState(links);
  }
  // pass to update link
  updateLinkImage (index, imageUrl) {
    const links = this.state.links.slice();
    links[index].image = imageUrl;
    this.setState(links);
  }

  // listen to updates on props.links and add to state
  updateLinks (prevLinks = [], ) {
    const links = this.props.links.slice();
    for(let i = 0; i < links.length; i++) {
      if(links.length !== prevLinks.length || links[i] !== prevLinks[i] || links[i].title !== prevLinks[i].title || links[i].image !== prevLinks[i].image || links[i].link !==prevLinks[i].link) {
        this.setState({links: links});
        return;
      }
    }
  }


  render() {
    return (
      <EditLinksModal
        links={this.state.links}
        updateLinkImage={this.updateLinkImage}
        updateLink={this.updateLink}
        updateLinkTitle={this.updateLinkTitle}
        cancelLinkChanges={this.cancelLinkChanges}
      />
  )
  }
}

export default EditLinks;