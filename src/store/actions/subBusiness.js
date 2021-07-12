import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";

export const startsubBusinessAction = () => {
  return {
    type: actionTypes.START_SUB_BUSINESS_ACTION
  };
};
export const startbussinessAction = () => {
  return {
    type: actionTypes.START_BUSSINESS_ACTION
  };
};
export const bussinessActionFail = message => {
  return {
    type: actionTypes.BUSSINESS_ACTION_FAIL,
    message
  };
};

export const startsubBusinessActionExtraProduct = () => {
  return {
    type: actionTypes.START_SUB_BUSINESS_ACTION_EXTRA_PRODUCT
  };
};
export const startsubBusinessActionExtraService = () => {
  return {
    type: actionTypes.START_SUB_BUSINESS_ACTION_EXTRA_SERVICE
  };
};
export const startgetproduct = () => {
  return {
    type: actionTypes.START_SUB_BUSINESS_ACTION_PRODUCT
  };
};
export const startgetservice = () => {
  return {
    type: actionTypes.START_SUB_BUSINESS_ACTION_SERVICE
  };
};
export const subBusinessActionFail = message => {
  return {
    type: actionTypes.SUB_BUSINESS_ACTION_FAIL,
    message
  };
};

export const fetchsubBusinessListSUCCESS = (subBusinessList, message = '') => {
  return {
    type: actionTypes.FETCH_SUB_BUSINESS_LIST_SUCCESS,
    listing: subBusinessList,
    message: message ? message : ''
  };
};
export const fetchgetextraproductListSUCCESS = (extraproductList, message = '') => {
  return {
    type: actionTypes.FETCH_SUB_BUSINESS_EXTRA_PRODUCT,
    listing: extraproductList,
    message: message ? message : ''
  };
};
export const fetchgetextraServiceListSUCCESS = (extraserviceList, message = '') => {
  return {
    type: actionTypes.FETCH_SUB_BUSINESS_EXTRA_SERVICE,
    listing: extraserviceList,
    message: message ? message : ''
  };
};
export const fetchgetproductListSUCCESS = (extraserviceList, message = '') => {
  return {
    type: actionTypes.FETCH_SUB_BUSINESS_PRODUCT,
    listing: extraserviceList,
    message: message ? message : ''
  };
};
export const fetchgetserviceListSUCCESS = (extraserviceList, message = '') => {
  return {
    type: actionTypes.FETCH_SUB_BUSINESS_SERVICE,
    listing: extraserviceList,
    message: message ? message : ''
  };
};
export const fetchbusinessDataSUCCESS = (professionalList) => {
  return {
    type: actionTypes.FETCH_BUSSINESS_DATA_SUCCESS,
    listing: professionalList,
  };
};
export const addBusinessCategory = (data) => {
  return dispatch => {
    dispatch(startsubBusinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-business-category", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchsubBusinessListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editBusinessCategory = (data) => {
  return dispatch => {
    dispatch(startsubBusinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-business-category/" + data.categoryId, data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubBusinessListAction(data.business_id))

          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const deleteBusinessCategory = (data) => {
  return dispatch => {
    dispatch(startsubBusinessAction());
    console.log(data)
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-business-category/" + data.categoryId, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubBusinessListAction(data.business_id))

          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const fetchsubBusinessListAction = (data) => {
  return dispatch => {
    dispatch(startsubBusinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-business-category/" + data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubBusinessListSUCCESS(response.data.data, ""));
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const addBusinessExtraProduct = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraProduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-extra-product", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraproductListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const editBusinessExtraProduct = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraProduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-extra-product/" + data.extra_product_id, data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraproductListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const deleteBusinessExtraProduct = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraProduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-extra-product/" + data.extra_product_id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraproductListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const fetchgetextraproductListAction = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraProduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-extra-product/" + data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchgetextraproductListSUCCESS(response.data.data, ""));
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const addExtraService = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraService());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-extra-service", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraserviceListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editExtraService = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraService());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-extra-service/" + data.extra_service_id, data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraserviceListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const deleteExtraService = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraService());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-extra-service/" + data.extra_service_id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetextraserviceListAction(data.business_id))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const fetchgetextraserviceListAction = (data) => {
  return dispatch => {
    dispatch(startsubBusinessActionExtraService());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-extra-service/" + data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchgetextraServiceListSUCCESS(response.data.data, ""));
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const fetchgetproduct = (data) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-product/" + data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchgetproductListSUCCESS(response.data.data, ""));
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const addProduct = (data, data2,extra_products) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-product", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(addProductExtraProduct({
              product_id:response.data.data._id,
              extra_product_id:extra_products
            },data2))
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetproduct(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editProduct = (data, product_id, data2,extra_products) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-product/" + product_id, data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(addProductExtraProduct({
              product_id:product_id,
              extra_product_id:extra_products
            },data2))
            dispatch(fetchgetproduct(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const deleteProduct = (data, data2) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-product/" + data.product_id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetproduct(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editProductImage = (data, data2) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/update-product-image", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          // if (response.data.status === 200) {
          // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
          dispatch(fetchgetproduct(data2))
          // } else {

          //   dispatch(subBusinessActionFail(response.data.message));
          // }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};

export const fetchgetService = (data) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-service/" + data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchgetserviceListSUCCESS(response.data.data, ""));
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const addService = (data, data2,extra_service) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-service", data, {
        headers: { Authorization: authCode }
      })
      .then(async (response) => {
        if (response.status === 200) {
          // if (response.data.status === 200) {
          // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
          
          await dispatch(addServiceExtraService({
            service_id:response.data.data._id,
            extra_service_id:extra_service
          }))
          dispatch(fetchgetService(data2))
          // } else {
          //   dispatch(subBusinessActionFail(response.data.message));
          // }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const deleteService = (data, data2) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-service/" + data.service_id, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetService(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editService = (data, service_id, data2) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-service/" + service_id, data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetService(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const editServiceImage = (data, data2) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/update-service-image", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          // if (response.data.status === 200) {
          // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
          dispatch(fetchgetService(data2))
          // } else {

          //   dispatch(subBusinessActionFail(response.data.message));
          // }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const addServiceExtraService = (data) => {
  return dispatch => {
    dispatch(startgetservice());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-service-extra-service", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const addProductExtraProduct = (data,data2) => {
  return dispatch => {
    dispatch(startgetproduct());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-product-extra-product", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchsubBusinessListSUCCESS(response.data.message))
            dispatch(fetchgetproduct(data2))
          } else {
            dispatch(subBusinessActionFail(response.data.message));
          }
        } else {
          dispatch(subBusinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subBusinessActionFail(err.message));
      });
  };
};
export const getbusinessOnId = (data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-business-user/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbusinessDataSUCCESS(response.data.data))
            // dispatch(fetchprofessionalListSUCCESS(response.data.data,"Professional deleted sucessfully"));
          } else {
            dispatch(bussinessActionFail(response.data.message));
          }
        } else {
          dispatch(bussinessActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(bussinessActionFail(err.message));
      });
  };
};