import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import * as actions from './store/actions/index';
import data from './data.json';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Map from './map';
import { withRouter } from 'react-router-dom';
class AddProfessionals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      businessId: '',
      formErrname: '',
      professionalPurpose: '',
      formErrprofessionalPurpose: '',
      email: '',
      formErremail: '',
      mobile_no: '',
      formErrmobile_no: '',
      description: '',
      formErrdescription: '',
      businessName: '',
      formErrbusinessName: '',
      country: '',
      formErrcountry: '',
      city: '',
      formErrcity: '',
      subCategory: '',
      formErrsubCategory: '',
      workingDay: [],
      formErrworkingDay: '',
      city2: '',
      formErrcity2: '',
      workingSlots: [
        {
          time: '1',
          hours_min: 'Hours',
          slot_open_hour: '1',
          slot_open_min: '1',
          slot_hours_min: 'AM',
        },
      ],
      slot: '',
      formErrslot: '',
      formErrworkingSlots: '',
      professional_images: '',
      formErrprofessional_images: '',
      min_cost: '',
      formErrmin_cost: '',
      file: '',
      user_type: 'professional',
      country_code: '+1',
      formErrcountry_code: '',
      formFields: [{ index: 0 }],
      pictures: [
        {
          src: '../assets/img/theme/img-1-1000x600.jpg',
          alt: 'Image placeholder',
          className: 'card-img-top',
        },
      ],
      // fields_slots:[{data :"data"}],
      password: 'pass@123',
      slot_open: 3,
      backgroundCheck: '', // "Yes","No","Pending","N/A"
      formErrbackgroundCheck: '',
      driver_licence: '', // "Yes","No","Pending","N/A"
      formErrdriver_licence: '',
      insured: '', // "Yes","No","Pending","N/A"
      certificate_check: '', // "Yes","No","Pending","N/A"
      tradeLicence: '', // "Yes","No","Pending","N/A"
      commercial_insurance: '', // "Yes","No","Pending","N/A"
      formErrinsured: '',
      formErrcertificate_check: '',
      formErrtradeLicence: '',
      formErrcommercial_insurance: '',
      documents: [],
      documents_image: [],
      formErrdocuments: '',
      longitude: 28.7041,
      latitude: 77.1025,
      is_business_user_professional_also: false,
      formErris_business_user_professional_also: '',
      customer_instructions: '',
      formErrcustomer_instructions: '',
      professional_id: '',
      radius: 1000,
      formErrradius: '',
      delivery:false,
      rideshare:false,
      category_product_service:false,
      report:false,
      happy_hour_discount:false,
      schedule:false,
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleAddSlotClick = this.handleAddSlotClick.bind(this);
    this.clickOnDelete = this.clickOnDelete.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleUploadDocument = this.handleUploadDocument.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  async updateState(data) {
    // await this.setState(data);
    setTimeout(async () => {
      console.log('Our data is fetched');
      await this.setState(data)
    }, 1000)
  }
  handleChange = async (key, value) => {
    var self = this;
    await self.setState({
      [key]: value,
      ['formErr' + key]: value === '' ? 'Please provide this field' : '',
    });
  };
  deleteCertificate = async (value) => {
    if(this.props.match.params.id){
      var image = this.state.documents;
      await image.splice(value, 1); 
      this.props.removeCerificatesAction(value,this.props.match.params.id)

    }
    else{
      var image = this.state.documents;
      await image.splice(value, 1);
    }
  };
  handleUploadFile = async (event) => {
    if(this.props.match.params.id){
      await this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        professional_images: event.target.files[0],
        formErrprofessional_images: '',
      });
      const data = new FormData();
      data.append('profile_pic', this.state.professional_images);
      this.props.editProfessionalImageAction(data,this.props.match.params.id)
    }
    else{
      await this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        professional_images: event.target.files[0],
        formErrprofessional_images: '',
      });
    }
    
  };
  handleUploadDocument = async (event) => {
    if(this.props.match.params.id){
      var image = this.state.documents;
      image.push(URL.createObjectURL(event.target.files[0]));

      var image_documents = this.state.documents_image;
      image_documents.push(event.target.files[0]);

      await this.setState({
        documents: image,
        formErrdocuments: '',
        documents_image: image_documents,
      });
      const data = new FormData();
      data.append('certificates', event.target.files[0]);
      this.props.addCerificatesAction(data,this.props.match.params.id)
    }
    else{
      var image = this.state.documents;
      image.push(URL.createObjectURL(event.target.files[0]));

      var image_documents = this.state.documents_image;
      image_documents.push(event.target.files[0]);

      await this.setState({
        documents: image,
        formErrdocuments: '',
        documents_image: image_documents,
      });
    }
    
  };

  handleAddSlotClick = async () => {
    const slots = [
      ...this.state.formFields,
      {
        index:
          this.state.formFields[this.state.formFields.length - 1].index + 1,
      },
    ];
    this.setState({ formFields: slots });

    const data_slot = [
      ...this.state.workingSlots,
      {
        slot: '1',
        time: '1',
        hours_min: 'Hours',
        slot_open_hour: '1',
        slot_open_min: '1',
        slot_hours_min: 'AM',
        city: '',
      },
    ];
    this.setState({ workingSlots: data_slot });
  };
  clickOnDelete = (record) => {
    if (this.state.formFields.length !== 1) {
      var arrayData = this.state.formFields;
      arrayData.pop();
      this.setState({ formFields: arrayData });
      var data_slot = this.state.workingSlots;
      data_slot.pop();
      this.setState({ workingSlots: data_slot });
    }
  };
  componentDidMount = async () => {
    // console.log(this.props.match,"match data_professional");
    let professional_id = await this.props.match.params.id;

    if (professional_id) {
      // console.log(professional_id);
      await this.setState({
        professional_id: professional_id,
        // category_name:this.props.match.params.name
      });
      await this.props.fetchprofessional(professional_id);
      const getData = await this.props.data_professional;
      this.props.fetchprofessional(professional_id);

      // console.log(this.state.workingDay);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const { enqueueSnackbar, error, success } = this.props;
    success && enqueueSnackbar(success, { variant: 'success' });
    error && enqueueSnackbar(error, { variant: 'error' });
  }
  handleDayClick = async (day, { selected, disabled }) => {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      var results = this.state.workingDay.filter(function (entry) {
        return entry.getTime() != day.getTime();
      });
      this.setState({ workingDay: results });
      return;
    }

    var arrayData = this.state.workingDay;
    arrayData.push(day);
    await this.setState({ workingDay: arrayData });
    console.log(this.state.workingDay);
  };
  handleSubmit = async () => {
    await this.setState({
      formErrworkingDay:
        this.state.workingDay.length === 0 ? 'Please provide this field' : '',
      formErrworkingSlots:
        this.state.workingSlots.length === 0 ? 'Please provide this field' : '',
      
    });
      if (
        !(
          this.state.workingDay.length === 0 &&
          this.state.workingSlots.length === 0
        )
      ) {
        const data = new FormData();
        for (let index = 0; index < this.state.formFields.length; index++) {
          const element = this.state.formFields[index];
          // console.log(element)
          if(this.state.formFields[index].slot_open_hour == undefined){
            this.state.formFields[index].slot_open_hour = "00"
          }
          if(this.state.formFields[index].slot_open_min == undefined){
            this.state.formFields[index].slot_open_min = "00"
          }
          if(this.state.formFields[index].slot_hours_min == undefined){
            this.state.formFields[index].slot_hours_min = "AM"
          }
          this.state.formFields[index].id = index
          this.state.formFields[index].slot_opening_time = this.state.formFields[index].slot_open_hour+":" +this.state.formFields[index].slot_open_min+" " +this.state.formFields[index].slot_hours_min
          if(this.state.formFields[index].hours_min === "Hours"){
            this.state.formFields[index].slot_time_in_minutes = parseInt(this.state.formFields[index].time) * 60 *60
          }
          else if(this.state.formFields[index].hours_min === "days"){
            this.state.formFields[index].slot_time_in_minutes = parseInt(this.state.formFields[index].time) * 60 *24 *60
          }
          
          else if(this.state.formFields[index].hours_min === "Minutes"){
            this.state.formFields[index].slot_time_in_minutes = parseInt(this.state.formFields[index].time) * 60
          }
          else{
            this.state.formFields[index].slot_time_in_minutes = parseInt(this.state.formFields[index].time) * 60 *60

            this.state.formFields[index].hours_min = "Hours"
          }
          console.log(this.state.formFields)
        }
        data.append('workingSlots', JSON.stringify(this.state.formFields));
        data.append('workingOffDay', JSON.stringify(this.state.workingDay));
        // console.log("edit")
        this.props.editProfessionalAction(
          data,
          // this.props.history,
          this.state.professional_id
        );
      }
    
  };
  onChangeAddName = async (key, value) => {
    var self = this;
    await self.setState({
      [key]: value,
      ['formErr' + key]: value === '' ? 'Please provide this field' : '',
    });
    // if (key === "country") {
    //   // await this.props.fetchcity("600921c703e76716847fac0c")
    //   await this.props.fetchcity(value)
    // }
  };
  onChangeSlot = async (index, key, value) => {
    var data = this.state.formFields;
    // if (key === "time" || key === "slot_open_hour" | key === "slot_open_min") {
    //   data[index][key] = parseInt(value)
    // }
    // else {
    data[index][key] = value;
    // }

    this.setState({ formFields: data });
  };
  handlelatlong = (value) => {
    // const formvalue = { ...formValues }
    // formvalue.address.x_coordinate = value.latitude
    // formvalue.address.y_coordinate = value.longitude
    // setFormValue(formvalue)
    this.setState({
      latitude: value.latitude,
      longitude: value.longitude,
    });
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  };
  handleAddress = (value) => {};
  handlepincode = (value) => {};
  handlecityname = (value) => {};
  render() {
    let professional_id = this.props.match.params.id;
    let getData = this.props.data_professional;

    if (
      professional_id &&
      (!this.state.businessId || this.state.businessId !== getData._id) &&
      this.props.data_professional &&
      this.props.data_professional._id
    ) {
      let date_data = [];
      if (getData.workingOffDay && getData.workingOffDay) {
        for (let index = 0; index < getData.workingOffDay.length; index++) {
          if(new Date(getData.workingOffDay[index]) >= new Date()){
            date_data.push(new Date(getData.workingOffDay[index]));
          }
        }
      }

      this.updateState({
        workingDay: date_data,
        businessId: getData._id,
        backgroundCheck: getData.backgroundCheck,
        certificate_check: getData.certificate_check,
        tradeLicence: getData.tradeLicence,
        email: getData.email,
        name: getData.name,
        mobile_no: getData.mobile_no,
        businessName: getData.bussinessName,
        professionalPurpose: getData.professionalPurpose,
        city2: getData.local_city,
        country_code: getData.country_code,
        min_cost: getData.min_cost,
        subCategory: getData.subCategory,
        description: getData.description,
        commercial_insurance: getData.commercial_insurance,
        // workingDay:getData.workingOffDay,
        driver_licence: getData.driver_licence,
        insured: getData.insured,
        documents: getData.certificates,
        formFields: getData.workingSlots,
        file: getData.profile_pic,
        professional_images: getData.profile_pic,
        workingSlots: getData.workingSlots,
        customer_instructions: getData.customer_instructions,
        delivery:(getData.capabilities)?getData.capabilities.delivery:'',
        rideshare:(getData.capabilities)?getData.capabilities.rideshare:'',
        category_product_service:(getData.capabilities)?getData.capabilities.category_product_service:'',
        report:(getData.capabilities)?getData.capabilities.report:'',
        happy_hour_discount:(getData.capabilities)?getData.capabilities.happy_hour_discount:'',
        schedule:(getData.capabilities)?getData.capabilities.schedule:'',
        
        radius: getData.radius,
        longitude: getData.location.coordinates[0],
        latitude: getData.location.coordinates[1],
      });
    }
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>
                    {this.props.match.params.id ? 'Update' : 'Add'} Professional
                  </h6>
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
                      <div className='row mb-5'>
                        <div className='col-lg-12'>
                          <label className='form-control-label'>
                            Choose the day you do not want to work
                          </label>
                          <div className='calendarCont'>
                            <DayPicker
                              disabledDays={{ before: new Date() }}
                              onDayClick={this.handleDayClick}
                              selectedDays={this.state.workingDay}
                            />
                          </div>
                          <span style={{ color: 'red' }}>
                            {this.state.formErrworkingDay}
                          </span>
                        </div>
                      </div>

                      {this.state.formFields.map((item, idx) => {
                        return (
                          <div className='row'>
                            {/* <div className='row'> */}
                            <div className='col-6'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-slot'
                                >
                                  How Many number Slot/day/month $ time slot in
                                  min or hours
                                </label>
                                <input
                                  type='number'
                                  id='input-slot'
                                  className='form-control'
                                  placeholder='No. of slots'
                                  value={item.slot}
                                  min="1"
                                  max="20"
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'slot',
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                                <span style={{ color: 'red' }}>
                                  {this.state.formErrslot}
                                </span>
                              </div>
                            </div>
                            <div className='col-6'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-slot'
                                >
                                  City
                                </label>
                                <input
                                  type='text'
                                  id='input-slot'
                                  className='form-control'
                                  placeholder='City'
                                  value={item.city}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'city',
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                                <span style={{ color: 'red' }}>
                                  {this.state.formErrslot}
                                </span>
                              </div>
                            </div>
                            {/* </div> */}
                            <div className='col-lg-6'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-first-name'
                                >
                                  Slots in Min or Hours
                                </label>
                                <Input
                                  // value={this.state.businessName}
                                  type='select'
                                  value={item.time}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'time',
                                      e.target.value
                                    )
                                  }
                                >
                                  {data.minutes_second.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Input>
                              </div>
                            </div>
                            <div className='col-lg-6'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-first-name'
                                >
                                  &nbsp;
                                </label>
                                <Input
                                  // value={this.state.businessName}
                                  type='select'
                                  value={item.hours_min}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'hours_min',
                                      e.target.value
                                    )
                                  }
                                >
                                  {data.slots.map((option) => (
                                    <option value={option.option}>
                                      {option.option}
                                    </option>
                                  ))}
                                </Input>
                              </div>
                            </div>
                            <div className='col-lg-4'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-first-name'
                                ></label>
                                {/* <select class='form-control' id='exampleFormControlSelect1'>
                                {(data.hours).map(opt =>
                                  <option value={opt}>{opt}</option>
                                )}
                              </select> */}
                                <Input
                                  // value={this.state.businessName}
                                  type='select'
                                  value={item.slot_open_hour}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'slot_open_hour',
                                      e.target.value
                                    )
                                  }
                                >
                                  {data.hours.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Input>
                              </div>
                            </div>
                            <div className='col-lg-4'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-first-name'
                                >
                                  &nbsp;
                                </label>
                                <Input
                                  // value={this.state.businessName}
                                  type='select'
                                  value={item.slot_open_min}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'slot_open_min',
                                      e.target.value
                                    )
                                  }
                                >
                                  {data.minutes_second.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Input>
                              </div>
                            </div>
                            <div className='col-lg-4'>
                              <div className='form-group'>
                                <label
                                  className='form-control-label'
                                  for='input-first-name'
                                >
                                  &nbsp;
                                </label>
                                <Input
                                  // value={this.state.businessName}
                                  type='select'
                                  value={item.slot_hours_min}
                                  onChange={(e) =>
                                    this.onChangeSlot(
                                      idx,
                                      'slot_hours_min',
                                      e.target.value
                                    )
                                  }
                                >
                                  {data.format.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Input>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type='button'
                        className='btn btn-warning btn-sm'
                        onClick={this.handleAddSlotClick}
                      >
                        Add More Slots
                      </button>
                      {this.state.formFields.length > 1 ? (
                        <button
                          type='button'
                          className='btn btn-warning btn-sm'
                          onClick={this.clickOnDelete}
                        >
                          {/* <i className="fa fa-minus" aria-hidden="true" /> */}
                          Remove last slot
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* <Map
                      lat={28.5355}
                      lng={77.3910}
                      height="50vh"
                    /> */}
                    {/* <Map
                    center={{ lat: this.state.latitude, lng: this.state.longitude }}
                    handlelatlong={this.handlelatlong}
                    // handleAddress={handleAddress}
                    // handlepincode={handlepincode}
                    // handlecityname={handlecityname}
                    height='400px'
                    zoom={15}
                  /> */}
                    <button
                      className='btn btn-success float-right'
                      type='button'
                      onClick={(e) => this.handleSubmit()}
                    >
                      {this.props.match.params.id ? 'Update' : 'Save'}
                    </button>
                    <button
                      className='btn btn-default float-right mr-4'
                      type='button'
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <footer className='footer pt-0'>
            <div className='row align-items-center justify-content-lg-between'>
              <div className='col-lg-6'>
                <div className='copyright text-center text-lg-left  text-muted mt-4 ml-4'>
                  &copy; 2020 StreetCarrier
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    success: state.professional.success,
    error: state.professional.error,
    alllisting: state.subCategory.alllisting,
    data_professional: state.professional.data_professional,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProfessionalAction: (data, history) =>
      dispatch(actions.addProfessional(data, history)),
    // fetchallsubCategory: () =>
    //   dispatch(actions.fetchallsubCategoryListAction()),
    // fetchbussiness: () => dispatch(actions.fetchbussinessListAction()),
    // fetchcountry: () => dispatch(actions.fetchcountrysListAction()),
    // fetchcity: (data) => dispatch(actions.fetchcitysListAction(data)),
    fetchprofessional: (data) =>
      dispatch(actions.fetchprofessionalAction(data)),
    editProfessionalAction: (data, professional_id) =>
      dispatch(actions.editProfessional(data, professional_id)),
      editProfessionalImageAction: (data, professional_id) =>
      dispatch(actions.editProfessionalImage(data, professional_id)),
    
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(withRouter(AddProfessionals)));
