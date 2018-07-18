import React from 'react';

const EditLinksTable = (props) => {
  console.log(props);
  const links = props.links || [{title: 'title', link: 'link', image: 'image'}];
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
              {i + 1}
            </td>
            <td>
              <input onChange={(e) => {props.updateLinkTitle(i, e.target.value)}} value={link.title}>
              </input>
            </td>
            <td>
              <input onChange={(e) => {props.updateLink(i, e.target.value)}} value={link.link}>
              </input>
            </td>
            <td>
              <input onChange={(e) => {props.updateLinkImage(i, e.target.value)}} value={link.image}>
              </input>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default EditLinksTable;