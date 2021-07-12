import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  categorylisting: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CATEGORY_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.CATEGORY_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_CATEGORY_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            categorylisting:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
