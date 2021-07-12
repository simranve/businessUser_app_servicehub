import axios from "../../axios-config";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userInfo) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userInfo: userInfo,
    error: "Login Successfully"
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const logoutAction = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const showAlertNotification = (type, message) => {
  return {
    type: actionTypes.SHOW_ALERT_NOTIFICATION,
    alertType: type,
    alertMessage: message
  };
};
export const auth = (data) => {
  return dispatch => {
    dispatch(authStart());
    console.log(data)
    const authData = {
      email: data.email,
      password: data.password,
      country_code: data.country_code,
      user_type: data.user_type,
    };

    axios
      .post(`/businessUserAdmin/login`, authData)
      .then(response => {
        if (response.status === 200) {
          let apiResponse = response.data;
          if (apiResponse.status === 0) {
            dispatch(authFail(apiResponse.message));
          } else {
            // console.log(response.data._id);
            
            localStorage.setItem("token", response.headers.authorization);
            localStorage.setItem("userId",response.data.data._id);
            localStorage.setItem("bussinessName",response.data.data.bussinessName);
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            console.log(localStorage.getItem("token"))
            dispatch(
              authSuccess(response.headers.authorization, response.data.data)
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
        //dispatch(authFail(err.response.data.error))
      });
  };
};
export const logout = () => {
  return dispatch => {
    let authCode = "Bearer " + localStorage.getItem("token");
      
        // if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("userId");
          dispatch(logoutAction());
        // }
    
  };
};