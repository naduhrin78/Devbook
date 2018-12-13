import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "./../common/TextFieldGroup";
import { registerUser } from "./../../actions/authActions";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      errors: this.state.errors
    };

    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  errors={errors.name}
                  placeholder="Name"
                  name="name"
                />
                <TextFieldGroup
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
                  placeholder="Email Address"
                  name="email"
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />

                <TextFieldGroup
                  type="password"
                  value={this.state.password1}
                  onChange={this.onChange}
                  errors={errors.password1}
                  placeholder="Password"
                  name="password1"
                />
                <TextFieldGroup
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  errors={errors.password2}
                  placeholder="Password"
                  name="password2"
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
