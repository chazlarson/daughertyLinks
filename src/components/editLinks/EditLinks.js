import React from 'react';
import EditLinksModal from './EditLinksModal';
import linkModel from '../../models/link';
import * as fireBaseActions from '../../actions/firebase.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { deepClone } from '../../helpers/utilities.helper';
import ChallengeDeleteModal from './ChallengeDeleteModal';

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
      editId: undefined,
      linkToDelete: null,
    };
    this.cancelLinkChanges = this.cancelLinkChanges.bind(this);
    this.cancelSingleLinkChange = this.cancelSingleLinkChange.bind(this);
    this.editLink = this.editLink.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
    this.deleteLinkChallenge = this.deleteLinkChallenge.bind(this);
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

  cancelSingleLinkChange(linkId) {
    const newLink = this.props.links.find(propLink => propLink.id === linkId);
    const links = this.state.links.map(stateLink => stateLink.id === linkId ? deepClone(newLink) : stateLink);
    this.setState({links, editId: undefined});
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

  deleteLinkChallenge (link) {
    const linkToDelete = deepClone(link);
    this.setState({linkToDelete});
  }

  // given a link model, remove from links in state and add it to deleteLinks if has key
  deleteLink (link) {
    const links = this.state.links.filter(({id}) => link.id !== id);
    const newState = {linkToDelete: null, links};
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


  newLink() {
    const links = [...this.state.links];
    const newLink = new linkModel({title: '', link: '', image: ''})
    newLink.tags.push('Daugherty');
    links.push(newLink);
    this.setState(({links, editId: newLink.id}));
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
    this.updateLink(linkId, linkKey, updatedData, 'order');
  }

  updateImageProperty (linkId, linkKey, updatedData) {
    this.updateLink(linkId, linkKey, updatedData, 'image');
  }

  // listen to updates on props.links and add update state
  resetStateLinksFromProps (prevLastFetch = 0 ) {
    const links = this.props.links;
    if(this.props.lastFetch !== prevLastFetch) {
      const newLinks = links.map(linkObj => new linkModel(deepClone(linkObj)));
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
        <EditLinksModal
          cancelLinkChanges={this.cancelLinkChanges}
          cancelSingleLinkChange={this.cancelSingleLinkChange}
          editId={this.state.editId}
          editLink={this.editLink}
          deleteLink={this.deleteLinkChallenge}
          links={this.state.links.filter(link => !link.meta.delete).sort((a, b) => a.order - b.order)}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditLinks);