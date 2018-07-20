import React from 'react';
import EditLinksModal from './EditLinksModal';
import linkModel from '../../models/link';
import * as fireBaseActions from '../../actions/firebase.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { deepClone } from '../../helpers/utilities.helper';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updateLinks: bindActionCreators(fireBaseActions.updateLinks, dispatch)
  }
}

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
    this.updateLinkProperty = this.updateLinkProperty.bind(this);
    this.updateImageProperty = this.updateImageProperty.bind(this);
    this.updateOrderProperty = this.updateOrderProperty.bind(this);
    this.updateTitleProperty = this.updateTitleProperty.bind(this);
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
    const links = this.state.links.filter(({id}) => link.id !== id);
    const newState = {updated: true, links};
    if(link.meta.key !== undefined) {
      const deletedLink = new linkModel(deepClone(link));
      const {deleteLinks} = this.state;
      deletedLink.meta.delete = true;
      deletedLink.meta.updated = false;
      deleteLinks.push(deletedLink)
      newState.deleteLinks = deleteLinks;
    }
    this.setState(newState);
  }
  
  // return only updated links in an array
  getUpdatedLinks() {
    const links = this.state.links.map(linkObj => new linkModel({...linkObj}));
    return links.reduce((updatedLinks, link) => link.meta.updated ? updatedLinks.concat(link) : updatedLinks, [])
  }

  //updates link in state based on params
  updateLink (link, updatedData, linkProperty) {
    const linkId = link.id;
    const update = {meta: {...link.meta, updated: true}};
    update[linkProperty] = updatedData;
    const links = this.state.links.map(linkObj => (
      linkObj.id === linkId ? new linkModel(Object.assign({}, linkObj, update)) : linkObj ));
    this.setState({links, updated: true});
  }

  updateLinkProperty (link, updatedData) {
    this.updateLink(link, encodeURIComponent(updatedData), 'link');
  }

  updateTitleProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'title');
  }

  updateOrderProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'order');
  }

  updateImageProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'image');
  }

  // listen to updates on props.links and add update state
  resetStateLinksFromProps (prevLinks = [] ) {
    const links = this.props.links;
    if(links.length !== prevLinks.length || JSON.stringify(prevLinks) !== JSON.stringify(links)) {
      const newLinks = links.map(linkObj => new linkModel(deepClone(linkObj)));
      this.setState({links: newLinks, deleteLinks: [], updated: false});
    }
  }

  saveUpdatedLinks () {
    const updatedLinks = this.getUpdatedLinks().concat(this.state.deleteLinks);
    console.log(updatedLinks);
    this.props.updateLinks(updatedLinks);
  }


  render() {
    return (
      <EditLinksModal
        cancelLinkChanges={this.cancelLinkChanges}
        deleteLink={this.deleteLink}
        links={this.state.links.filter(link => !link.meta.delete).sort((a, b) => a.order - b.order)}
        updateLinkProperty={this.updateLinkProperty}
        updateImageProperty={this.updateImageProperty}
        updateOrderProperty={this.updateOrderProperty}
        updateTitleProperty={this.updateTitleProperty}
        saveChanges={this.saveUpdatedLinks}
        newLink={this.newLink}
      />
  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLinks);