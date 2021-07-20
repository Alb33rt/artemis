import React from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this)
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            loading: true,
            error: false,
        }
    }

    postRequest(e) {
        e.preventDefault()
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
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

            fetch('http://localhost:8000/api-login/logout', requestOptions)
            .then(res => res.json())
            .then( (result) => {
                console.log(result);
                localStorage.removeItem("Authentication");
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('isLoggedIn', false);  

                this.setState(
                    {loading: false}
                )

                toast("You have signed out of Artemis.")
                this.handleClick();
                history.push("/");
            })
            .catch(error => {
                console.log(error)
                this.setState({
                        error: false
                    })
                this.handleClick();
        });
        }
    }

    componentDidMount() {
        // const isLoggedIn = localStorage.getItem('isLoggedIn');
        // if (isLoggedIn) {
        //     const { history } = this.props;
        //     const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         "Access-Control-Request-Method": "POST",
        //         "Authorization": localStorage.getItem("Authentication")
        //     },
        //     body: JSON.stringify({
        //     })
        //     };
        //     console.log("Sending GET Request to Server....");

        //     fetch('http://localhost:8000/api-login/logout', requestOptions)
        //     .then(res => res.json())
        //     .then( (result) => {
        //         console.log(result);
        //         localStorage.removeItem("Authentication");
        //         localStorage.setItem('isAuthenticated', false);
        //         localStorage.setItem('isLoggedIn', false);  

        //         this.setState(
        //             {loading: false}
        //         )
        //         this.handleClick();
        //         history.push("/");
        //         toast("You have signed out of Artemis.")
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({
        //                 error: false
        //             })
        //         this.handleClick();
        // });
        // }
    }

    handleClick = () => {
        this.props.setLoginState();
    }

    render() {
        const { loading, error } = this.state;
        if (loading) {
            return (
                <p>Loading...</p>
            );
        }

        if (error) {
            return <p>Oops! Something went wrong!</p>
        }
        return null
    }
}

export default withRouter(Logout);