import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";

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

export const fetchbussinessListSUCCESS = (bussinessList,message = '') => {
  return {
    type: actionTypes.FETCH_BUSSINESS_LIST_SUCCESS,
    listing: bussinessList,
    message: message ? message : ''
  };
};
export const fetchbusinessDataSUCCESS = (professionalList) => {
  return {
    type: actionTypes.FETCH_BUSSINESS_DATA_SUCCESS,
    listing: professionalList,
  };
};
export const fetchbussinessListAction = (message) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-bussiness-user", {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListSUCCESS(response.data.data,message));
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

export const businessDeleteAction = (data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-bussiness-user/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
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

export const businessActiveInactive = (data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/update-bussiness-toActiveInactive/"+data,{}, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
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

export const addBusiness = (data,history) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-bussiness-user",data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
            history.push('./business')
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
export const getbusinessOnId = (data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-business/"+localStorage.getItem("userId"), {
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
export const editBusiness = (business_id,data,history) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-business/"+business_id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchbussinessListAction(response.data.message))
            history.push('./../business')  
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
export const editrideshare = (id,data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/update-ride-share/"+id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
            // history.push('./business')
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
export const editrideshareImage = (id,data) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/update-ride-share-image/"+id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
            // history.push('./business')
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
export const addrideshareData = (data,history) => {
  return dispatch => {
    dispatch(startbussinessAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-ride-share",data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchbussinessListAction(response.data.message))
            history.push('./business')
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
