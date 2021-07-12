import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  adminUserListing: [],
  dataadminuser:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_ADMIN_USER_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.ADMIN_USER_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_ADMIN_USER_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            adminUserListing:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.FETCH_ADMIN_USER_LIST_OBJECT :
      
        return {
            ...state,
            loading:null,
            dataadminuser:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
