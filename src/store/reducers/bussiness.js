import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  bussinesslisting: [],
  data_bussiness:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_BUSSINESS_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.BUSSINESS_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_BUSSINESS_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            bussinesslisting:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.FETCH_BUSSINESS_DATA_SUCCESS :
      return {
          ...state,
          loading:null,
          data_bussiness:action.listing,
          error:null,
          success:action.message,
          
      }
    default:
      return state;
  }
};

export default reducer;
