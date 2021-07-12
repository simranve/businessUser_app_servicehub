import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  subcategorylisting: [],
  alllisting: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SUB_CATEGORY_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.SUB_CATEGORY_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_SUB_CATEGORY_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            subcategorylisting:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.FETCH_ALL_SUB_CATEGORY_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            alllisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
