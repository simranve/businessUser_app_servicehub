import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  customerlisting: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CUSTOMER_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.CUSTOMER_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_CUSTOMER_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            customerlisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
