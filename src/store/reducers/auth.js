import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userInfo: null,
  error: null,
  loading: false,
  success:false,
  dashboardStats: null,
  dashboardStatsNotification: null,
  listingunread: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userInfo: action.userInfo,
        error: action.success,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case actionTypes.SHOW_ALERT_NOTIFICATION:
      return {
        ...state,
        alertNotification: {
          type: action.alertType,
          message: action.alertMessage,
          error:action.alertMessage
        }
      };
    default:
      return state;
  }
};

export default reducer;
