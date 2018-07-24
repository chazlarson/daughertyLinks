import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn, signOut, checkAdmin } from '../actions/firebase.actions'
import { Link } from 'react-router-dom';


function mapStateToProps(state) {
    return {
        isAuth: state.firebase.isAuth,
        isAdmin: state.firebase.isAdmin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: bindActionCreators(signIn, dispatch),
        signOut: bindActionCreators(signOut, dispatch),
        checkAdmin: bindActionCreators(checkAdmin, dispatch)
    };
}

class GoogleAdmin extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount(){
        
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {

    }

    signIn() {
        this.props.signIn();
    }

    signOut() {
        this.props.signOut();
    }

    render() {
        let editLink = null;
        if(this.props.isAdmin){
            editLink = (
                <Link className="dropdown-item nav-clickable"
                        to={'/editLinks'}
                    >Edit Links</Link>
            )
        }
        return (
            <span>
                {(this.props.isAuth) ?
                    <span>
                        <span className="dropdown-item nav-clickable" onClick={this.signOut} title="Admin Sign-out">
                            Admin Sign-out
                        </span>
                        {editLink}
                    </span>
                    :
                    <span className="dropdown-item nav-clickable" onClick={this.signIn} title="Admin Sign-in">
                        Admin Sign-in
                    </span>
                }
            </span>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdmin)