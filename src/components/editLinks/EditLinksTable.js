import React from 'react';
import EditRow from './EditRow';
import DisplayRow from './DisplayRow';
import styles from './EditLinks.css';

const EditLinksTable = (props) => {
  const links = props.links;
  return (
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
  )
}

export default EditLinksTable;