import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  citylisting: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CITY_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.CITY_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_CITY_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            citylisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
