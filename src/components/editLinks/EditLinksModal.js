import React from 'react';
import EditLinksTable from './EditLinksTable';

const EditLinksModal = (props) => {
    return (
      <div>
      <div className="modal fade" id="editLinksModal" tabIndex="-1" role="dialog" aria-labelledby="editLinksModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-table" role="document">
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
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.cancelLinkChanges}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={props.saveChanges} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }


export default EditLinksModal;