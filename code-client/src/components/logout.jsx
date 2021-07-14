import React from "react";
import { withRouter } from "react-router";

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
        if (isAuthenticated) {
            const { history } = this.props;
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
            console.log(localStorage.getItem("Authentication"))
            console.log(localStorage.getItem("isAuthenticated"))

            fetch('http://localhost:8000/api-login/logout', requestOptions)
            .then(res => res.json())
            .then( (result) => {
                console.log(result)
                localStorage.removeItem("Authentication");
                localStorage.setItem('isAuthenticated', false);
                this.setState({
                    isAuthenticated: false,
                    loading: false,
                });
                console.log(localStorage.getItem("Authentication"))
                console.log(localStorage.getItem("isAuthenticated"))
                history.push("/home");
            })
            .catch(error => {
                this.setState({
                        error: true
                    })
        });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isAuthenticated, loading, error } = this.state;
        if (loading) {
            return <p>Loading...</p>
        }

        if (error) {
            return <p>Oops! Something went wrong!</p>
        }
        return null
    }
}

export default withRouter(Logout);