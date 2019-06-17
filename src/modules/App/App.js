import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../App/App.css';
import {connect} from 'react-redux';
import {setWeb3} from '../../action/AppActions';

//Import Selector
import {getWeb3} from '../../reducer/AppReducer';
import {getAppResponse} from '../../reducer/AppReducer';

//Import Components
import Example from "../Example/Example";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            MMaccess: false
        };

        props.setWeb3();
    }

    async componentDidUpdate(prevProps, prevState) {
        const {appResponse} = this.props;

        //Manage loading depending of MMaccess granted or no
        if (prevProps.appResponse !== appResponse) {
            const {from, statusCode} = appResponse;
            if (from === "setWeb3") { // Manage wallet connection
                if (statusCode === 200) {
                    this.setState({MMaccess: true});
                }
                if (statusCode === 400) {
                    this.setState({loading: false, MMaccess: false});
                }
            }
        }
    }

    render() {
        const {loading, MMaccess} = this.state;

        return (
            <React.Fragment>
                <BrowserRouter>

                    <Switch>
                        <Route exact path="/" component={Example}/>
                        <Route render={() => {
                            if (loading) {
                                return (
                                    <div>
                                        Connecting
                                    </div>
                                )
                            } else if (!MMaccess) {
                                return (
                                    <div>
                                        Did not get user approval
                                    </div>
                                )
                            } else {
                                return <DefaultContainer/>
                            }
                        }}/>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

const DefaultContainer = () => {
    return (
        <div className="App">
            <div className="wrapper">
                <div className="App-content" id="restrict">
                    <Switch>
                        <Route exact path="/in" component={Example}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (store) => {
    return {
        web3: getWeb3(store),
        appResponse: getAppResponse(store)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setWeb3: () => {
            dispatch(setWeb3())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
