// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Authenticate.css';

// COMPONENTS
import Login from './Login';
import Register from './Register';

class Authenticate extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                console.log(response)
                this.setState({users: response.data.user_list})
            })
    }

    showLoginForm = () => {
        this.setState({login: true});
    }

    showRegisterForm = () => {
        this.setState({login: false});
    }

    render(){

        const login = this.state.login;
        return(

            <div className="auth">
                <div className="auth-splash">
                    <h1 className="auth-title">Huntington<br/>Hold'em</h1>
                    <h2 className="auth-subtitle">Ten cards. Two minutes. Win cash.</h2>
                </div>
                <div className="auth-info">
                {
                  login?
                    <Login triggerParentUpdate={this.showRegisterForm} />
                  :
                    <Register triggerParentUpdate={this.showLoginForm} />
                }
                </div>
          </div>
        )
    }
}

export default Authenticate;