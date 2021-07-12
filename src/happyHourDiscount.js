import React, { Component } from 'react'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

class HappyHourDiscount extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      start_time: 0,
      business_id: "",
      end_time: "",
      discount: 0,
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
        start_time: getData.bussiness_info.happy_hours.start_time,
        end_time: getData.bussiness_info.happy_hours.end_time,
        discount: getData.bussiness_info.happy_hours.discount,
      }) 
    }
    return (
      <div>
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Happy Hour Discount</h6>
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
                            <label className='form-control-label' for='input-username'>START TIME  : </label>
                            <span>
                              {this.state.start_time}
                              </span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>END TIME  : </label>
                            <span>
                              {this.state.start_time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>DISCOUNT  : </label>
                            <span>
                              {this.state.discount} %
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
)(withSnackbar(HappyHourDiscount));
