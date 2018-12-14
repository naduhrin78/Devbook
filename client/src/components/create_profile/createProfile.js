import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "./../common/TextFieldGroup";
import SocialNetworkLink from "./../common/SocialNetworkLink";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      displaySocialInputs: false,
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      errors: {}
    };

    console.log(this.state.handle);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div class="create-profile">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <a href="dashboard.html" class="btn btn-light">
                Go Back
              </a>
              <h1 class="display-4 text-center">Create Your Profile</h1>
              <p class="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  value={this.state.handle}
                  onChange={this.onChange}
                  errors={errors.handle}
                  placeholder="* Profile handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name,
                  company name, nickname, etc (This CAN'T be changed later)"
                />

                <div class="form-group">
                  <select class="form-control form-control-lg" name="status">
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small class="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>

                <TextFieldGroup
                  type="text"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  type="text"
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={errors.website}
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                />

                <TextFieldGroup
                  type="text"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                  placeholder="Location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  type="text"
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={errors.skills}
                  placeholder="Skills"
                  name="skills"
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />

                <TextFieldGroup
                  type="text"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  errors={errors.githubusername}
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link, include
                  your username"
                />

                <div class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    placeholder="A short bio of yourself"
                    name="bio"
                  />
                  <small class="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>

                <div class="mb-3">
                  <button type="button" class="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span class="text-muted">Optional</span>
                </div>

                <SocialNetworkLink
                  site="twitter"
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  value={this.state.twitter}
                />

                <SocialNetworkLink
                  site="facebook"
                  placeholder="Facebook Profile URL"
                  name="facebook"
                  value={this.state.facebook}
                />

                <SocialNetworkLink
                  site="linkedin"
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  value={this.state.linkedin}
                />

                <SocialNetworkLink
                  site="youtube"
                  placeholder="Youtube Channel URL"
                  name="youtube"
                  value={this.state.youtube}
                />

                <SocialNetworkLink
                  site="instagram"
                  placeholder="Instagram Page URL"
                  name="instagram"
                  value={this.state.instagram}
                />

                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
