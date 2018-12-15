import React, { Component } from "react";
import "./Login.css";
/*import axios from 'axios';*/
import Button from "@material-ui/core/Button";

/*format login code for username and password as well as css for Login view*/

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    /*this.post = this.post.bind(this)*/
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*post() {
        axios.post(`/api/list`, {
            username: this.state.username,
            password: this.state.password,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

            });

    }*/
  render() {
    return (
      <div className="LoginBox">
        <form className="LoginForm">
          <input className="userBox1"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="USERNAME"
          />
          <br/>
          <input className="userBox2" 
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="PASSWORD"
          />
          <br/>
          <Button variant="contained" color="primary">
            LOGIN
          </Button>
          <Button variant="contained" color="primary">Register</Button>
        </form>
      </div>
    );
  }
}

export default Login;
