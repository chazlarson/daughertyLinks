import React from 'react';

const EditRow = (props) => {
  return(
    <tr draggable="true" onDragStart={(e) => props.drag(props.link)} onDragOver={props.handleDragOver} onDrop={(e) => props.handleDrop(e, props.link.order)}>
      <td>
        <i className="material-icons drag">drag_handle</i>
      </td>
      <td>
        <input className={'edit-input'} onChange={(e) => {props.updateTitleProperty(props.link, e.target.value, 'title')}} value={props.link.title}>
        </input>
      </td>
      <td>
        <input className={'edit-input'} onChange={(e) => {props.updateLinkProperty(props.link, e.target.value, 'link')}} value={decodeURIComponent(props.link.link)}>
        </input>
      </td>
      <td>
        <input className={'edit-input'} onChange={(e) => {props.updateImageProperty(props.link, e.target.value, 'image')}} value={props.link.image}>
        </input>
      </td>
      <td>
        <i className={'clickable delete-icon'} title={'cancel all changes to this link'} onClick={() => {props.cancelSingleLinkChange(props.link.id, props.link.order)}}>X</i>
      </td>
    </tr>
  )
}

export default EditRow