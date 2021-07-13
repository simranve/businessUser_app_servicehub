import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-config";
import { Redirect } from "react-router-dom";
export const startprofessionalAction = () => {
  return {
    type: actionTypes.START_PROFESSIONAL_ACTION
  };
};

export const professionalActionFail = message => {
  return {
    type: actionTypes.PROFESSIONAL_ACTION_FAIL,
    message
  };
};

export const fetchprofessionalListSUCCESS = (professionalList,message) => {
  return {
    type: actionTypes.FETCH_PROFESSIONAL_LIST_SUCCESS,
    listing: professionalList,
    message: message ? message : ''
  };
};

export const fetchprofessionalDataSUCCESS = (professionalList) => {
  return {
    type: actionTypes.FETCH_PROFESSIONAL_DATA_SUCCESS,
    listing: professionalList,
  };
};


export const fetchprofessionalListAction = (message) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-professionals/"+localStorage.getItem('userId'), {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchprofessionalListSUCCESS(response.data.data,message));
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};

export const professionalDeleteAction = (data) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .delete("/businessUserAdmin/delete-professionals/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchprofessionalListAction(response.data.message))
            // dispatch(fetchprofessionalListSUCCESS(response.data.data,"Professional deleted sucessfully"));
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};

export const professionalActiveInactive = (data) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/update-professionals-toActiveInactive/"+data,{}, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchprofessionalListAction(response.data.message))
            // dispatch(fetchprofessionalListSUCCESS(response.data.data,"Professional deleted sucessfully"));
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};

export const addProfessional = (data,history) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .post("/businessUserAdmin/add-professionals",data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            dispatch(fetchprofessionalListAction(response.data.message))
            history.push('./professionals')
            // dispatch(fetchprofessionalListSUCCESS(response.data.data,"Professional deleted sucessfully"));
            // var redirect = <Redirect from="/addprofessionals" to= "./professionals"/>
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};
export const fetchprofessionalAction = (data) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/get-business/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            
            dispatch(fetchprofessionalDataSUCCESS(response.data.data));
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};
export const editProfessional = (data,professional_id) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/edit-professional/"+professional_id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {
            // dispatch(fetchprofessionalListAction(response.data.message))
            // history.push('./../professionals')
            // dispatch(fetchprofessionalListSUCCESS(response.data.data,"Professional deleted sucessfully"));
            // var redirect = <Redirect from="/addprofessionals" to= "./professionals"/>
          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};
export const editProfessionalImage = (data,professional_id) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/update-user-profile-pic/"+professional_id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {

          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};
export const removeCerificates = (data,professional_id) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .get("/businessUserAdmin/remove-cerificates/"+professional_id+"/"+data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {

          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};
export const addCerificates = (data,professional_id) => {
  return dispatch => {
    dispatch(startprofessionalAction());
    const authCode = "Bearer " + localStorage.getItem("token");
    axios
      .put("/businessUserAdmin/add-cerificates/"+professional_id,data, {
        headers: { Authorization: authCode }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.status === 200) {

          } else {
            dispatch(professionalActionFail(response.data.message));
          }
        } else {
          dispatch(professionalActionFail(response.message));
        }
      })
      .catch(err => {
        dispatch(professionalActionFail(err.message));
      });
  };
};