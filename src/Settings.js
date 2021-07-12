import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      buttonLabel:0,
      className:0,
      toggle:true,
      modal:false,
      cityId:'',
      open:false
    }
  }
  componentWillMount() {
    this.props.fetchcity();
    console.log(this.props.citylisting)
  }
  changeActiveStatus (id) {
    
    if(id){
      this.props.activeInactiveCity(id);
    }
  }
  handleOpenDelete = (id) => {
    
		if(id) {

      this.setState({ 
        cityId : id,
        open:true 
      });
		}
	
	}
  deleteUserPermanently() {
		if(this.state.cityId) {
			this.props.deleteCity(this.state.cityId);
      this.close()
		}
  }
  open() {
    this.setState({ open: true });
  }

  close() {
      this.setState({ open: false });
  }
  render(){
    var sno = 1

    let cityList = [];
    let cityTable = <Spinner />;
    
    {this.props.citylisting.length > 0?
      this.props.citylisting.map(datas=>{
        
        cityList.push(
          {
        
            s_no:(sno++),
            country_id:datas.country_id,
            checkque_limit_min:datas.checkque_limit.min,
            checkque_limit_max:datas.checkque_limit.max,
            city_name:datas.city_name,
            region_name:datas.region_name,
            radius:datas.radius,
            cancellation_fees:datas.cancellation_fees,
            action:<div>
              <NavLink className='btn btn-icon btn-default btn-sm' to={'/addcity/'+datas._id} >
                <span className='btn-inner--icon'><i className='fas fa-pencil-alt' /></span>
              </NavLink>
          {datas.is_active == true?<button class='btn btn-icon btn-success btn-sm' type='button' 
          onClick={(id) =>this.changeActiveStatus(datas._id)}
          >
              <span class='btn-inner--icon'><i class='ni ni-check-bold' /></span>
            </button>:
            <button class='btn btn-icon btn-danger btn-sm' type='button' 
            onClick={(id) =>this.changeActiveStatus(datas._id)}
            >
              <span class='btn-inner--icon'><i class='ni ni-fat-remove' /></span>
            </button>}
            
            <button class='btn btn-icon btn-danger btn-sm' type='button' 
            onClick={(id) =>this.handleOpenDelete(datas._id)}
            >
              <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
            </button>
          </div>
        
          }
        )
      })
      
      :cityList.push(
        ["No record"]
        )}
        const data = {
          columns: [
            {
              label: "Sr.No",
              field: "s_no",
              sort: "asc",
            },
            {
              label: "Country",
              field: "country_id",
              sort: "asc",
            },
            {
              label: "State name",
              field: "city_name",
              sort: "asc",
            },
            {
              label: "City name",
              field: "region_name",
              sort: "asc",
            },
            {
              label: "Checkque Limit min",
              field: "checkque_limit_min",
              sort: "asc",
            },
            {
              label: "Checkque Limit max",
              field: "checkque_limit_max",
              sort: "asc",
            },
            {
              label: "Radius",
              field: "radius",
              sort: "asc",
            },
            {
              label: "Cancellation Fees",
              field: "cancellation_fees",
              sort: "asc",
            },
            
            {
              label: "Action",
              field: "action",
              sort: "asc",
            },
          ],
          rows: cityList,
        };
    
        cityTable = (
          <MDBDataTable striped bordered hover entries={10} data={data} />
        );
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Settings</h6>
                </div>
              </div>
              <Dialog
                      open={this.state.open}
                      onClose={() => this.close()}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">Do you want to delete Business Owner?</DialogTitle>
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
              <ul className='nav nav-pills nav-fill flex-column flex-sm-row' id='tabs-text' role='tablist'>
                <li className='nav-item'>
                  <Link to='/aboutus' className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>About Us</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/privacypolicy' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Privacy Policy</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/termandcondition' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Term & Condition</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/contactus' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Contact Us</Link>
                </li>
                {/* <li className='nav-item'>
                  <Link to='/settings' className='nav-link mb-sm-3 mb-md-0 active' id='tabs-text-1-tab' data-toggle='tab' href='#tabs-text-1' role='tab' aria-controls='tabs-text-1' aria-selected='true'>Multi City Settings</Link>
                </li> */}
                <li className='nav-item'>
                  <Link to='/firstorderdiscount' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>First Order Discount</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/promocode' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-3-tab' data-toggle='tab' href='#tabs-text-3' role='tab' aria-controls='tabs-text-3' aria-selected='false'>Promo Code</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/subscription' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-3-tab' data-toggle='tab' href='#tabs-text-3' role='tab' aria-controls='tabs-text-3' aria-selected='false'>Subscription</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-header'>
                  <div className='row align-items-center'>
                    <div className='col-5'>
                      <h3 className='mb-0'>Multi City Setting</h3>
                    </div>
                    <div className='col-lg-4'>
                      <div className='input-group'>
                        {/* <input type='text' className='form-control' placeholder='Search' aria-describedby='button-addon2' />
                        <div className='input-group-append'>
                          <button className='btn btn-outline-primary' type='button' id='button-addon2'>Search</button>
                        </div> */}
                      </div>
                    </div>
                    <div className='col-3'>
                      {/* <Link className='btn btn-primary float-right' onClick={this.state.toggle}>Enter Tip</Link> */}
                      <Link className='btn btn-primary float-right mr-3' to='/addcity'>Add City</Link>
                    </div>
                  </div>
                </div>
  
                <div className='card-body'>
  
                  <div className='table-responsive'>
                    {cityTable}
                  </div>
                </div>
  
              </div>
            </div>
          </div>
  
  
          <Modal isOpen={this.state.modal} toggle={this.state.toggle} className={this.state.className}>
          <ModalHeader toggle={this.state.toggle}>Enter Tip</ModalHeader>
          <ModalBody>
            
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
            <label className="form-check-label" for="exampleRadios1">10%</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
            <label className="form-check-label" for="exampleRadios2">20%</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
            <label className="form-check-label" for="exampleRadios3">30%</label>
          </div>
  
          <div className="form-group mt-4">
            <label for="amount">Enter Customer Amount</label>
            <input type="text" className="form-control" id="amount" aria-describedby="emailHelp" placeholder="Enter Amount"/>
          </div>
  
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.state.toggle}>Add Tip</Button>{' '} */}
            <Button color="secondary" onClick={this.state.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  
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
    success: state.bussiness.success,
    error: state.bussiness.error,
    citylisting: state.city.citylisting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activeInactiveCity: (data) => dispatch(actions.activeInactiveCityAction(data)),
    fetchcity: (data) => dispatch(actions.fetchcitysListAction(data)),
    deleteCity: (data) => dispatch(actions.deleteCityAction(data)),
    
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(Settings));
