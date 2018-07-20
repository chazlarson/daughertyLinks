import React from 'react';

const EditLinksTable = (props) => {
  const links = props.links;
  return (
    <table className="table">
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
          return <tr key={i}>
            <td>
              <input onChange={(e) => {props.updateOrderProperty(link, e.target.value, 'order')}} value={link.order}>
              </input>
            </td>
            <td>
              <input onChange={(e) => {props.updateTitleProperty(link, e.target.value, 'title')}} value={link.title}>
              </input>
            </td>
            <td>
              <input onChange={(e) => {props.updateLinkProperty(link, e.target.value, 'link')}} value={decodeURIComponent(link.link)}>
              </input>
            </td>
            <td>
              <input onChange={(e) => {props.updateImageProperty(link, e.target.value, 'image')}} value={link.image}>
              </input>
            </td>
            <td>
              <p onClick={(e) => {props.deleteLink(link)}}> delete
              </p>
            </td>
          </tr>
        })}
        <tr><td><button onClick={props.newLink} >new link</button></td></tr>
      </tbody>
    </table>
  )
}

export default EditLinksTable;