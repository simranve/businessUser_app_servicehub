import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";

export const startReportAction = () => {
  return {
    type: actionTypes.START_REPORT_ACTION
  };
};
export const startProfessionalReportAction = () => {
  return {
    type: actionTypes.START_PROFESSIONAL_REPORT_ACTION
  };
};
export const startCustomerReportAction = () => {
  return {
    type: actionTypes.START_CUSTOMER_REPORT_ACTION
  };
};

export const reportsActionFail = message => {
  return {
    type: actionTypes.REPORT_ACTION_FAIL,
    message
  };
};

export const fetchReportListSUCCESS = (categoryList,message = '') => {
  return {
    type: actionTypes.FETCH_REPORT_LIST_SUCCESS,
    listing: categoryList,
    message: message ? message : ''
  };
};
export const fetchProfessionalReportListSUCCESS = (categoryList,message = '') => {
  return {
    type: actionTypes.FETCH_PROFESSIONAL_REPORT_LIST_SUCCESS,
    listing: categoryList,
    message: message ? message : ''
  };
};
export const fetchCustomerReportListSUCCESS = (categoryList,message = '') => {
  return {
    type: actionTypes.FETCH_CUSTOMER_REPORT_LIST_SUCCESS,
    listing: categoryList,
    message: message ? message : ''
  };
};
export const fetchreportDataSUCCESS = (professionalList) => {
  return {
    type: actionTypes.FETCH_REPORT_DATA_DATA_SUCCESS,
    listing: professionalList,
  };
};
export const fetchReportListAction = (message = '') => {
  return dispatch => {
    dispatch(startReportAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-businesses-report", {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchReportListSUCCESS(response.data.data,message));
          } else {
            dispatch(reportsActionFail(response.data.message));
          }
        } else {
          dispatch(reportsActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(reportsActionFail(err.message));
      });
  };
};
export const fetchReportProfessionalListAction = (id) => {
  return dispatch => {
    dispatch(startProfessionalReportAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-professional-report/"+id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchProfessionalReportListSUCCESS(response.data.data,''));
          } else {
            dispatch(reportsActionFail(response.data.message));
          }
        } else {
          dispatch(reportsActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(reportsActionFail(err.message));
      });
  };
};

export const fetchReportCustomerListAction = (id) => {
  return dispatch => {
    dispatch(startCustomerReportAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-customer-report/"+id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchCustomerReportListSUCCESS(response.data.data,''));
          } else {
            dispatch(reportsActionFail(response.data.message));
          }
        } else {
          dispatch(reportsActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(reportsActionFail(err.message));
      });
  };
};
