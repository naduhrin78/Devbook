import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, LOGIN_USER } from "./types";
import setAuthToken from "./../utility/setAuthToken";

// Register a user
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login a user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      // Save token in local storage for protected route access
      localStorage.setItem("jwtToken", token);

      // Configure token to be required for any protected route access
      setAuthToken(token);

      // Dispatch login user
      dispatch(setCurrentUser(jwt_decode(token)));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Lougout a user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: LOGIN_USER,
    payload: decoded
  };
};
