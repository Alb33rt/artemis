import React, { useState } from "react";
import { withRouter } from "react-router";
import AuthContext from "../auth-context";

class Logout extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const isAuthenticated = this.state.isAuthenticated;
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            const { history } = this.props;
            let logoutConfirm = window.confirm("Are you sure you want to log out?");
            if (!logoutConfirm) {
                history.push('/dashboard')
            } else {
            const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST",
                "Authorization": localStorage.getItem("Authentication")
            },
            body: JSON.stringify({
            })
            };
            console.log("Sending GET Request to Server....");

            fetch('http://localhost:8000/api-login/logout', requestOptions)
            .then(res => res.json())
            .then( (result) => {
                console.log(result)
                localStorage.removeItem("Authentication")
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('isLoggedIn', false);

                this.setState(
                    {loading: false}
                )
                history.push("/");
            })
            .catch(error => {
                console.log(error)
                this.setState({
                        error: false
                    })
        });
            }   
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isAuthenticated, loading, error } = this.state;
        if (loading) {
            return (
            <AuthContext.Provider value={this.state.loggedIn}>
                <p>Loading...</p>
            </AuthContext.Provider>
            );
        }

        if (error) {
            return <p>Oops! Something went wrong!</p>
        }
        return null
    }
}

export default withRouter(Logout);