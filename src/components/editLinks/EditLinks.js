import React from 'react';
import EditLinksModal from './EditLinksModal';
import linkModel from '../../models/link';

class EditLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      deleteLinks: [],
    };
    this.cancelLinkChanges = this.cancelLinkChanges.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.getUpdatedLinks = this.getUpdatedLinks.bind(this);
    this.newLink = this.newLink.bind(this);
    this.resetStateLinksFromProps = this.resetStateLinksFromProps.bind(this);
    this.saveUpdatedLinks = this.saveUpdatedLinks.bind(this);
    this.updateLink = this.updateLink.bind(this);
  }

  cancelLinkChanges() {
    this.resetStateLinksFromProps();
  }

  componentDidMount() {
    this.resetStateLinksFromProps();
  }

  componentDidUpdate(prevProps) {
    // TODO: check props compared to state!
    this.resetStateLinksFromProps(prevProps.links);
  }

  newLink() {
    const links = [...this.state.links];
    const newLink = new linkModel({title: '', link: '', image: ''})
    newLink.tags.push('Daugherty');
    links.push(newLink);
    this.setState(({links}));
  }

  // given a link model, remove from links in state and add it to deleteLinks if has key
  deleteLink (link) {
    const newState = {};
    const links = this.state.links.filter(({id}) => link.id !== id);
    newState.links = links;
    if(link.meta.key !== undefined) {
      const deletedLink = new linkModel(JSON.parse(JSON.stringify(link)));
      const {deleteLinks} = this.state;
      deletedLink.meta.delete = true;
      deleteLinks.push(deletedLink)
      newState.deleteLinks = deleteLinks;
    }
    this.setState(newState);
  }
  
  // return only updated links in an array
  getUpdatedLinks() {
    const links = this.state.links.map(linkObj => new linkModel({...linkObj}));
    return links.reduce((updatedLinks, link, i) => {
      if(link.meta.updated) {
        delete link.meta.updated;
        updatedLinks.push(link);
      } else if(link.meta.delete) {
        updatedLinks.push(link);
      }
      return updatedLinks;
    }, [])
  }

  // pass to update link
  updateLink (linkId, updatedData, linkProperty) {
    const update = {meta: {updated: true}}
    update[linkProperty] = linkProperty === 'link' ? encodeURIComponent(updatedData) : updatedData;
    const links = this.state.links.map(linkObj => (
      linkObj.id === linkId ? new linkModel(Object.assign({}, linkObj, update)) : linkObj ));
    this.setState({links});
  }

  // listen to updates on props.links and add update state
  resetStateLinksFromProps (prevLinks = [] ) {
    const links = this.props.links;
    for(let i = 0; i < links.length; i++) {
      if(links.length !== prevLinks.length || links[i] !== prevLinks[i] || links[i].title !== prevLinks[i].title || links[i].image !== prevLinks[i].image || links[i].link !==prevLinks[i].link) {
        const newLinks = links.map(linkObj => new linkModel({...linkObj}))
        this.setState({links: newLinks, deleteLinks: []});
        return;
      }
    }
  }

  saveUpdatedLinks () {
    const updatedLinks = this.getUpdatedLinks().concat(this.state.deleteLinks);
    console.log(updatedLinks);
    // call db helper func here
  }


  render() {
    return (
      <EditLinksModal
        cancelLinkChanges={this.cancelLinkChanges}
        deleteLink={this.deleteLink}
        links={this.state.links.filter(link => !link.meta.delete)}
        updateLink={this.updateLink}
        saveChanges={this.saveUpdatedLinks}
        newLink={this.newLink}
      />
  )
  }
}

export default EditLinks;