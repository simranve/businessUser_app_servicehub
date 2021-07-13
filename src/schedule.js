import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import * as actions from "./store/actions/index";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";

class Schedule extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      professionalId : "",
      open: false
    }
  }
  componentWillMount() {
    this.props.fetchprofessional();
  }
  deleteUserPermanently() {
		if(this.state.professionalId) {
			this.props.deleteprofessional(this.state.professionalId);
      this.setState({
        professionalId : "",
      })
      this.close()
		}
  }
  componentDidUpdate(prevProps, prevState) {
    
    const { enqueueSnackbar, error, success } = this.props;
    success && enqueueSnackbar(success, { variant: "success" });
    error && enqueueSnackbar(error, { variant: "error" });
  }
  changeActiveStatus (id) {
    if(id){
      this.props.professionalActiveInactiveStatus(id);
    }
  }
  handleOpenDelete = (id) => {
		if(id) {
      this.setState({ 
        open:true,
        professionalId : id, 
      });
		}
	}
  open() {
    this.setState({ open: true });
  }

  // close dialog
  close() {
      this.setState({ open: false });
  }
  render () {
    let businessList = [];
    let businessTable = <Spinner />;
    var sno = 1
    {this.props.listing.length > 0?
      this.props.listing.map(datas=>{
        
        businessList.push(
          {
        
            s_no:(sno++),
            pName:datas.name,
            cInfo:datas.country_code+datas.mobile_no,
            bName:datas.bussinessName,
            pEmail:datas.email,
            // datas.country,
            city:(datas.local_city == null)?null:datas.local_city,
            radius:(datas.radius == null)?null:datas.radius,
            action:
            <div>
            {/* {datas.is_active == true?<button class='btn btn-icon btn-success btn-sm' onClick={(id) =>this.changeActiveStatus(datas._id)}>
              <span class='btn-inner--icon'><i class='ni ni-check-bold' /></span>
            </button>:
            <button class='btn btn-icon btn-danger btn-sm' onClick={(id) =>this.changeActiveStatus(datas._id)}>
              <span class='btn-inner--icon'><i class='ni ni-fat-remove' /></span>
            </button>}
            <button class='btn btn-icon btn-danger btn-sm' 
            onClick={(id) =>this.handleOpenDelete(datas._id)}
            >
              <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
            </button> */}
            <NavLink className='btn btn-icon btn-default btn-sm' to={'/editprofessional/'+datas._id} >
              <span className='btn-inner--icon'><i className='fas fa-pencil-alt' /></span>
            </NavLink>
          </div>
        
        }
        )
      })
      
      :businessList.push(
        ["No record"]
        )}
        const columns = ["Sr.No","Professional Name", "Contact Info","Business Name","Professional Email", "City", "Action"];

        const data = {
          columns: [
            {
              label: "Sr.No",
              field: "s_no",
              sort: "asc",
            },
            {
              label: "Professional Name",
              field: "pName",
              sort: "asc",
            },
            {
              label: "Contact Info",
              field: "cInfo",
              sort: "asc",
            },
            {
              label: "Business Name",
              field: "bName",
              sort: "asc",
            },
            {
              label: "Professional Email",
              field: "pEmail",
              sort: "asc",
            },
            {
              label: "City",
              field: "city",
              sort: "asc",
            },
            {
              label: "radius",
              field: "radius",
              sort: "asc",
            },
            {
              label: "Action",
              field: "action",
              sort: "asc",
            },
          ],
          rows: businessList,
        };
    
        businessTable = (
          <MDBDataTable striped bordered hover entries={10} data={data} />
        );

    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Professional</h6>
                </div>
              </div>
              <Dialog
                open={this.state.open}
                onClose={() => this.close()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Do you want to delete Professional?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button class='btn btn-icon btn-danger btn-sm' type='button' onClick={() => this.close()}>
                            No
                  </button>
                  <button class='btn btn-icon btn-success btn-sm' onClick={()=>this.deleteUserPermanently()} type='button'>
                            Yes
                  </button>
                </DialogActions>
            </Dialog>
            </div>
          </div>
        </div>

        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
               <div className='card'> 
                <div className='card-header border-0'> 
                  <div className='row align-items-center py-4'>
                    <div className='col-lg-6'>
                    </div> 
                    {/* <div className='col-lg-6'>
                      <Link class='btn btn-primary float-right' to='/addprofessionals'>Add Professional</Link>
                    </div> */}
                  </div>
                  <div className='table-responsive'>
                    {businessTable}
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <footer className='footer pt-0'>
            <div className='row align-items-center justify-content-lg-between'>
              <div className='col-lg-6'>
                <div className='copyright text-center text-lg-left  text-muted mt-4 ml-4'>
                &copy; 2020  StreetCarrier
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}
const mapPropsToState = (state) => {
  return {
    success: state.professional.success,
    error: state.professional.error,
    listing: state.professional.listing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchprofessional: () => dispatch(actions.fetchprofessionalListAction()),
    deleteprofessional: (data) => dispatch(actions.professionalDeleteAction(data)),
    professionalActiveInactiveStatus: (data) => dispatch(actions.professionalActiveInactive(data))
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(Schedule));
