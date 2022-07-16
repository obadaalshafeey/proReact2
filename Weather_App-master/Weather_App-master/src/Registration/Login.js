import React, { Component } from "react";
import axios from 'axios';
const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
          
            email: '',
            password: '',
            isError: {
               
                error: false,
                password: ''
            },
        }
    }


    onSubmit = e => {
        e.preventDefault();

       
        let email=this.state.email
        let password=this.state.password


        axios.get('http://localhost/CARAGE/PHP.PHP/read.php?email='+email+'&password='+password).then(res => {

                        console.log(res.data);
                        
                            console.log(res.data);
                            sessionStorage.setItem("user_id", res.data);
                            let id= sessionStorage.getItem("user_id");
                            console.log("heh"+id);


  if(id > 0){
            window.location.href = "/";


        }else{
            this.setState({isError:{error:true}});
            
        }

                      
                      })
      
        




    };


    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

    
        this.setState({
            isError,
            [name]: value
        })
    };

    render() {
        const { isError } = this.state;

        return (
            <form id='regForm' onSubmit={this.onSubmit} noValidate>
                            <h1>Login</h1>


                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className={isError.error ? "is-invalid form-control regForm" : "form-control regForm"}
                        name="email"
                        onChange={this.formValChange}
                        
                    />
                     {isError.error  && (
                        <span className="invalid-feedback">email or password is wrong</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className= "form-control regForm"
                        name="password"
                        onChange={this.formValChange}
                    />
                 
                </div>
                <div class="BTNcontainer">
                <div class="center">
                <button type="submit" className="btn" id="regBtn">Login</button>
                </div>
                </div>
                <p id='regP'>Not a member yet? <a href="/SignUp">Sign Up</a></p>
            </form>
        );
    }
}