import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import * as actions from './store/actions/index'
import {
  Input,
} from 'reactstrap'
import PhoneInput from 'react-phone-input-2'
import data from './data.json'
import { withRouter } from "react-router-dom";
import Map from './map'
import worldMapData from 'city-state-country'

class Profile extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      formErrname: '',
      business_owner_name: '',
      formErrbusiness_owner_name: '',
      country: '',
      formErrcountry: '',
      city: '',
      formErrcity: '',
      country_code: '+1',
      formErrcountry_code: '',
      mobile_no: '',
      formErrmobile_no: '',
      email: '',
      formErremail: '',
      slotOpenHour: "01",
      slotOpenMin: "00",
      // slotOpenFormat: "AM",
      slotCloseHour: "01",
      slotCloseMin: "00",
      // slotCloseFormat: "PM",
      open_time: '',
      close_time: '',
      location: '',
      formErropen_time: '',
      formErrclose_time: '',
      formErrlocation: '',

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

      // paymentMethod: {},
      Card:false,
      Cash:false,
      Cheque:false,


      // formErrpaymentMethod: '',

      serviceConnectFee: '',
      formErrserviceConnectFee: '',

      servicetax: '',
      formErrservicetax: '',

      tax: '',
      formErrtax: '',

      serviceFees: '',
      formErrserviceFees: '',

      processingFees: '',
      formErrprocessingFees: '',

      centFees: '',
      formErrcentFees: '',

      happyHourDiscount: '',
      formErrhappyHourDiscount: '',

      currency_symbol: '',
      formErrcurrency_symbol: '',

      longitude: 23.53,
      latitude: 53.65,


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
      tip:'',
      formErrtip:'',
      cancellation_fees:'',
      formErrcancellation_fees:'',
      delivery:false,
      rideshare:false,
      category_product_service:false,
      report:false,
      happy_hour_discount:false,
      schedule:false,
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

      // await this.props.editrideshareImageAction(this.state.ride_share_id,data)
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
      if(this.state.businessId === ''){
      
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
      if(this.state.businessId === ''){
      
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
      if(this.state.businessId === ''){
      
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
      if(this.state.businessId === ''){
      
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
  handleSubmit = async () => {
    // console.log((this.state.processingFees.split("+")).length)
    // return
    await this.setState({
      formErrname: (this.state.name === '') ? "Please provide this field" : '',
      formErrbusiness_owner_name: (this.state.business_owner_name == '') ? "Please provide this field" : '',
      formErrcountry: (this.state.country === '') ? "Please provide this field" : '',
      formErrcity: (this.state.city === '') ? "Please provide this field" : '',
      formErrcountry_code: (this.state.country_code === '') ? "Please provide this field" : '',
      formErrmobile_no: (this.state.mobile_no === '') ? "Please provide this field" : '',
      formErremail: (this.state.email === '') ? "Please provide this field" : '',
      formErropen_time: (this.state.open_time === '') ? "Please provide this field" : '',
      formErrclose_time: (this.state.close_time === '') ? "Please provide this field" : '',
      formErrlocation: (this.state.location === '') ? "Please provide this field" : '',

      formErrserviceConnectFee: (this.state.serviceConnectFee === '') ? "Please provide this field" : '',
      formErrservicetax: (this.state.servicetax === '') ? "Please provide this field" : '',

      formErrtax: (this.state.tax === '') ? "Please provide this field" : '',
      formErrserviceFees: (this.state.serviceFees === '') ? "Please provide this field" : '',
      formErrprocessingFees: (this.state.processingFees === '') ? "Please provide processing and cent fees field also" : '',
      formErrprocessingFees: ((this.state.processingFees.split("+")).length !== 2) ? "Please provide processing and cent fees field also" : '',
      formErrhappyHourEndTime: (this.state.happyHourEndTime === '') ? "Please provide this field" : '',
      formErrhappyHourStartTime: (this.state.happyHourStartTime === '') ? "Please provide this field" : '',
      formErrhappyHourDiscount: (this.state.happyHourDiscount === '') ? "Please provide this field" : '',
      // formErrpaymentMethod: (this.state.paymentMethod === '') ? "Please provide this field" : '',
      formErrcurrency_symbol: (this.state.currency_symbol === '') ? "Please provide this field" : '',
      // formErrtip: (this.state.tip === '') ? "Please provide this field" : '',
      formErrcancellation_fees: (this.state.cancellation_fees === '') ? "Please provide this field" : '',
      
      
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
    const data_tax = this.state.processingFees.split("+")
    if ((this.state.processingFees.split("+")).length === 2) {
      this.setState({
        centFees: data_tax[1]
      })
    }
    if (!((this.state.name === '') && (this.state.business_owner_name === '') && (this.state.country === '') && (this.state.city === '') && (this.state.country_code === '') && (this.state.mobile_no === '') && (this.state.email === '') && (this.state.open_time === '') && (this.state.close_time === '') && (this.state.location === '') && (this.state.serviceConnectFee === '') && (this.state.servicetax === '') && (this.state.tax === '') && (this.state.serviceFees === '') && (this.state.processingFees === '') && (this.state.centFees === '') && (this.state.happyHourEndTime === '') && (this.state.happyHourStartTime === '') && (this.state.happyHourDiscount === '') && (this.state.ride_share!=='none' && (this.state.min_charge === '') && (this.state.per_mile_charge === '') && (this.state.per_min_charge === '') && (this.state.min === '') && (this.state.sec === '') && (this.state.cents === '') && ((this.state.additional_charge === '' && this.state.ride_share ==='delivery') || (this.state.ride_share ==='ride_share' && this.state.empty_driver_seat === '')) && (this.state.picture === '') && (this.state.desc === '') && (this.state.empty_driver_per_mile_charge === '')))) {
    if(this.state.businessId === ''){
      const data = new FormData();
      data.append('country_code', this.state.country_code);
      data.append('mobile_no', this.state.mobile_no);
      data.append('user_type', "business_user");
      data.append('name', this.state.name);
      data.append('city', this.state.city);
      data.append('business_owner_name', this.state.business_owner_name);
      data.append('email', this.state.email);
      data.append('country', this.state.country);
      // data.append('password', 'pass@123');
      data.append(
        'capabilities',
        JSON.stringify({
          delivery:this.state.delivery,
          ride_share:this.state.ride_share,
          category_product_service:this.state.category_product_service,
          report:this.state.report,
          happy_hour_discount:this.state.happy_hour_discount,
          schedule:this.state.schedule,
        })
      );
      data.append('bussiness_info', JSON.stringify({
        happy_hours: {
              start_time: this.state.happyHourStartTime,
              end_time: this.state.happyHourEndTime,
              discount: this.state.happyHourDiscount
            },
            open_time: this.state.open_time,
            close_time: this.state.close_time,
            location: this.state.location,
            servicehubConnetFees: this.state.serviceConnectFee,
            servicetax: this.state.servicetax,
            tax: this.state.tax,
            serviceFees: this.state.serviceFees,
            processingFees: data_tax[0],
            centFees: data_tax[1],
            paymentMethod: {
              Card:this.state.Card,
              Cash:this.state.Cash,
              Cheque:this.state.Cheque
            },
            currency_symbol: this.state.currency_symbol,
            tip:[10,20,30],
            cancellation_fees:this.state.cancellation_fees,
          }));
          if(this.state.ride_share ==='ride_share'){
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

            
          }
          else if(this.state.ride_share ==='delivery'){
            data.append('ride_share', this.state.ride_share);

            data.append('min_charge', this.state.min_charge);
            data.append('per_mile_charge', this.state.per_mile_charge);
            data.append('additional_charge', this.state.additional_charge);
            data.append('picture', this.state.picture);
            data.append('description', this.state.desc);
          }
      data.append('local_city', this.state.location);
      
      // this.props.addBusinessAction(data, this.props.history)
      
    }      
    else{
      
      // this.props.editBusinessAction(this.state.businessId,{
      //   country_code:this.state.country_code,
        
      //   mobile_no:this.state.mobile_no,
      //   name:this.state.name,
      //   city:this.state.city,
      //   business_owner_name:this.state.business_owner_name,
      //   password: 'pass@123',
      //   // email:this.state.email,
      //   country:this.state.country,
        
      //     capabilities:JSON.stringify({
      //       delivery:this.state.delivery,
      //       rideshare:this.state.rideshare,
      //       category_product_service:this.state.category_product_service,
      //       report:this.state.report,
      //       happy_hour_discount:this.state.happy_hour_discount,
      //       schedule:this.state.schedule,
      //     }),
        
      //   bussiness_info:JSON.stringify({
      //     happy_hours: {
      //           start_time: this.state.happyHourStartTime,
      //           end_time: this.state.happyHourEndTime,
      //           discount: this.state.happyHourDiscount
      //         },
      //         open_time: this.state.open_time,
      //         close_time: this.state.close_time,
      //         location: this.state.location,
      //         servicehubConnetFees: this.state.serviceConnectFee,
      //         servicetax: this.state.servicetax,
      //         tax: this.state.tax,
      //         serviceFees: this.state.serviceFees,
      //         processingFees: data_tax[0],
      //         centFees: data_tax[1],
      //         paymentMethod: {
      //           Card:this.state.Card,
      //           Cash:this.state.Cash,
      //           Cheque:this.state.Cheque
      //         },
      //         currency_symbol: this.state.currency_symbol,
      //         tip:[10,20,30],
      //         cancellation_fees:this.state.cancellation_fees,
              
      //       }),
      //   local_city:this.state.location
        
      // }, this.props.history)
      
      if(this.state.ride_share_id !== ''){
        if(this.state.ride_share ==='ride_share'){
          // this.props.editrideshareAction(this.state.ride_share_id,{
          //   min_charge:this.state.min_charge,
          //   per_mile_charge:this.state.per_mile_charge,
          //   per_min_charge: this.state.per_min_charge,
          //   min:this.state.min,
          //   sec:this.state.sec,
          //   cents:this.state.cents,
          //   empty_driver_seat:this.state.empty_driver_seat,
          //   // picture:this.state.picture,
          //   description:this.state.desc,
          //   empty_driver_per_mile_charge:this.state.empty_driver_per_mile_charge
          // })
          
        }
        else if(this.state.ride_share ==='delivery'){
          // this.props.editrideshareAction(this.state.ride_share_id,{
            
          //   ride_share:this.state.ride_share,
    
          //   min_charge:this.state.min_charge,
          //   per_mile_charge:this.state.per_mile_charge,
          //   additional_charge:this.state.additional_charge,
          //   // picture:this.state.picture,
          //   description:this.state.desc
          // })
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
    let business_id = await localStorage.getItem('userId');

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

    let business_id = localStorage.getItem('userId');
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
        businessId: getData._id,
        country_code: getData.country_code,
        mobile_no: getData.mobile_no,
        user_type: "business_user",
        name: getData.name,
        city: getData.city,
        business_owner_name: getData.business_owner_name,
        email: getData.email,
        country: getData.country,
        
        // bussiness_info: {
        //   happy_hours: {
            // start_time: getData.bussiness_info.happy_hours.happyHourStartTime,
            // this.state.happyHourEndHour + ":" + this.state.happyHourEndMin + ":00",
                  
            happyHourStartTime:getData.bussiness_info.happy_hours.start_time,
            happyHourEndTime:getData.bussiness_info.happy_hours.end_time,
            happyHourDiscount:getData.bussiness_info.happy_hours.discount,
            happyHourstartHour:getData.bussiness_info.happy_hours.start_time.split(":")[0],
            happyHourstartMin:getData.bussiness_info.happy_hours.start_time.split(":")[1],

            happyHourEndHour: getData.bussiness_info.happy_hours.end_time.split(":")[0],
            happyHourEndMin: getData.bussiness_info.happy_hours.end_time.split(":")[1],

            happyHourDiscount: getData.bussiness_info.happy_hours.discount,
          // },
          open_time:getData.bussiness_info.open_time,
          close_time:getData.bussiness_info.close_time,
          slotOpenHour: getData.bussiness_info.open_time.split(":")[0],
          slotOpenMin: getData.bussiness_info.open_time.split(":")[1],
          slotCloseHour: getData.bussiness_info.close_time.split(":")[0],
          slotCloseMin: getData.bussiness_info.close_time.split(":")[1],
          // serviceConnectFee:
          location: getData.bussiness_info.location,
          serviceConnectFee: getData.bussiness_info.servicehubConnetFees,
          servicetax: getData.bussiness_info.servicetax,
          tax: getData.bussiness_info.tax,
          serviceFees: getData.bussiness_info.serviceFees,
          processingFees: getData.bussiness_info.processingFees +"+"+getData.bussiness_info.centFees,
          centFees: getData.bussiness_info.centFees,
          Cash: getData.bussiness_info.paymentMethod.Cash,
          Card: getData.bussiness_info.paymentMethod.Card,
          Cheque: getData.bussiness_info.paymentMethod.Cheque,

          currency_symbol: getData.bussiness_info.currency_symbol,
          // tip:getData.bussiness_info.tip[2],
          cancellation_fees:getData.bussiness_info.cancellation_fees,

        // },
        local_city: getData.location,
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
        category_product_service:(getData.capabilities)?getData.capabilities.category_product_service:'',
        report:(getData.capabilities)?getData.capabilities.report:'',
        happy_hour_discount:(getData.capabilities)?getData.capabilities.happy_hour_discount:'',
        schedule:(getData.capabilities)?getData.capabilities.schedule:'',
        
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
                  <h6 className='h2 text-white d-inline-block mb-0'>Add Business</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container-fluid mt--6'>
          <div className='row'>

            <div className='col-xl-12 order-xl-1'>
              <div className='card'>
                <div className='card-body'>
                  <form>
                    <div className='pl-lg-4'>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-username'>Business Name</label>
                            <input type='text' id='input-username' className='form-control'
                              value={this.state.name} onChange={(e) => this.onChangeAddName('name', e.target.value)}
                              placeholder='Business Name' />

                            <span style={{ color: 'red' }}>{this.state.formErrname}</span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-email'>Business Owner Name</label>
                            <input type='email' id='input-email' className='form-control' placeholder='Business Owner Name'
                              value={this.state.business_owner_name} onChange={(e) => this.onChangeAddName('business_owner_name', e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErrbusiness_owner_name}</span>

                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>Country</label>
                            {/* <Input
                              value={this.state.country}
                              type="select"
                              onChange={(e) => this.onChangeAddName('country', e.target.value)}
                            >
                              <option value="">Country Names</option>
                              {this.props.countrylisting.map((option) => (
                                <option value={option._id}>{option.country_name}</option>
                              ))}
                            </Input> */}
                            {/* <select
                              value={this.state.country}
                              // type="select"
                              // className="form-control"
                              onChange={(e) => this.onChangeAddName('country', e.target.value)}
                            >
                              <option value="">Country Names</option>
                              {this.state.country_list.map((option) => (
                                <option value={option.sortname}>{option.name}</option>
                              ))}
                            </select> */}
                            <input type='text' id='input-first-name' className='form-control' placeholder='country'
                              value={this.state.country}
                              onChange={(e) => this.onChangeAddName('country', e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErrcountry}</span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-last-name'>City</label>
                            {/* <input type='text' id='input-last-name' className='form-control' placeholder='Business owner Email' /> */}
                            {/* <Input
                              value={this.state.city}
                              type="select"
                              onChange={(e) => this.onChangeAddName('city', e.target.value)}
                            >
                              <option value="">City Names</option>
                              {this.props.citylisting.map((option) => (
                                <option value={option._id}>{option.city_name}</option>
                              ))}
                            </Input> */}
                            {/* <select
                              value={this.state.city}
                              // type="select"
                              onChange={(e) => this.onChangeAddName('city', e.target.value)}
                            >
                              <option value="">City Names</option>
                              {worldMapData.getAllStatesFromCountry(this.state.country_name).map((option) => (
                                <option value={option.sortname}>{option.name}</option>
                              ))}
                            </select> */}
                            <input type='text' id='input-first-name' className='form-control' placeholder='city'
                              value={this.state.city}
                              onChange={(e) => this.onChangeAddName('city', e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErrcity}</span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>Business owner Contact</label>
                            <PhoneInput
                              country={'us'}
                              // value={this.state.country_code}
                              // onChange={(e) => this.onChangeAddName('country_code', e.target.value)}
                              onChange={country_code => this.setState({ country_code: '+' + country_code })}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErrcountry_code}</span>
                            <input type='text' id='input-first-name' className='form-control' placeholder='Business owner Contact'
                              value={this.state.mobile_no}
                              onChange={(e) => this.onChangeAddName('mobile_no', e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErrmobile_no}</span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-last-name'>Business owner Email</label>
                            <input type='text' id='input-last-name' className='form-control' placeholder='Business owner Email'
                              value={this.state.email} onChange={(e) => this.onChangeAddName('email', e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{this.state.formErremail}</span>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-lg-4'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>Business Open Time</label>
                            <Input
                              value={this.state.slotOpenHour}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotOpenHour', e.target.value)}
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
                              value={this.state.slotOpenMin}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotOpenMin', e.target.value)}
                            >
                              {data.minutes_second.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </Input>
                          </div>
                        </div>
                        {/* <div className='col-lg-4'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                            <Input
                              // value={this.state.businessName}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotOpenFormat', e.target.value)}
                            >
                              {data.format.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </Input>
                          </div>
                        </div> */}
                        {/* <span style={{ color: 'red' }}>{this.state.formErropen_time}</span> */}
                      </div>

                      <div className='row'>
                        <div className='col-lg-4'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>Business Close Time</label>
                            <Input
                              value={this.state.slotCloseHour}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotCloseHour', e.target.value)}
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
                              value={this.state.slotCloseMin}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotCloseMin', e.target.value)}
                            >
                              {data.minutes_second.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </Input>
                          </div>
                        </div>
                        {/* <div className='col-lg-4'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                            <Input
                              // value={this.state.businessName}
                              type="select"
                              onChange={(e) => this.onChangeAddName('slotCloseFormat', e.target.value)}
                            >
                              {data.format.map((option) => (
                                <option value={option}>{option}</option>
                              ))}
                            </Input>
                          </div>
                        </div> */}
                        {/* <span style={{ color: 'red' }}>{this.state.formErrclose_time}</span> */}
                      </div>

                      <div className='row'>
                        <div className='col-lg-6'>
                          {/* <div className='form-group'> */}
                          <label className='form-control-label' for='input-first-name'>Business Location</label>
                          <input type='text' id='input-first-name' className='form-control' placeholder='Business Location'
                            value={this.state.location} onChange={(e) => this.onChangeAddName('location', e.target.value)}
                          />
                          {/* <span style={{ color: 'red' }}>{this.state.formErrlocation}</span> */}
                          {/* </div> */}
                          <div
                            style={{
                              height: '500px',
                              width: '500px'
                            }}
                          >
                            <Map
                              center={{ lat: this.state.latitude, lng: this.state.longitude }}
                              handlelatlong={(e) => this.handlelatlong(e)}
                              handleAddress={(e) => this.handleAddress(e)}
                              handlepincode={(e) => this.handlepincode(e)}
                              handlecityname={(e) => this.handlecityname(e)}
                              height='400px'
                              value={this.state.location}
                              // onChange={(e) => this.onChangeAddName('location', e.target.value)}
                              zoom={15}
                            />
                          </div>
                          <span style={{ color: 'red' }}>{this.state.formErrlocation}</span>
                        </div>
                      </div>

                      {/* <div className='row'>
                        <div className='col-lg-12'>
                          <label className='form-control-label' for='input-first-name'>Google Map</label>
                          <div id='map-default' className='map-canvas' data-lat='40.748817' data-lng='-73.985428' style={{ height: '600px' }} />
                        </div>
                      </div> */}

                    </div>

                    {/* <button
                      className='btn btn-success float-right'
                      type='button'
                      onClick={(e) => this.handleSubmit()}
                    >Save</button>
                    <button className='btn btn-default float-right mr-4' type='button'>Cancel</button> */}
                  </form>
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
    success: state.bussiness.success,
    error: state.bussiness.error,
    alllisting: state.subCategory.alllisting,
    bussinesslisting: state.bussiness.bussinesslisting,
    // countrylisting: state.country.countrylisting,
    // citylisting: state.city.citylisting,
    data_bussiness:state.bussiness.data_bussiness,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // addBusinessAction: (data, history) => dispatch(actions.addBusiness(data, history)),
    fetchallsubCategory: () => dispatch(actions.fetchallsubCategoryListAction()),
    fetchbussiness: () => dispatch(actions.fetchbussinessListAction()),
    // fetchcountry: () => dispatch(actions.fetchcountrysListAction()),
    // fetchcity: (data) => dispatch(actions.fetchcitysListAction(data)),
    getbusinessOnIdAction: (data) => dispatch(actions.getbusinessOnId(data)),
    // editBusinessAction: (business_id,data, history) => dispatch(actions.editBusiness(business_id,data, history)),
    // editrideshareAction: (id,data) => dispatch(actions.editrideshare(id,data)),
    // editrideshareImageAction: (id,data) => dispatch(actions.editrideshareImage(id,data)),
    
    addrideshareDataAction: (data,history) => dispatch(actions.addrideshareData(data,history)),

  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(withRouter(Profile)))

