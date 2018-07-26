import React from 'react';

const DisplayRow = (props) => {
  return(
    <tr draggable="true" onDragStart={props.drag}>
      <td>
        <p>{props.link.order}</p>
      </td>
      <td>
        <p>{props.link.title}</p>
      </td>
      <td>
        <p>{decodeURIComponent(props.link.link)}</p>
      </td>
      <td>
        <p>{props.link.image}</p>
      </td>
      <td>
        <i
          className={'fa fa-pencil clickable edit-icon aria-hidden display-inline'}
          title={'edit this link'}
          onClick={(e) => {props.editLink(props.link.id)}}
          >
        </i>        
        <i
          className={'fa fa-trash-o clickable delete-icon display-inline'}
          title={'delete this link'}
          onClick={(e) => {props.deleteLink(props.link)}}
          data-toggle="modal"
          data-target="#challengeDeleteModal"
          >
        </i>
      </td>
    </tr>
  )
}

export default DisplayRow;