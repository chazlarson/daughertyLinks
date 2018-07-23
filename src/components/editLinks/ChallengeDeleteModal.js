import React from 'react';

const ChallengeDeleteModal = (props) => {
  return (
    <div>
    <div className="modal fade" tabIndex="-1" role="dialog" id="challengeDeleteModal" aria-labelledby="challengeDeleteModal">
      <div className="modal-dialog modal-table" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="challengeDeleteModalLabel">Warning</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this link: {JSON.stringify(props.link)}? (It can still be undone by canceling changes).</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => props.deleteLink(props.link)} >Yes, Delete!</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>)
}



export default ChallengeDeleteModal;