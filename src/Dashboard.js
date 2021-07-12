import React, { Component } from 'react'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

class Dashboard extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      additional_charge: 0,
      business_id: "",
      createdAt: "",
      description: "",
      empty_driver_per_mile_charge: 0,
      empty_driver_seat: 0,
      min_charge: 0,
      per_mile_charge: 0,
      per_min_charge: 0,
      picture: "",
      updatedAt: ""
    }
    this.updateState = this.updateState.bind(this);
  }
  async updateState(data) {
    // await this.setState(data);
    setTimeout(async () => {
      await this.setState(data)
    }, 1000)
  }
  async componentWillMount() {

    let business_id = localStorage.getItem('bussinessName');
    if (business_id) {
      await this.props.getbusiness(business_id)
      var getData = await this.props.data_bussiness
      await this.setState({
        business_id: business_id,
      });
    }
  }
  render() {
    const userToken = localStorage.getItem('token')
    let business_id = localStorage.getItem('bussinessName')
    let getData = this.props.data_bussiness;
    if (
      business_id 
      &&
      (!this.state.businessId || this.state.businessId !== getData._id) &&
      this.props.data_bussiness &&
      this.props.data_bussiness._id
    ) {
      this.updateState({
       // {
        business_id: business_id,
        additional_charge: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].additional_charge:0,
        description: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].description:'',
        empty_driver_per_mile_charge: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].empty_driver_per_mile_charge:'',
        empty_driver_seat: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].empty_driver_seat:'',
        min_charge: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].min_charge:'',
        per_mile_charge: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].per_mile_charge:'',
        per_min_charge: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].per_min_charge:'',
        picture: (getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].picture:'',
      }) 
    }
    let authRedirect = null
    if (!userToken) { 
      // authRedirect = <Redirect from="./Dashboard" to= "/"/>
    }
    return (
      <div>
        {authRedirect}
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Delivery</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-header'>
                  {/* <div className='row align-items-center'>
                    <div className='col-6'>
                      <h3 className='mb-0'>Contact Us</h3>
                    </div>
                  </div> */}
                </div>
  
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>Additional Charge  : </label>
                            <span>
                              {this.state.additional_charge}
                              </span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>Additional Charge  : </label>
                            <span>
                              {this.state.additional_charge}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>empty_driver_per_mile_charge  : </label>
                            <span>
                              {this.state.empty_driver_per_mile_charge}
                            </span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>min_charge  : </label>
                            <span>
                              {this.state.min_charge}
                            </span>
                          </div>
                        </div>
                      </div>
  
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>per_mile_charge  : </label>
                            <span>
                              {this.state.per_mile_charge}
                            </span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>per_min_charge  : </label>
                            <span>
                              {this.state.per_min_charge}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>picture  : </label>
                            <img src={this.state.picture === '' ? '../assets/img/theme/img-1-1000x600.jpg' : this.state.picture} alt='Image placeholder' className='card-img-top' />
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>empty_driver_seat  : </label>
                            <span>
                              {this.state.empty_driver_seat}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
      
      </div>
  )
}
}
const mapPropsToState = (state) => {
  return {
    loading: state.subBusiness.loading,
    error: state.subBusiness.error,
    data_bussiness: state.subBusiness.data_bussiness
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getbusiness: (data) => dispatch(actions.getbusinessOnId(data))
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(Dashboard));
