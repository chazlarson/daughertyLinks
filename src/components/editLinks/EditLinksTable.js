import React from 'react';
import EditRow from './EditRow';
import DisplayRow from './DisplayRow';
import styles from './EditLinks.css';

const EditLinksTable = (props) => {
  const links = props.links;
  return (
    <div className={"edit-links-table"}>
      <table className={"table"}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">title</th>
            <th scope="col">link</th>
            <th scope="col">image</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, i) => {
            return link.id === props.editId ?
              <EditRow {...props} link={link} key={i}/> : 
              <DisplayRow editLink={props.editLink} deleteLink={props.deleteLink} link={link} key={i}/>
          })}
        </tbody>
      </table>
      <i title={'add new link'} className={'fa fa-plus-circle fa-lg clickable add-icon'} onClick={props.newLink} ></i>
      <span className={"right-align"}>
        <button type="button" className="btn btn-primary float-right" onClick={props.saveChanges} >Save!</button>
        <button type="button" className="btn btn-secondary float-right" onClick={props.cancelLinkChanges}>Cancel</button>
      </span>
    </div>
  )
}

export default EditLinksTable;