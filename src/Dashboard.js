import React from 'react'
import 'react-day-picker/lib/style.css'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import * as actions from './store/actions/index'
import {
  Input,
} from 'reactstrap'
import { withRouter } from "react-router-dom";
import worldMapData from 'city-state-country'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
      min_charge: 1,
      formErrmin_charge: '',
      per_mile_charge: 1,
      formErrper_mile_charge: '',
      per_min_charge: 1,
      formErrper_min_charge: '',
      
      min: 1,
      sec: 1,
      cents: 1,
      
      formErrmin: '',
      formErrsec: '',
      formErrcents: '',
      
      additional_charge: 1,
      formErradditional_charge: '',
      empty_driver_seat:1,
      formErrempty_driver_seat:'',
      picture: '',
      formErrpicture: '',
      desc: '',
      formErrdesc: '',
      file: '',
      ride_share:'none',
      ride_share_id:'',
      country_list:[],
      country_name:'',
      business_id:'',
      businessId:'',
      empty_driver_per_mile_charge:'',
      formErrempty_driver_per_mile_charge:'',
      
    }
    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.updateState = this.updateState.bind(this);

  }
  async updateState(data) {
    // await this.setState(data);
    setTimeout(async () => {
      console.log('Our data is fetched');
      await this.setState(data)
    }, 1000)
  }
  handleUploadFile = async (event) => {
    if(this.state.ride_share_id === ''){
      await this.setState({
        file: URL.createObjectURL(event.target.files[0]), picture: event.target.files[0],
        formErrpicture: ''
      })
    }
    else{
      await this.setState({
        file: URL.createObjectURL(event.target.files[0]), picture: event.target.files[0],
        formErrpicture: ''
      })
      const data = await new FormData();
      await data.append('picture', this.state.picture);

      await this.props.editrideshareImageAction(this.state.ride_share_id,data)
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
  }
  handleSubmit = async () => {
    // console.log((this.state.processingFees.split("+")).length)
    // return
    await this.setState({
      
      formErrmin_charge: (this.state.ride_share!=='none' && this.state.min_charge === '') ? "Please provide this field" : '',
      formErrper_mile_charge: (this.state.ride_share!=='none' && this.state.per_mile_charge === '') ? "Please provide this field" : '',
      formErrper_min_charge: (this.state.ride_share!=='none' && this.state.per_min_charge === '') ? "Please provide this field" : '',
      formErrmin: (this.state.ride_share!=='none' && this.state.min === '') ? "Please provide this field" : '',
      formErrsec: (this.state.ride_share!=='none' && this.state.sec === '') ? "Please provide this field" : '',
      formErrcents: (this.state.ride_share!=='none' && this.state.cents === '') ? "Please provide this field" : '',

      formErradditional_charge: (this.state.ride_share!=='none' && this.state.additional_charge === '') ? "Please provide this field" : '',
      formErrempty_driver_seat: (this.state.ride_share ==='ride_share' && this.state.empty_driver_seat === '') ? "Please provide this field" : '',
      
      formErrpicture: (this.state.ride_share!=='none' && this.state.picture === '') ? "Please provide this field" : '',
      formErrdesc: (this.state.ride_share!=='none' && this.state.desc === '') ? "Please provide this field" : '',
      formErrempty_driver_per_mile_charge: (this.state.ride_share!=='none' && this.state.empty_driver_per_mile_charge === '') ? "Please provide this field" : '',

    })
    if (!((this.state.ride_share!=='none' && (this.state.min_charge === '') && (this.state.per_mile_charge === '') && (this.state.per_min_charge === '') && (this.state.min === '') && (this.state.sec === '') && (this.state.cents === '') && ((this.state.additional_charge === '' && this.state.ride_share ==='delivery') || (this.state.ride_share ==='ride_share' && this.state.empty_driver_seat === '')) && (this.state.picture === '') && (this.state.desc === '') && (this.state.empty_driver_per_mile_charge === '')))) {
      if(this.state.ride_share_id !== ''){
        if(this.state.ride_share ==='ride_share'){
          this.props.editrideshareAction(this.state.ride_share_id,{
            min_charge:this.state.min_charge,
            per_mile_charge:this.state.per_mile_charge,
            per_min_charge: this.state.per_min_charge,
            min:this.state.min,
            sec:this.state.sec,
            cents:this.state.cents,
            empty_driver_seat:this.state.empty_driver_seat,
            // picture:this.state.picture,
            description:this.state.desc,
            empty_driver_per_mile_charge:this.state.empty_driver_per_mile_charge
          })
          
        }
        else if(this.state.ride_share ==='delivery'){
          this.props.editrideshareAction(this.state.ride_share_id,{
            
            ride_share:this.state.ride_share,
    
            min_charge:this.state.min_charge,
            per_mile_charge:this.state.per_mile_charge,
            additional_charge:this.state.additional_charge,
            // picture:this.state.picture,
            description:this.state.desc
          })
        }
  
      }
      else{

        if(this.state.ride_share ==='ride_share'){
          const data = new FormData();
          data.append('ride_share', this.state.ride_share);
          data.append('min_charge', this.state.min_charge);
          data.append('per_mile_charge', this.state.per_mile_charge);
          data.append('per_min_charge', this.state.per_min_charge);
          data.append('min', this.state.min)
          data.append('sec',this.state.sec)
          data.append('cents',this.state.cents)
          data.append('empty_driver_seat', this.state.empty_driver_seat);
          data.append('picture', this.state.picture);
          data.append('description', this.state.desc);
          data.append('empty_driver_per_mile_charge', this.state.empty_driver_per_mile_charge);
          data.append('business_id', this.state.business_id);

          this.props.addrideshareDataAction(data, this.props.history)          
        }
        else if(this.state.ride_share ==='delivery'){
          const data = new FormData();
          data.append('ride_share', this.state.ride_share);

          data.append('min_charge', this.state.min_charge);
          data.append('per_mile_charge', this.state.per_mile_charge);
          data.append('additional_charge', this.state.additional_charge);
          data.append('picture', this.state.picture);
          data.append('description', this.state.desc);
          data.append('business_id', this.state.business_id);
          
          this.props.addrideshareDataAction(data, this.props.history)
          
        }
        // this.props.addBusinessAction(data, this.props.history)
      }
    }
    
  }
  UNSAFE_componentWillMount = async () => {
    // await this.props.fetchcountry()
    // await this.props.fetchcountry()
    // await this.setState({
    //   country_list:worldMapData.getAllCountries()
    // })
  }
  async componentDidMount(){
    // await this.props.fetchcountry()
    const country_array = await worldMapData.getAllCountries()
    await this.setState({
      country_list:country_array
    })
  }
  componentDidMount = async () => {
    // console.log(this.props.match,"match data_bussiness");
    let business_id = await this.props.match.params.id;

    if (business_id) {
      // console.log(business_id);
      await this.setState({
        business_id: business_id,
        // category_name:this.props.match.params.name
      });
      await this.props.getbusinessOnIdAction(business_id);
      const getData = await this.props.data_bussiness;
      this.props.getbusinessOnIdAction(business_id);

      // console.log(this.state.workingDay);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { enqueueSnackbar, error, success } = this.props;
    success && enqueueSnackbar(success, { variant: 'success' });
    error && enqueueSnackbar(error, { variant: 'error' });
  }
  handlelatlong = (value) => {
    // const formvalue = { ...formValues }
    // formvalue.address.x_coordinate = value.latitude
    // formvalue.address.y_coordinate = value.longitude
    // setFormValue(formvalue)
    this.setState({
      latitude: value.latitude,
      longitude: value.longitude
    })
    console.log(this.state.latitude)
    console.log(this.state.longitude)

  }
  handleAddress = (value) => {
    console.log(value)
    this.setState({
      location: value
    })
  }
  handlepincode = (value) => {

  }
  handlecityname = (value) => {

  }
  
  render() {

    let business_id = this.props.match.params.id;
    let getData = this.props.data_bussiness;
    if (
      business_id 
      &&
      (!this.state.businessId || this.state.businessId !== getData._id) &&
      this.props.data_bussiness &&
      this.props.data_bussiness._id
    ) {


      this.updateState({
        businessId: getData._id,
        ride_share:getData.ride_share,
        min_charge:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].min_charge:'',

        per_mile_charge: (getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].per_mile_charge:'',
        per_min_charge:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].per_min_charge:'',
        min:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?(getData.rideshareinfo[0].waiting_time)?getData.rideshareinfo[0].waiting_time.min:'':'',
        sec:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?(getData.rideshareinfo[0].waiting_time)?getData.rideshareinfo[0].waiting_time.sec:'':'',
        cents:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?(getData.rideshareinfo[0].waiting_time)?getData.rideshareinfo[0].waiting_time.cents:'':1,
        additional_charge:(getData.ride_share!=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].additional_charge:'',
        empty_driver_seat:(getData.ride_share !=='none'&& getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].empty_driver_seat:'',
        picture:(getData.ride_share !=='none'&& getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].picture:"",
        file:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].picture:"",
        desc: (getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].description:'',
        ride_share_id:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0]._id:'',
        empty_driver_per_mile_charge:(getData.ride_share !=='none' && getData.rideshareinfo.length > 0)?getData.rideshareinfo[0].empty_driver_per_mile_charge:'',
        delivery:(getData.capabilities)?getData.capabilities.delivery:'',
        rideshare:(getData.capabilities)?getData.capabilities.rideshare:'',
        
      });
    }

    // slotOpenHour: getData.bussiness_info.open_time.split(":")[0],
    // slotOpenMin: getData.bussiness_info.open_time.split(":")[1],
    // slotCloseHour: getData.bussiness_info.close_time.split(":")[0],
    // slotCloseMin: getData.bussiness_info.close_time.split(":")[1],
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Delivery and Ride Share</h6>
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
                      <h3 className='mb-0'>Delivery and Ride Share </h3>
                    </div>
                  </div>
                </div>

                <div className='card-body'>
                  <div className='row'>
                    <div className='col-lg-4'>
                  {this.state.ride_share ==='none'?<div>
                  <div className='card-body'>
                  <button 
                    onClick = {(e) => this.onChangeAddName('ride_share', this.state.ride_share ==='none'?'ride_share':'none')}
                  >
                    {this.state.ride_share ==='ride_share'?"Remove":"Add"} ride share
                  </button>
                  </div>

                  <div className='card-body'>
                    <button 
                      onClick = {(e) => this.onChangeAddName('ride_share', this.state.ride_share === 'none'?'delivery':'none')}
                    >
                      {this.state.ride_share ==='delivery'?"Remove":"Add"} delivery
                    </button>
                  </div>
                </div>:this.state.ride_share ==='ride_share'?<div className='card-body'>
                  <button 
                    onClick = {(e) => this.onChangeAddName('ride_share', this.state.ride_share ==='none'?'ride_share':'none')}
                  >
                    {this.state.ride_share ==='ride_share'?"Remove":"Add"} ride share
                  </button>
                  </div>:this.state.ride_share ==='delivery'?<div className='card-body'>
                    <button 
                      onClick = {(e) => this.onChangeAddName('ride_share', this.state.ride_share ==='none'?'delivery':'none')}
                    >
                      {this.state.ride_share ==='delivery'?"Remove":"Add"} delivery
                    </button>
                  </div>:''}
                
                
                {this.state.ride_share ==='ride_share'?<div className='card-body'>
                  <h1>
                    RideShare
                  </h1>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Minimum charges</label>
                        <input type='number' id='input-username' className='form-control' placeholder='Minimum charges'
                          value={this.state.min_charge} min="1"
                          onChange={(e) => this.onChangeAddName('min_charge', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrmin_charge}</span>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>1 Mile charge</label>
                        <input type='number' id='input-username' className='form-control' placeholder='1 Mile charge'
                          value={this.state.per_mile_charge} min="1"
                          onChange={(e) => this.onChangeAddName('per_mile_charge', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrper_mile_charge}</span>
                      </div>
                    </div>

                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>1 minute charge</label>
                        <input type='number' id='input-username' className='form-control' placeholder='per_min_charge'
                        value={this.state.per_min_charge} min="1"
                        onChange={(e) => this.onChangeAddName('per_min_charge', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrper_min_charge}</span>
                      </div>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-lg-6'>

                      <img src={this.state.picture === '' ? '../assets/img/theme/img-1-1000x600.jpg' : this.state.file} alt='Image placeholder' className='card-img-top' />
                      <span style={{ color: 'red' }}>{this.state.formErrpicture}</span>
                      <div className='d-flex justify-content-between pt-8 pt-md-4 pb-0 pb-md-4'>
                        <Input
                          type="file"
                          // id="File-2"
                          className='btn btn-default float-right'
                          onChange={this.handleUploadFile}
                        >Upload</Input>
                      </div>
                    </div>

                    <div className='col-lg-6'>

                      <label className='form-control-label' for='input-username'>Description</label>
                      <input type='text' id='input-username' className='form-control' placeholder='Vehicle description'
                        value={this.state.desc}
                        onChange={(e) => this.onChangeAddName('desc', e.target.value)}
                      />
                      <span style={{ color: 'red' }}>{this.state.formErrdesc}</span>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Wating time</label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder='minutes'
                          value={this.state.min}
                          onChange={(e) => this.onChangeAddName('min', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrmin}</span>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'></label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder='seconds'
                          value={this.state.sec}
                          onChange={(e) => this.onChangeAddName('sec', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrsec}</span>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'></label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder='cents'
                          value={this.state.cents}
                          onChange={(e) => this.onChangeAddName('cents', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrcents}</span>
                      </div>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-lg-6'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Empty driver seat</label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder=''
                          value={this.state.empty_driver_seat}
                          onChange={(e) => this.onChangeAddName('empty_driver_seat', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Empty driver per mile charge</label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder='minutes'
                          value={this.state.empty_driver_per_mile_charge}
                          onChange={(e) => this.onChangeAddName('empty_driver_per_mile_charge', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                    <button
                      className='btn btn-success float-right'
                      type='button'
                      onClick={(e) => this.handleSubmit()}
                    >Save</button>
                </div>
                :''}
                {this.state.ride_share ==='delivery'?<div className='card-body'>
                  <h1>
                    Delivery
                  </h1>
                  <div className='row'>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Minimum charges</label>
                        <input type='number' id='input-username' className='form-control' placeholder='Minimum charges'
                          value={this.state.min_charge} min="1"
                          onChange={(e) => this.onChangeAddName('min_charge', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrmin_charge}</span>
                      </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>1 Mile charge</label>
                        <input type='number' id='input-username' className='form-control' placeholder='1 Mile charge'
                          value={this.state.per_mile_charge} min="1"
                          onChange={(e) => this.onChangeAddName('per_mile_charge', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrper_mile_charge}</span>
                      </div>
                    </div>

                    {/* <div className='col-lg-4'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>1 minute charge</label>
                        <input type='text' id='input-username' className='form-control' placeholder='Tax (%)'
                        value={this.state.tax} 
                        onChange={(e) => this.onChangeAddName('tax', e.target.value)}
                        />

                        <span style={{ color: 'red' }}>{this.state.formErrtax}</span>
                      </div>
                    </div> */}
                  </div>
                  <div className='row'>

                    <div className='col-lg-6'>

                      <img src={this.state.picture === '' ? '../assets/img/theme/img-1-1000x600.jpg' : this.state.file} alt='Image placeholder' className='card-img-top' />
                      <span style={{ color: 'red' }}>{this.state.formErrpicture}</span>
                      <div className='d-flex justify-content-between pt-8 pt-md-4 pb-0 pb-md-4'>
                        <Input
                          type="file"
                          // id="File-2"
                          className='btn btn-default float-right'
                          onChange={this.handleUploadFile}
                        >Upload</Input>
                      </div>
                    </div>

                    <div className='col-lg-6'>

                      <label className='form-control-label' for='input-username'>Description</label>
                      <input type='text' id='input-username' className='form-control' placeholder='Vehicle description'
                        value={this.state.desc}
                        onChange={(e) => this.onChangeAddName('desc', e.target.value)}
                      />
                      <span style={{ color: 'red' }}>{this.state.formErrdesc}</span>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-username'>Additional delivery charges</label>
                        <input type='number' min="1" id='input-username' className='form-control' placeholder='minutes'
                          value={this.state.additional_charge}
                          onChange={(e) => this.onChangeAddName('additional_charge', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                
            <button
                      className='btn btn-success float-right'
                      type='button'
                      onClick={(e) => this.handleSubmit()}
                    >Save</button>
                </div>
                
                :''}
                
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
        </div>

      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    success: state.bussiness.success,
    error: state.bussiness.error,
    alllisting: state.subCategory.alllisting,
    bussinesslisting: state.bussiness.bussinesslisting,
    data_bussiness:state.bussiness.data_bussiness,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchallsubCategory: () => dispatch(actions.fetchallsubCategoryListAction()),
    fetchbussiness: () => dispatch(actions.fetchbussinessListAction()),
    getbusinessOnIdAction: (data) => dispatch(actions.getbusinessOnId(data)),
    editBusinessAction: (business_id,data, history) => dispatch(actions.editBusiness(business_id,data, history)),
    editrideshareAction: (id,data) => dispatch(actions.editrideshare(id,data)),
    editrideshareImageAction: (id,data) => dispatch(actions.editrideshareImage(id,data)),
    
    addrideshareDataAction: (data,history) => dispatch(actions.addrideshareData(data,history)),

  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(withRouter(Dashboard)))

