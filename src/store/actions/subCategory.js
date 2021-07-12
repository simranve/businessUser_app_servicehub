import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";

export const startsubCategoryAction = () => {
  return {
    type: actionTypes.START_SUB_CATEGORY_ACTION
  };
};

export const subCategoryActionFail = message => {
  return {
    type: actionTypes.SUB_CATEGORY_ACTION_FAIL,
    message
  };
};

export const fetchsubCategoryListSUCCESS = (subCategoryList,message = '') => {
  return {
    type: actionTypes.FETCH_SUB_CATEGORY_LIST_SUCCESS,
    listing: subCategoryList,
    message: message ? message : ''
  };
};

export const fetchallsubCategoryListSUCCESS = (allsubCategoryList,message = '') => {
  return {
    type: actionTypes.FETCH_ALL_SUB_CATEGORY_LIST_SUCCESS,
    listing: allsubCategoryList,
    message: message ? message : ''
  };
};

export const fetchsubCategoryListAction = (data) => {
  return dispatch => {
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/professionalApp/category/get-sub-category/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubCategoryListSUCCESS(response.data.data,""));
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};

export const addsubCategoryAction = (data,category_id) => {
  return dispatch => {
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/professionalApp/category/add-sub-category", data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubCategoryListAction(category_id))
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};
export const subCategoryDeleteAction = (data,categoryId) => {
  return dispatch => {
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    console.log(categoryId)
    debugger
    axios
      .delete("/professionalApp/category/delete-sub-category/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubCategoryListAction(categoryId))
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};

export const subCategoryUpdateAction = (data,categoryId) => {
  return dispatch => {
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/professionalApp/category/edit-sub-category/"+data.subCategoryId,{name:data.name,locality:data.locality,location_required:data.location_required}, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubCategoryListAction(categoryId))
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};

export const subCategoryUpdateImageAction = (data,categoryId,subCategoryId) => {
  return dispatch => {
    debugger
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/professionalApp/category/update-sub-category-image/"+subCategoryId,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchsubCategoryListAction(categoryId))
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};

export const fetchallsubCategoryListAction = () => {
  return dispatch => {
    dispatch(startsubCategoryAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/professionalApp/get-all-sub-category", {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchallsubCategoryListSUCCESS(response.data.data,""));
          } else {
            dispatch(subCategoryActionFail(response.data.message));
          }
        } else {
          dispatch(subCategoryActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(subCategoryActionFail(err.message));
      });
  };
};
