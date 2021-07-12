import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  pages: null,
  contact:null,
  promoCode:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PAGES_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.PAGES_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_PAGES_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            pages:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.START_CONTACT_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.CONTACT_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_CONTACT_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            contact:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.START_PROMO_CODE:
        return {
            ...state,
            loading:true,
            error:null
        };
    case actionTypes.FETCH_PROMO_CODE_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            promoCode:action.listing,
            error:null,
            success:action.message,
            
        }
    default:
      return state;
  }
};

export default reducer;
