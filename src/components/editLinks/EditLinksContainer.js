import React from 'react';
import EditLinksComponent from './EditLinksComponent';
import linkModel from '../../models/link';
import * as fireBaseActions from '../../actions/firebase.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { deepClone } from '../../helpers/utilities.helper';
import ChallengeDeleteModal from './ChallengeDeleteModal';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLinks: bindActionCreators(fireBaseActions.updateLinks, dispatch)
  }
}

class EditLinksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      deleteLinks: [],
      editId: undefined,
      linkToDelete: null,
    };
    this.cancelLinkChanges = this.cancelLinkChanges.bind(this);
    this.cancelSingleLinkChange = this.cancelSingleLinkChange.bind(this);
    this.editLink = this.editLink.bind(this);
    this.drag = this.drag.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.deleteLinkChallenge = this.deleteLinkChallenge.bind(this);
    this.getUpdatedLinks = this.getUpdatedLinks.bind(this);
    this.newLink = this.newLink.bind(this);
    this.orderLinks = this.orderLinks.bind(this);
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

  cancelSingleLinkChange(linkId) {
    // check for meta.key
    const newLink = this.props.links.find(propLink => propLink.id === linkId);
    if(!newLink) {
      this.deleteLink({id: linkId});
    } else {
      const links = this.state.links.map(stateLink => stateLink.id === linkId ? deepClone(newLink) : stateLink);
      this.setState({links, editId: undefined});
    }
  }

  componentDidMount() {
    this.resetStateLinksFromProps();
  }

  componentDidUpdate(prevProps) {
    this.resetStateLinksFromProps(prevProps.lastFetch);
  }

  // save linkId to display link in edit mode
  editLink(linkId) {
    this.setState({editId: linkId});
  }

  // save link to delete to be used by modal to challenge
  deleteLinkChallenge (link) {
    const linkToDelete = deepClone(link);
    this.setState({linkToDelete});
  }

  // given a link model, remove from links in state and add it to deleteLinks if has key
  deleteLink (link) {
    const links = this.state.links.filter(({id}) => link.id !== id);
    const newState = {linkToDelete: null, links};
    if(!link.meta || link.meta.key !== undefined) {
      const deletedLink = new linkModel(deepClone(link));
      const {deleteLinks} = this.state;
      deletedLink.meta.delete = true;
      deletedLink.meta.updated = false;
      deleteLinks.push(deletedLink)
      newState.deleteLinks = deleteLinks;
    }
    this.setState(newState);
  }

  drag (e) {
  }
  
  // return only updated links in an array (firebase)
  getUpdatedLinks() {
    const links = this.state.links.map(linkObj => new linkModel({...linkObj}));
    return links.reduce((updatedLinks, link) => link.meta.updated ? updatedLinks.concat(link) : updatedLinks, [])
  }

  handleDragOver (e) {
    debugger;
  }

  handleDrop (e) {
    debugger;
  }


  newLink() {
    const links = [...this.state.links];
    const newLink = new linkModel({title: '', link: '', image: '', order: links.length})
    newLink.tags.push('Daugherty');
    links.push(newLink);
    this.setState(({links, editId: newLink.id}));
  }

  orderLinks(links = this.state.links) {
    const arr =  [...links]
      .sort((a, b) => a.order - b.order);
      return arr.map((link, i) => {
        const newLink = new linkModel(deepClone(link));
        newLink.order = i;
        return newLink;
      })
  }

  //updates link in state based on params
  updateLink (link, updatedData, linkProperty) {
    const linkId = link.id;
    const update = {meta: {...link.meta, updated: true}};
    update[linkProperty] = updatedData;
    const links = this.state.links.map(linkObj => (
      linkObj.id === linkId ? new linkModel(Object.assign({}, linkObj, update)) : linkObj ));
    this.setState({links});
  }

  updateLinkProperty (link, updatedData) {
    this.updateLink(link, encodeURIComponent(updatedData), 'link');
  }

  updateTitleProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'title');
  }

  updateOrderProperty (linkId, linkKey, updatedData) {
    // TODO: implement drag and drop
    this.updateLink(linkId, linkKey, updatedData, 'order');
  }

  updateImageProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'image');
  }

  // listen to updates on props.links and add update state
  resetStateLinksFromProps (prevLastFetch = 0 ) {
    const links = this.props.links;
    if(this.props.lastFetch !== prevLastFetch) {
      const newLinks = this.orderLinks(links);
      this.setState({links: newLinks, deleteLinks: [], editId: undefined});
    }
  }

  saveUpdatedLinks () {
    // TODO: validate form data
    const updatedLinks = this.getUpdatedLinks().concat(this.state.deleteLinks);
    console.log(updatedLinks);
    this.props.updateLinks(updatedLinks);
  }


  render() {
    return (
      <div>
        <ChallengeDeleteModal
          link={this.state.linkToDelete}
          deleteLink={this.deleteLink}
        />
        <EditLinksComponent
          cancelLinkChanges={this.cancelLinkChanges}
          cancelSingleLinkChange={this.cancelSingleLinkChange}
          drag={this.drag}
          editId={this.state.editId}
          editLink={this.editLink}
          deleteLink={this.deleteLinkChallenge}
          links={this.state.links}
          updateLinkProperty={this.updateLinkProperty}
          updateImageProperty={this.updateImageProperty}
          updateOrderProperty={this.updateOrderProperty}
          updateTitleProperty={this.updateTitleProperty}
          saveChanges={this.saveUpdatedLinks}
          newLink={this.newLink}
        />
      </div>
  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLinksContainer);