import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn, signOut } from '../actions/firebase.actions'


function mapStateToProps(state) {
    return {
        isAuth: state.firebase.isAuth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: bindActionCreators(signIn, dispatch),
        signOut: bindActionCreators(signOut, dispatch)
    };
}

class GoogleAdmin extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
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
        return (
            <span>
                {(this.props.isAuth) ?
                    <span>
                        <span className="dropdown-item nav-clickable" onClick={this.signOut} title="Google Sign-out">
                            Google Sign-out
                        </span>
                        <span className="dropdown-item nav-clickable" title="Edit Links">
                            Edit Links
                        </span>
                    </span>
                    :
                    <span className="dropdown-item nav-clickable" onClick={this.signIn} title="Google Sign-in">
                        Google Sign-in
                    </span>
                }
            </span>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdmin)