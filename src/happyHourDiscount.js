import React, { Component } from 'react'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import {
  Input,
} from 'reactstrap'
import data from './data.json'

class HappyHourDiscount extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      
      happyHourstartHour: '01',
      happyHourstartMin: '00',
      // happyHourstartFormat:'AM',
      happyHourStartTime: '',
      formErrhappyHourStartTime: '',

      happyHourEndHour: '01',
      happyHourEndMin: '00',
      // happyHourEndFormat:'AM',
      happyHourEndTime: '',
      formErrhappyHourEndTime: '',

      
      happyHourDiscount: '',
      formErrhappyHourDiscount: '',

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

    let business_id = localStorage.getItem('userId');
    if (business_id) {
      await this.props.getbusiness(business_id)
      var getData = await this.props.data_bussiness
      await this.setState({
        business_id: business_id,
      });
    }
  }
  handleSubmit = async () => {
    await this.setState({
      formErrhappyHourDiscount: (this.state.happyHourDiscount === '') ? "Please provide this field" : '',
    })
    if (!(this.state.happyHourDiscount === '')) {
      let getData = await this.props.data_bussiness;
      let businessInfo = JSON.stringify({
        happy_hours: {
              start_time: this.state.happyHourStartTime,
              end_time: this.state.happyHourEndTime,
              discount: this.state.happyHourDiscount
            },
            open_time: getData.bussiness_info.open_time,
            close_time: getData.bussiness_info.close_time,
            location: getData.bussiness_info.location,
            servicehubConnetFees: getData.bussiness_info.serviceConnectFee,
            servicetax: getData.bussiness_info.servicetax,
            tax: getData.bussiness_info.tax,
            serviceFees: getData.bussiness_info.serviceFees,
            processingFees: getData.bussiness_info.processingFees,
            centFees: getData.bussiness_info.centFees,
            paymentMethod: {
              Card:getData.bussiness_info.paymentMethod.Card,
              Cash:getData.bussiness_info.paymentMethod.Cash,
              Cheque:getData.bussiness_info.paymentMethod.Cheque
            },
            currency_symbol: getData.bussiness_info.currency_symbol,
            tip:[10,20,30],
            cancellation_fees:getData.bussiness_info.cancellation_fees,
            
          })
        // console.log(businessInfo)
        // return
      this.props.editBusinessAction(this.state.business_id,
        {
          
          bussiness_info:{
            happy_hours: {
              start_time: this.state.happyHourStartTime,
              end_time: this.state.happyHourEndTime,
              discount: this.state.happyHourDiscount
            },
            open_time: getData.bussiness_info.open_time,
            close_time: getData.bussiness_info.close_time,
            location: getData.bussiness_info.location,
            servicehubConnetFees: getData.bussiness_info.serviceConnectFee,
            servicetax: getData.bussiness_info.servicetax,
            tax: getData.bussiness_info.tax,
            serviceFees: getData.bussiness_info.serviceFees,
            processingFees: getData.bussiness_info.processingFees,
            centFees: getData.bussiness_info.centFees,
            paymentMethod: {
              Card:getData.bussiness_info.paymentMethod.Card,
              Cash:getData.bussiness_info.paymentMethod.Cash,
              Cheque:getData.bussiness_info.paymentMethod.Cheque
            },
            currency_symbol: getData.bussiness_info.currency_symbol,
            tip:[10,20,30],
            cancellation_fees:getData.bussiness_info.cancellation_fees
            
          }
        }
      )
      
    }
  }
  onChangeAddName = async (key, value) => {
    console.log(key)
    console.log(value)

    var self = this;
    await self.setState({
      [key]: value,
      ['formErr' + key]: (value === '') ? 'Please provide this field' : ''
    })

    if (key === "country") {
      // await this.props.fetchcity("600921c703e76716847fac0c")
      // await this.props.fetchcity(value)
      let result = await this.state.country_list.filter(function(item){
        if(item.sortname == value) return  item.name;
      });
      if(result.length){
        await this.setState({
          country_name:result[0].name
        })
        
      }
    }
    if (key === "slotOpenHour" || key === "slotOpenMin" || key === "slotOpenFormat") {
      if(this.state.business_id === ''){
      
      }
      else{
        this.setState({
          open_time:'',
        })
      }
      await self.setState({
        open_time: this.state.slotOpenHour + ":" + this.state.slotOpenMin + ":00",
        // + this.state.slotOpenFormat,
        formErropen_time: ''
      })
    }
    if (key === "slotCloseHour" || key === "slotCloseMin" || key === "slotCloseFormat") {
      if(this.state.business_id === ''){
      
      }
      else{
        this.setState({
          close_time:'',
        })
      }
      await self.setState({
        close_time: this.state.slotCloseHour + ":" + this.state.slotCloseMin + ":00",
        // + this.state.slotCloseFormat,
        formErrclose_time: ''
      })
    }

    if (key === "happyHourstartHour" || key === "happyHourstartMin") {
      if(this.state.business_id === ''){
      
      }
      else{
        this.setState({
          happyHourStartTime:'',
        })
      }
      await self.setState({
        happyHourStartTime: this.state.happyHourstartHour + ":" + this.state.happyHourstartMin + ":00",
        // + this.state.happyHourstartFormat,
        formErrhappyHourStartTime: ''
      })
    }

    if (key === "happyHourEndHour" || key === "happyHourEndMin") {
      if(this.state.business_id === ''){
      
      }
      else{
        this.setState({
          happyHourEndTime:'',
        })
      }
      await self.setState({
        happyHourEndTime: this.state.happyHourEndHour + ":" + this.state.happyHourEndMin + ":00",
        // + this.state.happyHourEndFormat,
        formErrhappyHourEndTime: ''
      })
    }

  }
  render() {
    const userToken = localStorage.getItem('token')
    let business_id = localStorage.getItem('userId')
    let getData = this.props.data_bussiness;
    if (
      business_id 
      &&
      (!this.state.business_id || this.state.business_id !== getData._id) &&
      this.props.data_bussiness &&
      this.props.data_bussiness._id
    ) {
      this.updateState({
       // {
        business_id: business_id,
        happyHourStartTime:getData.bussiness_info.happy_hours.start_time,
        happyHourEndTime:getData.bussiness_info.happy_hours.end_time,
        happyHourDiscount:getData.bussiness_info.happy_hours.discount,
        happyHourstartHour:getData.bussiness_info.happy_hours.start_time.split(":")[0],
        happyHourstartMin:getData.bussiness_info.happy_hours.start_time.split(":")[1],

        happyHourEndHour: getData.bussiness_info.happy_hours.end_time.split(":")[0],
        happyHourEndMin: getData.bussiness_info.happy_hours.end_time.split(":")[1],

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
            <div className='col-xl-12 order-xl-2'>
              <div className='card'>
                <div className='card-header'>
                  <div className='row align-items-center'>
                    <div className='col-12'>
                      <h3 className='mb-0'>Happy Hours </h3>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Happy hour start Time</label>
                        <Input
                          value={this.state.happyHourstartHour}
                          type="select"
                          onChange={(e) => this.onChangeAddName('happyHourstartHour', e.target.value)}
                        >
                          {data.hours.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Input>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                        
                        <Input
                          value={this.state.happyHourstartMin}
                          type="select"
                          onChange={(e) => this.onChangeAddName('happyHourstartMin', e.target.value)}
                        >
                          {data.minutes_second.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Input>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Happy hour end Time</label>
                        <Input
                          value={this.state.happyHourEndHour}
                          type="select"
                          onChange={(e) => this.onChangeAddName('happyHourEndHour', e.target.value)}
                        >
                          {data.hours.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Input>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                        
                        <Input
                            value={this.state.happyHourEndMin}
                          // value={this.state.businessName}
                          type="select"
                          onChange={(e) => this.onChangeAddName('happyHourEndMin', e.target.value)}
                        >
                          {data.minutes_second.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Input>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Happy hour discount</label>
                        <div className='input-group'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text' id='basic-addon1'>%</span>
                          </div>
                          <input type='text' className='form-control' placeholder='30'
                            value={this.state.happyHourDiscount}
                            onChange={(e) => this.onChangeAddName('happyHourDiscount', e.target.value)}
                          />

                          <span style={{ color: 'red' }}>{this.state.formErrhappyHourDiscount}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                    
                    <button
                      className='btn btn-success float-right'
                      type='button'
                      onClick={(e) => this.handleSubmit()}
                    >Save</button>
                </div>
              </div>
            </div>
            </div>
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
    getbusiness: (data) => dispatch(actions.getbusinessOnId(data)),
    editBusinessAction: (business_id,data, history) => dispatch(actions.editBusiness(business_id,data, history)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(HappyHourDiscount));
