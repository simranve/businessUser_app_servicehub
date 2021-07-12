import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  subBusinesslisting: [],
  extraproductList:[],
  extraserviceList:[],
  productList:[],
  serviceList:[],
  data_bussiness:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SUB_BUSINESS_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.SUB_BUSINESS_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_SUB_BUSINESS_LIST_SUCCESS :
        return {
            ...state,
            loading:null,
            subBusinesslisting:action.listing,
            error:null,
            success:action.message,
            
        }
    case actionTypes.FETCH_SUB_BUSINESS_EXTRA_PRODUCT :
      return {
          ...state,
          loading:null,
          extraproductList:action.listing,
          error:null,
          success:action.message,
      }
    case actionTypes.FETCH_SUB_BUSINESS_EXTRA_SERVICE :
      return {
          ...state,
          loading:null,
          extraserviceList:action.listing,
          error:null,
          success:action.message,
      }
    case actionTypes.START_SUB_BUSINESS_ACTION_EXTRA_PRODUCT:
      return {
          ...state,
          loading:true,
          error:null
      };
    
      case actionTypes.FETCH_SUB_BUSINESS_PRODUCT :
        return {
            ...state,
            loading:null,
            productList:action.listing,
            error:null,
            success:action.message,
        }
      case actionTypes.START_SUB_BUSINESS_ACTION_PRODUCT:
        return {
            ...state,
            loading:true,
            error:null
        };

        case actionTypes.FETCH_SUB_BUSINESS_SERVICE :
          return {
              ...state,
              loading:null,
              serviceList:action.listing,
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
        case actionTypes.START_SUB_BUSINESS_ACTION_SERVICE:
          return {
              ...state,
              loading:true,
              error:null
          };
    default:
      return state;
  }
};

export default reducer;
