import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";

export const startOrderAction = () => {
  return {
    type: actionTypes.START_ORDER_ACTION
  };
};

export const orderActionFail = message => {
  return {
    type: actionTypes.ORDER_ACTION_FAIL,
    message
  };
};

export const fetchOrderListSUCCESS = (categoryList,message = '') => {
  return {
    type: actionTypes.FETCH_ORDER_LIST_SUCCESS,
    listing: categoryList,
    message: message ? message : ''
  };
};
export const fetchorderDataSUCCESS = (professionalList) => {
  return {
    type: actionTypes.FETCH_ORDER_DATA_DATA_SUCCESS,
    listing: professionalList,
  };
};
export const fetchOrderListAction = (message = '') => {
  return dispatch => {
    dispatch(startOrderAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/professionalApp/get-order-list", {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchOrderListSUCCESS(response.data.data,message));
          } else {
            dispatch(orderActionFail(response.data.message));
          }
        } else {
          dispatch(orderActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(orderActionFail(err.message));
      });
  };
};
export const updateOrderListAction = (orderId,data) => {
  return dispatch => {
    dispatch(startOrderAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/professionalApp/update-order/"+orderId, data,{
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchOrderListAction(""));
          } else {
            dispatch(orderActionFail(response.data.message));
          }
        } else {
          dispatch(orderActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(orderActionFail(err.message));
      });
  };
};
export const orderDetails = (orderId) => {
  return dispatch => {
    dispatch(startOrderAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/professionalApp/get-order/"+orderId,{
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            
            dispatch(fetchorderDataSUCCESS(response.data.data));
          } else {
            dispatch(orderActionFail(response.data.message));
          }
        } else {
          dispatch(orderActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(orderActionFail(err.message));
      });
  };
};
