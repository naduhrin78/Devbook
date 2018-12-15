import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  // Loading profile
  dispatch(profileLoading());

  axios
    .get("/api/profiles")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  // Loading profile
  dispatch(profileLoading());

  axios
    .post("/api/profiles", profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Load while asynchronous profile operations happen
export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clears current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
