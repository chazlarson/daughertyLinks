import React from 'react';
import EditLinksTable from './EditLinksTable';

const EditLinksModal = (props) => {
    return (
      <div>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editLinksModal">
        Edit Links!
      </button>
      
      <div className="modal fade" id="editLinksModal" tabIndex="-1" role="dialog" aria-labelledby="editLinksModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editLinksModalLabel">Edit Links</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <EditLinksTable {...props}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.cancelLinkChanges}>Close</button>
              <button type="button" className="btn btn-primary" onClick={props.updateLinks} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }


export default EditLinksModal;