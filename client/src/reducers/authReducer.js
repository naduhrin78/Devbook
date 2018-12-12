import { LOGIN_USER } from "./../actions/types";
import isEmpty from "./../utility/isEmpty";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
