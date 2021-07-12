import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  listing: [],
  data_professional:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PROFESSIONAL_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.PROFESSIONAL_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_PROFESSIONAL_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            listing:action.listing,
            error:null,
            success:action.message,
            
        }
      case actionTypes.FETCH_PROFESSIONAL_DATA_SUCCESS :
    
        return {
            ...state,
            loading:null,
            data_professional:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
