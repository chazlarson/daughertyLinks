import React from 'react';
import EditLinksTable from './EditLinksTable';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const EditLinkComponent = (props) => {
    return (
      <div className={'edit-links-modal'}>
        <i className={'fa-2x clickable fa fa-arrow-circle-o-left green'} onClick={() => props.history.goBack()} title="back"></i>
        <div className={"edit-links-table"}>
          <EditLinksTable {...props}/>
          <i title={'add new link'} className={'fa fa-plus-circle fa-lg clickable add-icon'} onClick={props.newLink} ></i>
          <span className={"right-align"}>
            <button type="button" className="btn btn-primary float-right" onClick={props.saveChanges} >Save!</button>
            <Link to='/' type="button" className="btn btn-secondary float-right" onClick={props.cancelLinkChanges}>Cancel</Link>
          </span>
        </div>
      </div>)
  }


export default withRouter(EditLinkComponent);