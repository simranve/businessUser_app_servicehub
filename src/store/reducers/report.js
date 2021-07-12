import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: null,
  error: null,
  success: null,
  reportListing: [],
  data_report:[],
  professionalReportList:[],
  customerListing:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_REPORT_ACTION:
      return {
          ...state,
          loading:true,
          error:null
      };
    case actionTypes.REPORT_ACTION_FAIL :
        return {
            ...state,
            loading:null,
            error:action.message,
            success:null,
        }
    case actionTypes.FETCH_REPORT_LIST_SUCCESS :
      
        return {
            ...state,
            loading:null,
            reportListing:action.listing,
            error:null,
            success:action.message,
            
        }

    case actionTypes.FETCH_PROFESSIONAL_REPORT_LIST_SUCCESS :
  
      return {
          ...state,
          loading:null,
          professionalReportList:action.listing,
          error:null,
          success:action.message,
          
      }
  
    case actionTypes.FETCH_REPORT_DATA_DATA_SUCCESS :
      console.log(action)
      return {
          ...state,
          loading:null,
          data_report:action.listing,
          error:null,
          success:action.message,
          
      }
    case actionTypes.FETCH_CUSTOMER_REPORT_LIST_SUCCESS :
      console.log(action)
      return {
          ...state,
          loading:null,
          customerListing:action.listing,
          error:null,
          success:action.message,
          
      }
    default:
      return state;
  }
};

export default reducer;
