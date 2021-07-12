import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  subscriptionlisting: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SUBSCRIPTION_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.SUBSCRIPTION_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_SUBSCRIPTION_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            subscriptionlisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
