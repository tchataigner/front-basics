import React, { Component } from 'react';
import { connect } from 'react-redux';

class Example extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidUpdate(prevProps) {

    }

    render(){
        return(
            <div>
                Bonjour
            </div>
        )
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Example);
