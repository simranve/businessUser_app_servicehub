import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  countrylisting: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_COUNTRY_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.COUNTRY_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_COUNTRY_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            countrylisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
