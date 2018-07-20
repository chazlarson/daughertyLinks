import React from 'react';

const EditRow = (props) => {
  return(
    <tr>
      <td>
        <input onChange={(e) => {props.updateOrderProperty(props.link, e.target.value, 'order')}} value={props.link.order}>
        </input>
      </td>
      <td>
        <input onChange={(e) => {props.updateTitleProperty(props.link, e.target.value, 'title')}} value={props.link.title}>
        </input>
      </td>
      <td>
        <input onChange={(e) => {props.updateLinkProperty(props.link, e.target.value, 'link')}} value={decodeURIComponent(props.link.link)}>
        </input>
      </td>
      <td>
        <input onChange={(e) => {props.updateImageProperty(props.link, e.target.value, 'image')}} value={props.link.image}>
        </input>
      </td>
      <td>
        <i className={'clickable delete-icon'} title={'cancel all changes to this link'} onClick={() => {props.cancelSingleLinkChange(props.link.id)}}>X</i>
      </td>
    </tr>
  )
}

export default EditRow