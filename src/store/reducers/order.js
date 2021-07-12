import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  orderListing: [],
  data_order:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_ORDER_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.ORDER_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_ORDER_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            orderListing:action.listing,
            error:null,
            success:action.message,
            
        }

    case actionTypes.FETCH_ORDER_DATA_DATA_SUCCESS :
      console.log(action)
      return {
          ...state,
          loading:null,
          data_order:action.listing,
          error:null,
          success:action.message,
          
      }
    default:
      return state;
  }
};

export default reducer;
