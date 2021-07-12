import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  firstorderdiscountListing: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FIRST_ORDER_DISCOUNT_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.FIRST_ORDER_DISCOUNT_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_FIRST_ORDER_DISCOUNT_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            firstorderdiscountListing:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
