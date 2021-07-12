import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Link
} from 'react-router-dom'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Button
} from 'reactstrap'
import {
  TabContent,
  TabPane,
} from "reactstrap";
class BusinessDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      business_id: "",
      // add category
      open: false,
      openDialgue: false,
      category_name: '',
      category_type: '',
      formErrcategory_name: '',
      formErrcategory_type: '',
      categoryId: "",

      // add extra product
      open2: false,
      openDialgue2: false,
      extra_product_id: '',
      // description:'',
      // formErrdescription:'',
      extraProduct: '',
      formErrextraProduct: '',
      size_price: [
        {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }
      ],
      multi_selected: true,
      formErrmulti_selected: '',
      price_extraproduct:"0",
      formErrprice_extraproduct:'',
      // add extra service 
      open3: false,
      openDialgue3: false,
      extra_service_id: '',
      extraService: '',
      formErrextraService: '',
      size_price_duration: [
        {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }
      ],
      multi_selected_extra_service: '',
      formErrmulti_selected_extra_service: '',
      price_extra_service:'',
      formErrprice_extra_service:'',
      duration_extra_service:'',
      formErrduration_extra_service:'',
      unit_extra_service:'',
      formErrunit_extra_service:'',
      // add product 
      open4: false,
      openDialgue4: false,
      product_image: '',
      formErrproduct_image: '',
      product_name: '',
      formErrproduct_name: '',
      productcategory_id: '',
      formErrproductcategory_id: '',
      extra_products: [],
      formErrextra_products: '',
      // description, 
      size_price_product: [],
      price_product: '',
      formErrprice_product: '',
      file1: '',
      product_id: '',
      product_desc:'',
      formErrproduct_desc:'',
      //add service
      open5: false,
      openDialgue5: false,
      service_name: '',
      formErrservice_name: '',
      service_desc:'',
      formErrservice_desc:'',
      servicecategory_id: '',
      formErrservicecategory_id: '',
      extra_services: [],
      formErrextra_services: '',
      // description:datas.description, 
      size_price_service: [],
      price_service: "0",
      formErrprice_service: '',
      service_image: '',
      formErrservice_image: '',
      file2: '',
      service_id: '',
      duration: 0,
      formErrduration: '',
      unit: '',
      formErrunit: '',
    }
    this.handleAddSlotClick = this.handleAddSlotClick.bind(this);
    this.clickOnDelete = this.clickOnDelete.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
  }
  handleUploadFile = async (event) => {
    if (this.state.activeTab == "4") {
      await this.setState({
        file1: URL.createObjectURL(event.target.files[0]), product_image: event.target.files[0],
        formErrproduct_image: ''
      })
    }
    if (this.state.activeTab == "5") {
      await this.setState({
        file2: URL.createObjectURL(event.target.files[0]), service_image: event.target.files[0],
        formErrservice_image: ''
      })
    }

  }
  onChangeSlot = async (index, key, value) => {
    if (this.state.activeTab == "2") {
      var data = this.state.size_price
      data[index][key] = value

      this.setState({ size_price: data })
    }
    else if (this.state.activeTab == "3") {
      var data = this.state.size_price_duration
      data[index][key] = value

      this.setState({ size_price_duration: data })
    }
    else if (this.state.activeTab == "4") {
      var data = this.state.size_price_product
      data[index][key] = value

      this.setState({ size_price_product: data })
    }
    else if (this.state.activeTab == "5") {
      var data = this.state.size_price_service
      console.log(data)
      data[index][key] = value

      this.setState({ size_price_service: data })
    }
  }
  handleAddSlotClick = async () => {
    if (this.state.activeTab == "2") {
      if(this.state.size_price.length === 0){
        const data_slot = [...this.state.size_price, {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price: data_slot })
      }else{
        var index = this.state.size_price[this.state.size_price.length - 1].index + 1
        const data_slot = [...this.state.size_price, {
          index: index,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price: data_slot })
      }
      console.log(this.state.size_price)
    }
    else if (this.state.activeTab == "3") {
      if(this.state.size_price_duration.length === 0){
      
        const data_slot = [...this.state.size_price_duration, {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_duration: data_slot })
      }else{
        var index = this.state.size_price_duration[this.state.size_price_duration.length - 1].index + 1
        const data_slot = [...this.state.size_price_duration, {
          index: index,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_duration: data_slot })
      }
      
    }
    else if (this.state.activeTab == "4") {
      if(this.state.size_price_product.length === 0){
        const data_slot = [...this.state.size_price_product, {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_product: data_slot })
      }else{
        var index = this.state.size_price_product[this.state.size_price_product.length - 1].index + 1
        const data_slot = [...this.state.size_price_product, {
          index: index,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_product: data_slot }) 
      }
    }
    else if (this.state.activeTab == "5") {
      if(this.state.size_price_service.length === 0){
        const data_slot = [...this.state.size_price_service, {
          index: 0,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_service: data_slot })
      }
      else{
        var index = this.state.size_price_service[this.state.size_price_service.length - 1].index + 1
        const data_slot = [...this.state.size_price_service, {
          index: index,
          size: '',
          price: "0",
          duration: 0,
          unit: ''
        }]
        this.setState({ size_price_service: data_slot })
      }
    }

    console.log(this.state.activeTab)
  }

  clickOnDelete = (record) => {
    // if (this.state.activeTab == "2") {
      if (this.state.size_price.length !== 1) {
        var arrayData = this.state.size_price;
        arrayData.pop()
        this.setState({ size_price: arrayData })
      }
    // }
    // else if (this.state.activeTab == "3") {
      if (this.state.size_price_duration.length !== 1) {
        var arrayData = this.state.size_price_duration;
        arrayData.pop()
        this.setState({ size_price_duration: arrayData })
      }
    // }
    // else if (this.state.activeTab == "4") {
      if (this.state.size_price_product.length !== 1) {
        var arrayData = this.state.size_price_product;
        arrayData.pop()
        this.setState({ size_price_product: arrayData })
      }
    // }
    // else if (this.state.activeTab == "5") {
      if (this.state.size_price_service.length !== 1) {
        var arrayData = this.state.size_price_service;
        arrayData.pop()
        this.setState({ size_price_service: arrayData })
      }
    // }
  }
  open() {
    if (this.state.activeTab == "1") {
      this.setState({
        category_name: '',
        category_type: '',
        open: true,
        categoryId: "",
      });
    }
    else if (this.state.activeTab == "2") {
      this.setState({
        open2: true,
        extra_product_id: '',
      });
    }
    else if (this.state.activeTab == "3") {
      this.setState({
        open3: true,
        extra_service_id: '',
      });
    }
    else if (this.state.activeTab == "4") {
      this.setState({
        open4: true,
        product_id: '',
      });
    }
    else if (this.state.activeTab == "5") {
      this.setState({
        open5: true,
        service_id: '',
      });
    }
  }
  toggle = el => {
    this.setState({ activeTab: el });
  };
  componentWillMount() {

    let business_id = localStorage.getItem('userId');

    if (business_id) {
      this.props.fetchgetproductAction(business_id)
      this.props.fetchsubBusiness(business_id)
      this.props.fetchgetextraproductList(business_id)
      this.props.fetchgetextraserviceList(business_id)
      this.props.fetchgetServiceAction(business_id)
      console.log("simran" + this.props.productList)
      this.setState({
        business_id: business_id,
        // category_name:this.props.match.params.name
      });
    }
  }
  handleOpenDelete = (id) => {
    console.log(this.state.extra_product_id)
    console.log(this.state.openDialgue2)
    if (this.state.activeTab == "1") {
      if (id) {

        this.setState({
          categoryId: id,
          openDialgue: true
        });
      }
    }
    else if (this.state.activeTab == "2") {
      if (id) {
        this.setState({
          extra_product_id: id,
          openDialgue2: true
        });
      }
    }
    else if (this.state.activeTab == "3") {
      if (id) {
        this.setState({
          extra_service_id: id,
          openDialgue3: true
        });
      }
    }
    else if (this.state.activeTab == "4") {
      if (id) {
        this.setState({
          product_id: id,
          openDialgue4: true
        });
      }
    }
    else if (this.state.activeTab == "5") {
      if (id) {
        this.setState({
          service_id: id,
          openDialgue5: true
        });
      }
    }

  }
  mapData = async (data) => {
    console.log(data)
    await this.setState(data)
  }
  onChangeAddName = async (key, value) => {
    if(key == "extra_products"){
      
      let array_extra_products = this.state.extra_products
      
      if(value === ""){
        array_extra_products = []
      }else{
        if(array_extra_products.includes(value)){
          array_extra_products.splice(array_extra_products.indexOf(value), 1);
        }
        else{
          // array_extra_products = []
          array_extra_products.push(value)  
        }
      }
      this.setState({
        extra_products:array_extra_products
      })
    }
    else if(key == "extra_services"){
      
      let array_extra_services = this.state.extra_services
      
      if(value === ""){
        array_extra_services = []
      }else{
        if(array_extra_services.includes(value)){
          array_extra_services.splice(array_extra_services.indexOf(value), 1);
        }
        else{
          array_extra_services.push(value)  
        }
      }
      this.setState({
        extra_services:array_extra_services
      })
    }
    else{
      await this.setState({
        ...this.state[key],
        [key]: value,
        ['formErr' + key]: (value === '') ? 'Please provide this field' : ''
      })
      
    }
    
  }
  // handleInputChange(event) {
  //   console.log(event)
  //   return
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  closeDialgue() {
    if (this.state.activeTab == "1") {
      this.setState({ openDialgue: false });
    }
    else if (this.state.activeTab == "2") {
      this.setState({ openDialgue2: false });
    }
    else if (this.state.activeTab == "3") {
      this.setState({ openDialgue3: false });
    }
    else if (this.state.activeTab == "4") {
      this.setState({ openDialgue4: false });
    }
    else if (this.state.activeTab == "5") {
      this.setState({ openDialgue5: false });
    }
    else {
      this.setState({
        openDialgue2: false,
        openDialgue: false,
        openDialgue3: false,
        openDialgue4: false,
        openDialgue5: false
      });
    }
  }
  deleteUserPermanently() {
    if (this.state.categoryId && this.state.activeTab == "1") {
      this.props.deleteBusinessCategoryAction({ categoryId: this.state.categoryId, business_id: this.state.business_id });
      this.closeDialgue()
      this.setState({ categoryId: '' });
    }
    else if (this.state.extra_product_id && this.state.activeTab == "2") {
      this.props.deleteBusinessExtraProductAction({ extra_product_id: this.state.extra_product_id, business_id: this.state.business_id });
      this.closeDialgue()
      this.setState({ extra_product_id: '' });
    }
    else if (this.state.extra_service_id && this.state.activeTab == "3") {
      this.props.deleteExtraServiceAction({ extra_service_id: this.state.extra_service_id, business_id: this.state.business_id });
      this.closeDialgue()
      this.setState({ extra_service_id: '' });
    }
    else if (this.state.product_id && this.state.activeTab == "4") {
      this.props.deleteProductAction({ product_id: this.state.product_id, business_id: this.state.business_id }, this.state.business_id);
      this.closeDialgue()
      this.setState({ product_id: '' });
    }
    else if (this.state.service_id && this.state.activeTab == "5") {
      this.props.deleteServiceAction({ service_id: this.state.service_id, business_id: this.state.business_id }, this.state.business_id);
      this.closeDialgue()
      this.setState({ service_id: '' });
    }
  }
  handleSubmit = async () => {
    if (this.state.activeTab == "1") {

      await this.setState({
        formErrcategory_name: (this.state.category_name === '') ? "Please provide this field" : '',
        formErrcategory_type: (this.state.category_type === '') ? "Please provide this field" : '',

      })
      if (this.state.category_name !== '' && this.state.category_type !== '') {
        if (this.state.categoryId !== '') {
          this.props.editBusinessCategoryAction({
            business_id: this.state.business_id,
            category_name: this.state.category_name,
            category_type: this.state.category_type,
            categoryId: this.state.categoryId
          })
        }
        else {
          this.props.addBusinessCategoryAction({
            business_id: this.state.business_id,
            category_name: this.state.category_name,
            category_type: this.state.category_type
          })
        }
        this.setState({
          category_name: '',
          category_type: '',
          categoryId: "",
          open: false,
          activeTab: "1"
        })
      }

    }
    else if (this.state.activeTab == "2") {
      await this.setState({
        // formErrdescription: (this.state.description === '') ? "Please provide this field" : '',
        formErrextraProduct: (this.state.extraProduct === '') ? "Please provide this field" : '',
      })


      if (this.state.extraProduct !== '') {
        if (this.state.extra_product_id !== '') {
          this.props.editBusinessExtraProductAction({
            extraProduct: this.state.extraProduct,
            size_price: this.state.size_price,
            description: this.state.extraProduct,
            business_id: this.state.business_id,
            multi_selected: this.state.multi_selected,
            extra_product_id: this.state.extra_product_id,
            price:"0"
            // this.state.price_extraproduct
          })
        }
        else {
          this.props.addBusinessExtraProductAction({
            extraProduct: this.state.extraProduct,
            size_price: this.state.size_price,
            description: this.state.extraProduct,
            business_id: this.state.business_id,
            multi_selected: this.state.multi_selected,
            price:"0"
            // this.state.price_extraproduct
          })
        }
        this.setState({
          extraProduct: '',
          size_price: [{
            index: 0,
            size: '',
            price: "0",
            duration: 0,
            unit: ''
          }],
          // description:'',
          multi_selected: '',
          open2: false,
          activeTab: "2",
          // formErrdescription:"",
          formErrextraProduct: "",
          price_extraproduct:"0",
          formErrprice_extraproduct:'',
      
        })
      }


    }
    else if (this.state.activeTab == "3") {
      await this.setState({
        formErrextraService: (this.state.extraService === '') ? "Please provide this field" : '',
        formErrmulti_selected_extra_service: (this.state.multi_selected_extra_service === '') ? "Please provide this field" : '',
      })
      if (this.state.extraService !== '') {
        if (this.state.extra_service_id !== '') {
          var new_size_price_duration = this.state.size_price_duration;
          await new_size_price_duration.map(data => {
            // console.log(data)
            if (data.unit === "minutes") {
              data.duration = data.duration * 60
              data.unit = "seconds"
            }
            else if (data.unit === "hours") {
              data.duration = data.duration * 60 * 60
              data.unit = "seconds"
            }
            else if (data.unit === "days") {
              data.duration = data.duration * 60 * 60 * 24
              data.unit = "seconds"
            }
            else if (data.unit === "seconds") {
              data.duration = data.duration * 1
              data.unit = "seconds"
            }
            return data
          })
          if (this.state.unit_extra_service === "minutes") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60,
              unit_extra_service:"seconds"
            })
          }
          else if (this.state.unit_extra_service === "hours") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60 *60,
              unit_extra_service:"seconds"
            })
          }
          else if (this.state.unit_extra_service === "days") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60 *60 *24,
              unit_extra_service:"seconds"
            })
          }
          await this.setState({
            size_price_duration: new_size_price_duration
          })
          await this.props.editExtraServiceAction({
            extraService: this.state.extraService,
            size_price_duration: this.state.size_price_duration,
            description: this.state.extraService,
            business_id: this.state.business_id,
            multi_selected: this.state.multi_selected_extra_service,
            extra_service_id: this.state.extra_service_id,
            price:"0",
            // this.state.price_extra_service,
            duration:0,
            // this.state.duration_extra_service,
            unit:"seconds"
            // this.state.unit_extra_service,
          })
        }
        else {
          var new_size_price_duration = this.state.size_price_duration;
          await new_size_price_duration.map(data => {
            // console.log(data)
            if (data.unit === "minutes") {
              data.duration = data.duration * 60
              data.unit = "seconds"
            }
            else if (data.unit === "hours") {
              data.duration = data.duration * 60 * 60
              data.unit = "seconds"
            }
            else if (data.unit === "days") {
              data.duration = data.duration * 60 * 60 * 24
              data.unit = "seconds"
            }
            else if (data.unit === "seconds") {
              data.duration = data.duration * 1
              data.unit = "seconds"
            }
            return data
          })
          await this.setState({
            size_price_duration: new_size_price_duration
          })
          if (this.state.unit_extra_service === "minutes") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60,
              unit_extra_service:"seconds"
            })
          }
          else if (this.state.unit_extra_service === "hours") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60 *60,
              unit_extra_service:"seconds"
            })
          }
          else if (this.state.unit_extra_service === "days") {
            this.setState({
              // duration_extra_service:this.state.duration_extra_service * 60 *60 *24,
              unit_extra_service:"seconds"
            })
          }
          await this.props.addExtraServiceAction({
            extraService: this.state.extraService,
            size_price_duration: this.state.size_price_duration,
            description: this.state.extraService,
            business_id: this.state.business_id,
            multi_selected: this.state.multi_selected_extra_service,
            price:"0",
            // this.state.price_extra_service,
            duration:0,
            // this.state.duration_extra_service,
            unit:"seconds"
            // this.state.unit_extra_service,
          })
        }
        this.setState({
          extraService: '',
          size_price: [{
            index: 0,
            size: '',
            price: "0",
            duration: 0,
            unit: ''
          }],
          multi_selected_extra_service: '',
          open3: false,
          activeTab: "3",
          formErrextraService: "",
          formErrmulti_selected_extra_service: "",          
          price_extra_service:0,
          formErrprice_extra_service:'',
          duration_extra_service:'',
          formErrduration_extra_service:'',
          unit_extra_service:'',
          formErrunit_extra_service:'',
        })
      }


    }
    else if (this.state.activeTab == "4") {

      await this.setState({
        formErrproduct_name: (this.state.product_name === '') ? "Please provide this field" : '',
        formErrproductcategory_id: (this.state.productcategory_id === '') ? "Please provide this field" : '',
        formErrextra_products: (this.state.extra_products === '') ? "Please provide this field" : '',
        formErrprice_product: (this.state.price_product === '') ? "Please provide this field" : '',
      })
      if (this.state.product_name !== '' && this.state.productcategory_id !== '' && this.state.extra_products !== '' && this.state.price_product !== ''  && this.state.product_desc !=='') {
        console.log(this.state.product_id)
        if (this.state.product_id !== '') {
          const data = new FormData();
          data.append('business_id', this.state.business_id);
          data.append('product_name', this.state.product_name);
          data.append('category_id', this.state.productcategory_id);
          // data.append('extra_products', this.state.extra_products);
          data.append('description', this.state.product_desc);
          data.append('size_price', JSON.stringify(this.state.size_price_product));
          data.append('price', this.state.price_product);
          // data.append('product_image', this.state.product_image);
          data.append('product_id', this.state.product_id);

          this.props.editProductAction(data, this.state.product_id, this.state.business_id,this.state.extra_products)
          // if(this.state.file1 !== ''){
          const data1 = new FormData();
          data1.append('product_image', this.state.product_image);

          data1.append('productId', this.state.product_id);

          this.props.editProductImageAction(data1, this.state.business_id)

          this.props.addProductExtraProductAction({
            product_id:this.state.product_id,
            extra_product_id:this.state.extra_products
          })

          // }


        }
        else {
          const data = new FormData();


          data.append('business_id', this.state.business_id);
          data.append('product_name', this.state.product_name);
          data.append('category_id', this.state.productcategory_id);
          data.append('extra_products', this.state.extra_products);
          data.append('description', this.state.product_desc);
          data.append('size_price', JSON.stringify(this.state.size_price_product));
          data.append('price', this.state.price_product);
          data.append('product_image', this.state.product_image);

          this.props.addProductAction(data, this.state.business_id,this.state.extra_products)

        }
        this.setState({
          product_image: '',
          formErrproduct_image: '',
          product_name: '',
          formErrproduct_name: '',
          productcategory_id: '',
          formErrproductcategory_id: '',
          extra_products: '',
          formErrextra_products: '',
          // description, 
          product_desc:'',
          formErrproduct_desc:'',
          size_price_product: [{
            index: 0,
            size: '',
            price: "0",
            duration: 0,
            unit: ''
          }],
          price_product: '',
          formErrprice_product: '',
          file1: '',
          product_id: '',
          open4: false,
          openDialgue4: false,
          activeTab: "4",
          extra_products:[],
          product_image:''
        })
      }

    }
    else if (this.state.activeTab == "5") {

      await this.setState({
        formErrservice_name: (this.state.service_name === '') ? "Please provide this field" : '',
        formErrservicecategory_id: (this.state.servicecategory_id === '') ? "Please provide this field" : '',
        // formErrextra_services: (this.state.extra_services === '') ? "Please provide this field" : '',
        // formErrcategory_type: (this.state.size_price_service === '') ? "Please provide this field" : '',
        formErrprice_service: (this.state.price_service === '') ? "Please provide this field" : '',
        formErrservice_image: (this.state.service_image === '') ? "Please provide this field" : '',

        formErrduration: (this.state.duration === '') ? "Please provide this field" : '',
        formErrunit: (this.state.unit === '') ? "Please provide this field" : '',
        formErrservice_desc:(this.state.service_desc === '')?"Please provide this field" : '',
      })
      if (this.state.service_name !== '' && this.state.service_desc !=='' && this.state.servicecategory_id !== '' && this.state.price_service !== '' && this.state.service_image !== '' && this.state.duration !== '' && this.state.unit !== '') {
        if (this.state.service_id !== '') {
          // edit service

          const data = new FormData();
          var new_size_price_service = this.state.size_price_service;
          await new_size_price_service.map(data => {
            // console.log(data)
            if (data.unit === "minutes") {
              data.duration = data.duration * 60
              data.unit = "seconds"
            }
            else if (data.unit === "hours") {
              data.duration = data.duration * 60 * 60
              data.unit = "seconds"
            }
            else if (data.unit === "days") {
              data.duration = data.duration * 60 * 60 * 24
              data.unit = "seconds"
            }
            else if (data.unit === "seconds") {
              data.duration = data.duration * 1
              data.unit = "seconds"
            }
            return data
          })
          await this.setState({
            size_price_service: new_size_price_service
          })

          if (this.state.unit === "minutes") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60
            })
          }
          else if (this.state.unit === "hours") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60 * 60
            })
          }
          else if (this.state.unit === "days") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60 * 60 * 24
            })
          }
          else if (this.state.unit === "seconds") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 1
            })
          }
          data.append('business_id', this.state.business_id);
          data.append('service_name', this.state.service_name);
          data.append('category_id', this.state.servicecategory_id);
          // data.append('extra_services', this.state.extra_services);
          data.append('description', this.state.service_desc);
          data.append('price', this.state.price_service);
          data.append('duration', this.state.duration);
          data.append('unit', this.state.unit);

          data.append('size_price_duration', JSON.stringify(this.state.size_price_service));

          this.props.editServiceAction(data, this.state.service_id, this.state.business_id)

          const data1 = new FormData();
          data1.append('service_image', this.state.service_image);

          data1.append('serviceId', this.state.service_id);

          this.props.editServiceImageAction(data1, this.state.business_id)


          this.props.addServiceExtraServiceAction({
            service_id:this.state.service_id,
            extra_service_id:this.state.extra_services
          })


        }
        else {
          // add service
          const data = new FormData();
          var new_size_price_service = this.state.size_price_service;
          await new_size_price_service.map(data => {
            // console.log(data)
            if (data.unit === "minutes") {
              data.duration = data.duration * 60
              data.unit = "seconds"
            }
            else if (data.unit === "hours") {
              data.duration = data.duration * 60 * 60
              data.unit = "seconds"
            }
            else if (data.unit === "days") {
              data.duration = data.duration * 60 * 60 * 24
              data.unit = "seconds"
            }
            else if (data.unit === "seconds") {
              data.duration = data.duration * 1
              data.unit = "seconds"
            }
            return data
          })
          await this.setState({
            size_price_service: new_size_price_service
          })

          if (this.state.unit === "minutes") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60
            })
          }
          else if (this.state.unit === "hours") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60 * 60
            })
          }
          else if (this.state.unit === "days") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 60 * 60 * 24
            })
          }
          else if (this.state.unit === "seconds") {
            this.setState({
              unit: "seconds",
              duration: this.state.duration * 1
            })
          }
          data.append('business_id', this.state.business_id);
          data.append('service_name', this.state.service_name);
          data.append('category_id', this.state.servicecategory_id);
          // data.append('extra_services', this.state.extra_services);
          data.append('description', this.state.service_desc);
          data.append('price', this.state.price_service);
          data.append('duration', this.state.duration);
          data.append('unit', this.state.unit);

          data.append('size_price_duration', JSON.stringify(this.state.size_price_service));
          data.append('service_image', this.state.service_image);

          this.props.addServiceAction(data, this.state.business_id,this.state.extra_services)

        }
        this.setState({
          service_name: '',
          formErrservice_name: '',
          servicecategory_id: '',
          formErrservicecategory_id: '',
          extra_services: '',
          formErrextra_services: '',
          // description:datas.description, 
          size_price_service: [],
          price_service: '',
          formErrprice_service: '',
          service_image: '',
          formErrservice_image: '',
          file2: '',
          service_id: '',
          duration: 0,
          formErrduration: '',
          unit: '',
          formErrunit: '',
          open5: false,
          activeTab: "5",
          service_desc:'',
          formErrservice_desc:'',
          extra_services:[],
          service_image:''
        })
      }

    }
  }
  async close() {
    if (this.state.activeTab == "1") {
      await this.setState({
        open: false,
        openDialgue: false,
        category_name: '',
        category_type: '',
        formErrcategory_name: '',
        formErrcategory_type: '',
        categoryId: "",
      });
    }
    else if (this.state.activeTab == "2") {
      await this.setState({
        open2: false,
        openDialgue2: false,
        extra_product_id: '',
        // description:'',
        // formErrdescription:'',
        extraProduct: '',
        formErrextraProduct: '',
        size_price: [
        ],
        multi_selected: true,
        formErrmulti_selected: '',
      });
    }
    else if (this.state.activeTab == "3") {
      await this.setState({
        open3: false,
        openDialgue3: false,
        extra_service_id: '',
        extraService: '',
        formErrextraService: '',
        size_price_duration: [
          
        ],
        multi_selected_extra_service: '',
        formErrmulti_selected_extra_service: '',
      });
    }
    else if (this.state.activeTab == "4") {
      this.setState({
        open4: false,
        openDialgue4: false,
        product_image: '',
        formErrproduct_image: '',
        product_name: '',
        formErrproduct_name: '',
        productcategory_id: '',
        formErrproductcategory_id: '',
        extra_products: '',
        formErrextra_products: '',
        // description, 
        size_price_product: [],
        price_product: '',
        formErrprice_product: '',
        file1: '',
        product_id: ''
      })
    }
    else if (this.state.activeTab == "5") {
      this.setState({
        open5: false,
        openDialgue5: false,
        service_name: '',
        formErrservice_name: '',
        servicecategory_id: '',
        formErrservicecategory_id: '',
        extra_services: '',
        formErrextra_services: '',
        // description:datas.description, 
        size_price_service: [],
        price_service: '',
        formErrprice_service: '',
        service_image: '',
        formErrservice_image: '',
        file2: '',
        service_id: '',
        duration: 0,
        formErrduration: '',
        unit: '',
        formErrunit: '',
      })
    }
  }

  render() {


    var sno = 1

    let businessList = [];
    let categoryTable = <Spinner />;

    {
      this.props.subBusinesslisting.length > 0 ?
      this.props.subBusinesslisting.map(datas => {

        businessList.push(
          {

            s_no: (sno++),
            cName: datas.category_name,
            cType: datas.category_type,
            action: <div>
              <button className='btn btn-icon btn-default btn-sm'
                onClick={(e) => this.mapData({ categoryId: datas._id, category_name: datas.category_name, category_type: datas.category_type, open: true })}
                data-toggle='modal' data-target='#exampleModal'
              >
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </button>
              <button class='btn btn-icon btn-danger btn-sm' type='button'
                onClick={(id) => this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button>
            </div>

          }
        )
      })

      : businessList.push(
        ["No record"]
      )
    }
    const data = {
      columns: [
        {
          label: "Sr.No",
          field: "s_no",
          sort: "asc",
        },
        {
          label: "Category Name",
          field: "cName",
          sort: "asc",
        },
        {
          label: "Category Type",
          field: "cType",
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

    categoryTable = (
      <MDBDataTable striped bordered hover entries={10} data={data} />
    );

    //Extra Product 


    var sno_extra_product = 1

    let extraproductLists = [];
    let extraproductTable = <Spinner />;

    {
      this.props.extraproductList.length > 0 ?
      this.props.extraproductList.map(datas => {

        extraproductLists.push(
          {

            s_no: (sno_extra_product++),
            extra_product: datas.extraProduct,
            // description:datas.description,
            // size_price:datas.size_price,
            action: <div>
              <button className='btn btn-icon btn-default btn-sm'
                onClick={(e) => this.mapData({
                  extra_product_id: datas._id, extraProduct: datas.extraProduct,
                  // description:datas.description,
                  price_extraproduct:datas.price,
                  size_price: datas.size_price, multi_selected: datas.multi_selected, open2: true
                })}
                data-toggle='modal' data-target='#exampleModal'
              >
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </button>
              <button class='btn btn-icon btn-danger btn-sm' type='button'
              onClick={(id) =>this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button>
            </div>

          }
        )
      })

      : extraproductLists.push(
        ["No record"]
      )
    }
    const data_extra_product = {
      columns: [
        {
          label: "Sr.No",
          field: "s_no",
          sort: "asc",
        },
        {
          label: "Extra Product Name",
          field: "extra_product",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: extraproductLists,
    };

    extraproductTable = (
      <MDBDataTable striped bordered hover entries={10} data={data_extra_product} />
    );

    // Extra Service

    var sno_extra_service = 1

    let extraserviceLists = [];
    let extraServiceTable = <Spinner />;

    {
      this.props.extraserviceList.length > 0 ?
      this.props.extraserviceList.map(datas => {

        extraserviceLists.push(
          {

            s_no: (sno_extra_service++),
            extra_service: datas.extraService,
            // description:datas.description,
            // size_price:datas.size_price,
            action: <div>
              <button className='btn btn-icon btn-default btn-sm'
                onClick={(e) => this.mapData({
                  extra_service_id: datas._id, extraService: datas.extraService,
                  price_extra_service:datas.price,
                  duration_extra_service:datas.duration,
                  unit_extra_service:datas.unit,

                  size_price_duration: datas.size_price_duration, multi_selected_extra_service: datas.multi_selected, open3: true
                })}
                data-toggle='modal' data-target='#exampleModal'
              >
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </button>
              <button class='btn btn-icon btn-danger btn-sm' type='button'
                onClick={(id) => this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button>
            </div>

          }
        )
      })

      : extraserviceLists.push(
        ["No record"]
      )
    }
    const data_extra_service = {
      columns: [
        {
          label: "Sr.No",
          field: "s_no",
          sort: "asc",
        },
        {
          label: "Extra Service Name",
          field: "extra_service",
          sort: "asc",
        },
        // {
        //   label: "Description",
        //   field: "description",
        //   sort: "asc",
        // },
        // {
        //   label: "Size Price",
        //   field: "size_price",
        //   sort: "asc",
        // },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: extraserviceLists,
    };

    extraServiceTable = (
      <MDBDataTable striped bordered hover entries={10} data={data_extra_service} />
    );

    // Product 


    var sno_product = 1

    let productLists = [];
    let productTable = <Spinner />;

    {
      this.props.productList.length > 0 ?
      this.props.productList.map(datas => {

        productLists.push(
          {

            s_no: (sno_product++),
            product_name: datas.product_name,
            price: datas.price,
            product_image: <img src={datas.product_image} className="rounded-circle mb-15" width="100" height="100"></img>,
            // datas.product_image,
            action: <div>
              <button className='btn btn-icon btn-default btn-sm'
                onClick={(e) => this.mapData({
                  product_name: datas.product_name,
                  productcategory_id: datas.category_id,
                  extra_products: datas.extra_products,
                  product_desc:datas.description, 
                  size_price_product: datas.size_price,
                  price_product: datas.price,
                  product_image: datas.product_image,
                  file1: datas.product_image,
                  product_id: datas._id,

                  open4: true
                })}
                data-toggle='modal' data-target='#exampleModal'
              >
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </button>
              <button class='btn btn-icon btn-danger btn-sm' type='button'
                onClick={(id) => this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button>
            </div>

          }
        )
      })

      : productLists.push(
        ["No record"]
      )
    }
    const data_product = {
      columns: [
        {
          label: "Sr.No",
          field: "s_no",
          sort: "asc",
        },
        {
          label: "Product Name",
          field: "product_name",
          sort: "asc",
        },
        {
          label: "price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Product image",
          field: "product_image",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: productLists,
    };

    productTable = (
      <MDBDataTable striped bordered hover entries={10} data={data_product} />
    );

    // Service 

    var sno_service = 1

    let serviceLists = [];
    let serviceTable = <Spinner />;

    {
      this.props.serviceList.length > 0 ?
      this.props.serviceList.map(datas => {

        serviceLists.push(
          {

            s_no: (sno_service++),
            service_name: datas.service_name,
            price: datas.price,
            service_image: <img src={datas.service_image} className="rounded-circle mb-15" width="100" height="100"></img>,
            // datas.service_image,
            action: <div>
              <button className='btn btn-icon btn-default btn-sm'
                onClick={(e) => this.mapData({
                  service_name: datas.service_name,
                  servicecategory_id: datas.category_id,
                  extra_services: datas.extra_services,
                  service_desc:datas.description, 
                  size_price_service: datas.size_price_duration,
                  price_service: datas.price,
                  service_image: datas.service_image,
                  file2: datas.service_image,
                  service_id: datas._id,
                  duration: datas.duration,
                  unit: datas.unit,
                  open5: true
                })}
                data-toggle='modal' data-target='#exampleModal'
              >
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </button>
              <button class='btn btn-icon btn-danger btn-sm' type='button'
                onClick={(id) => this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button>
            </div>

          }
        )
      })

      : serviceLists.push(
        ["No record"]
      )
    }
    const data_service = {
      columns: [
        {
          label: "Sr.No",
          field: "s_no",
          sort: "asc",
        },
        {
          label: "Service Name",
          field: "service_name",
          sort: "asc",
        },
        {
          label: "price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Service image",
          field: "service_image",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: serviceLists,
    };

    serviceTable = (
      <MDBDataTable striped bordered hover entries={10} data={data_service} />
    );
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  {this.state.activeTab == "1" ? <h6 className='h2 text-white d-inline-block mb-0'>Manage Category</h6> : this.state.activeTab == "2" ? <h6 className='h2 text-white d-inline-block mb-0'>Manage Extra Product</h6> : this.state.activeTab == "3" ? <h6 className='h2 text-white d-inline-block mb-0'>Manage Extra Service</h6> : this.state.activeTab == "4" ? <h6 className='h2 text-white d-inline-block mb-0'>Manage Product</h6> : this.state.activeTab == "5" ? <h6 className='h2 text-white d-inline-block mb-0'>Manage Service</h6> : <h6 className='h2 text-white d-inline-block mb-0'>Manage Category</h6>}

                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={(this.state.openDialgue || this.state.openDialgue2 || this.state.openDialgue3) || this.state.openDialgue4 || this.state.openDialgue5}
          onClose={() => this.closeDialgue()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Do you want to delete {this.state.activeTab == "1" ? "Business Category" : this.state.activeTab == "2" ? "Extra Product" : this.state.activeTab == "3" ? "Extra Service" : this.state.activeTab == "4" ? "Product" : this.state.activeTab == "5" ? "Service" : ""} ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button class='btn btn-icon btn-danger btn-sm' type='button' onClick={() => this.closeDialgue()}>
              No
            </button>
            <button class='btn btn-icon btn-success btn-sm' onClick={() => this.deleteUserPermanently()} type='button'>
              Yes
                  </button>
          </DialogActions>
        </Dialog>
        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-header border-0'>
                  {/* <div className='row'> */}
                  {/* <div className='col'> */}
                  <ul className='nav nav-pills nav-fill flex-column flex-sm-row' id='tabs-text' role='tablist'>
                    <li className='nav-item'>
                      {/* <button type='button' className='nav-link mb-sm-3 mb-md-0'>Category</button> */}
                      <Link
                        onClick={() => {
                          this.toggle("1");
                        }}
                        // to='/aboutus' 
                        className='nav-link mb-sm-3 mb-md-0 active' id='tabs-text-1-tab' data-toggle='tab' href='#tabs-text-1' role='tab' aria-controls='tabs-text-1' aria-selected='true'
                      >Category</Link>
                    </li>
                    <li className='nav-item'>
                      <Link
                        onClick={() => {
                          this.toggle("2");
                        }}
                        // to='/aboutus' 
                        className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Extra Products</Link>

                      {/* <button type='button' className='nav-link mb-sm-3 mb-md-0'>Extra Products</ button> */}
                    </li>
                    <li className='nav-item'>
                      <Link
                        onClick={() => {
                          this.toggle("3");
                        }}
                        // to='/aboutus' 
                        className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Extra Service</Link>

                      {/* <button type='button' className='nav-link mb-sm-3 mb-md-0'>Extra Service</button> */}
                    </li>
                    <li className='nav-item'>
                      <Link
                        // to='/aboutus'
                        onClick={() => {
                          this.toggle("4");
                        }}
                        className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Products</Link>

                      {/* <button type='button' className='nav-link mb-sm-3 mb-md-0'>Products</button> */}
                    </li>
                    <li className='nav-item'>
                      <Link
                        // to='/aboutus'
                        onClick={() => {
                          this.toggle("5");
                        }}
                        className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Service</Link>

                      {/* <button type='button' className='nav-link mb-sm-3 mb-md-0'>Service</button> */}
                    </li>
                  </ul>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Link
                      className='btn btn-primary float-right' onClick={() => this.open()}>Add Category</Link>
                    <div className='table-responsive'>

                      {categoryTable}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <Link className='btn btn-primary float-right' onClick={() => this.open()}>Add Extra Products</Link>
                    <div className='table-responsive'>
                      {extraproductTable}
                    </div>
                  </TabPane>

                  <TabPane tabId="3">

                    <Link className='btn btn-primary float-right' onClick={() => this.open()}>Add Extra Service</Link>

                    <div className='table-responsive'>
                      <table className='table align-items-center table-flush'>
                        {extraServiceTable}
                      </table>

                    </div>
                  </TabPane>

                  <TabPane tabId="4">
                    <Link className='btn btn-primary float-right' onClick={() => this.open()}>Add Products</Link>

                    <div className='table-responsive'>
                      <table className='table align-items-center table-flush'>
                        {productTable}
                      </table>
                    </div>
                  </TabPane>

                  <TabPane tabId="5">
                    <Link className='btn btn-primary float-right' data-toggle='modal' data-target='#exampleModal3' onClick={() => this.open()}>Add Service</Link>
                    <div className='table-responsive'>
                      <table className='table align-items-center table-flush'>
                        {serviceTable}
                      </table>
                    </div>
                  </TabPane>


                </TabContent>


              </div>
            </div>

            {/* Category Modal */}
            <Modal
              isOpen={this.state.open}
              toggle={() => this.close()}
            >
              <ModalHeader toggle={() => this.close()}>
                <Label for="title">Add Category</Label>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <input type='text' id='input-first-name' className='form-control' placeholder='Category'
                    value={this.state.category_name} onChange={(e) => this.onChangeAddName('category_name', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrcategory_name}</span>
                </FormGroup>
                <FormGroup>
                  <Input
                    value={this.state.category_type}
                    type="select"
                    onChange={(e) => this.onChangeAddName('category_type', e.target.value)}
                  >
                    <option value="">Category type</option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>

                  </Input>
                  <span style={{ color: 'red' }}>{this.state.formErrcategory_type}</span>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="raised" className="btn-default text-white mr-10" onClick={(e) => this.handleSubmit()}>{this.state.categoryId !== '' ? "Update" : "Save"}</Button>
                <Button variant="raised" onClick={() => this.close()} className="btn-danger text-white mr-10">Cancel</Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={this.state.open4}
              toggle={() => this.close()}
            >
              <ModalHeader toggle={() => this.close()}>
                <Label for="title">Add Product</Label>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label className='form-control-label'>Product Image</label>
                  <img src={this.state.product_image === '' ? '../assets/img/theme/img-1-1000x600.jpg' : this.state.file1} alt='Image placeholder' className='card-img-top' />
                  <span style={{ color: 'red' }}>{this.state.formErrproduct_image}</span>
                  <div className='d-flex justify-content-between pt-8 pt-md-4 pb-0 pb-md-4'>
                    <Input
                      type="file"
                      // id="File-2"
                      className='btn btn-default float-right'
                      onChange={this.handleUploadFile}
                    >Upload</Input>
                  </div>
                  {/* <div className='d-flex justify-content-between pt-8 pt-md-4 pb-0 pb-md-4'>
                            <a href='#' className='btn btn-default float-right'>Upload</a>
                          </div> */}

                </FormGroup>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Product Name</label>
                  <input type='text' id='input-first-name' className='form-control' placeholder='Product Name'
                    value={this.state.product_name} onChange={(e) => this.onChangeAddName('product_name', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrproduct_name}</span>
                </FormGroup>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Product Description</label>
                  <input type='text' id='input-first-name' className='form-control' placeholder='Product Description'
                    value={this.state.product_desc} onChange={(e) => this.onChangeAddName('product_desc', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrproduct_desc}</span>
                </FormGroup>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Price</label>
                  <input type='number' id='input-first-name' className='form-control' placeholder='Price' value={this.state.price_product} onChange={(e) => this.onChangeAddName('price_product', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrprice_product}</span>
                </FormGroup>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Extra Product</label>
                  <Input
                    value={this.state.extra_products}
                    type="select"
                    multiple="multiple"
                    onChange={(e) => this.onChangeAddName('extra_products', e.target.value)}
                  >
                    <option value="">Remove all product</option>
                    {this.props.extraproductList.map((option) => (
                      <option value={option._id}>{option.extraProduct}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Category</label>
                  <Input
                    value={this.state.productcategory_id}
                    type="select"
                    onChange={(e) => this.onChangeAddName('productcategory_id', e.target.value)}
                  >
                    <option value="">Category</option>
                    {this.props.subBusinesslisting.map((option) => (
                      
                      (option.category_type == "product")?<option value={option._id}>{option.category_name}</option>:''
                    ))}
                  </Input>
                  <span style={{ color: 'red' }}>{this.state.formErrproductcategory_id}</span>
                </FormGroup>
                <FormGroup>
                  <div className='mt-2 mb-2'>
                    <button type='button' className='btn btn-warning btn-sm'
                      onClick={this.clickOnDelete}
                    >Remove</button>
                    <button type='button'
                      onClick={this.handleAddSlotClick}
                      className='btn btn-default btn-sm'>Add Size</button>
                  </div>
                </FormGroup>
                {this.state.size_price_product.map((item, idx) => {
                  return <div className="row">
                    <FormGroup>
                      <label className='form-control-label' for='input-first-name'>Size</label>
                      <input type='text' id='input-first-name' className='form-control' placeholder='Size'
                        onChange={(e) => this.onChangeSlot(item.index, 'size', e.target.value)}
                        value={item.size}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className='form-control-label' for='input-first-name'>Price</label>
                      <input type='number' id='input-first-name' className='form-control' placeholder='Price'
                        onChange={(e) => this.onChangeSlot(item.index, 'price', e.target.value)}
                        value={item.price}
                      />
                    </FormGroup>
                  </div>
                })}
              </ModalBody>
              <ModalFooter>
                <Button variant="raised" className="btn-default text-white mr-10"
                  onClick={(e) => this.handleSubmit()}>{this.state.product_id !== '' ? "Update" : "Save"}
                </Button>
                <Button variant="raised" onClick={() => this.close()} className="btn-danger text-white mr-10">Cancel</Button>
              </ModalFooter>
            </Modal>

            {/* Extra Service Modal */}
            {/* <div className='modal fade' id='exampleModal3' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel3' aria-hidden='true'> */}
            <Modal
              isOpen={this.state.open5}
              toggle={() => this.close()}
            >
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>Service</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={() => this.close()}>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='row'>
                    <div className='col-lg-7'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Service Name</label>
                        <input type='text' id='input-first-name' className='form-control' placeholder='Service Name' value={this.state.service_name} onChange={(e) => this.onChangeAddName('service_name', e.target.value)} />
                        <span style={{ color: 'red' }}>{this.state.formErrservice_name}</span>

                      </div>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Service Description</label>
                        <input type='text' id='input-first-name' className='form-control' placeholder='Service Description' value={this.state.service_desc} onChange={(e) => this.onChangeAddName('service_desc', e.target.value)} />
                        <span style={{ color: 'red' }}>{this.state.formErrservice_desc}</span>

                      </div>

                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Price</label>
                        <input type='number' id='input-first-name' className='form-control' placeholder='Price' value={this.state.price_service} onChange={(e) => this.onChangeAddName('price_service', e.target.value)} />
                        <span style={{ color: 'red' }}>{this.state.formErrprice_service}</span>
                      </div>

                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Category</label>
                        <Input
                          value={this.state.servicecategory_id}
                          type="select"
                          onChange={(e) => this.onChangeAddName('servicecategory_id', e.target.value)}
                        >
                          <option value="">Category</option>
                          {this.props.subBusinesslisting.map((option) => (
                            
                            (option.category_type == "service")?<option value={option._id}>{option.category_name}</option>:''
                          ))}
                        </Input>
                        <span style={{ color: 'red' }}>{this.state.formErrservicecategory_id}</span>
                      </div>

                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Extra Service</label>
                        {/* <input type='text' id='input-first-name' className='form-control' placeholder='Extra Service' /> */}
                        <Input
                          value={this.state.extra_services}
                          type="select"
                          multiple="multiple"
                          onChange={(e) => this.onChangeAddName('extra_services', e.target.value)}
                        >
                          <option value="">Remove all Service</option>
                          {this.props.extraserviceList.map((option) => (
                            <option value={option._id}>{option.extraService}</option>
                          ))}
                        </Input>
                        <span style={{ color: 'red' }}>{this.state.formErrextra_services}</span>
                      </div>

                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>Service Duration Time</label>
                            <input type='number' id='input-first-name' className='form-control' placeholder='Time' value={this.state.duration} onChange={(e) => this.onChangeAddName('duration', e.target.value)} />
                            <span style={{ color: 'red' }}>{this.state.formErrduration}</span>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                            <Input
                              value={this.state.unit}
                              type="select"
                              onChange={(e) => this.onChangeAddName('unit', e.target.value)}
                            >
                              <option value="">Durarion</option>
                              <option value="minutes">Minutes</option>
                              <option value="hours">Hours</option>
                              <option value="days">Days</option>
                              <option value="seconds">Seconds</option>

                            </Input>
                            <span style={{ color: 'red' }}>{this.state.formErrunit}</span>
                          </div>
                        </div>
                      </div>
                      <div className='mt-2 mb-2'>
                        <button type='button' className='btn btn-warning btn-sm'
                          onClick={this.clickOnDelete}
                        >Remove</button>
                        <button type='button'
                          onClick={this.handleAddSlotClick}
                          className='btn btn-default btn-sm'>Add Size</button>
                      </div>
                      {
                        this.state.size_price_service.map((item, idx) => {
                          return <div className='row'>
                            <div className='form-group'>
                              <label className='form-control-label' for='input-first-name'>Size</label>
                              <input type='text' id='input-first-name' className='form-control' placeholder='Size'
                                onChange={(e) => this.onChangeSlot(item.index, 'size', e.target.value)}
                                value={item.size}
                              />
                            </div>
                            <div className='form-group'>
                              <label className='form-control-label' for='input-first-name'>Price</label>
                              <input type='number' id='input-first-name' className='form-control' placeholder='Price'
                                onChange={(e) => this.onChangeSlot(item.index, 'price', e.target.value)}
                                value={item.price}
                              />
                            </div>

                            <div className='row'>
                              <div className='col-lg-6'>
                                <div className='form-group'>
                                  <label className='form-control-label' for='input-first-name'>Service Duration Time</label>
                                  <input type='number' id='input-first-name' className='form-control' placeholder='Service Duration Time'
                                    onChange={(e) => this.onChangeSlot(item.index, 'duration', e.target.value)}
                                    value={item.duration}
                                  />
                                </div>
                              </div>
                              <div className='col-lg-6'>
                                <div className='form-group'>
                                  <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                                  <Input
                                    type="select"
                                    value={item.unit}
                                    onChange={(e) => this.onChangeSlot(item.index, 'unit', e.target.value)}
                                  >
                                    <option value="">Duration type</option>
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="days">Days</option>
                                    <option value="seconds">Seconds</option>

                                  </Input>
                                </div>
                              </div>
                            </div>
                          </div>
                        })}

                    </div>

                    <div className='col-lg-5'>
                      <div className='card-body'>
                        <label className='form-control-label'>Service Image</label>
                        <img src={this.state.service_image === '' ? '../assets/img/theme/img-1-1000x600.jpg' : this.state.file2} alt='Image placeholder' className='card-img-top' />
                        <span style={{ color: 'red' }}>{this.state.formErrservice_image}</span>
                        <div className='d-flex justify-content-between pt-8 pt-md-4 pb-0 pb-md-4'>
                          <Input
                            type="file"
                            // id="File-2"
                            className='btn btn-default float-right'
                            onChange={this.handleUploadFile}
                          >Upload</Input>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={() => this.close()}>Close</button>
                  <button type='button' className='btn btn-primary' onClick={(e) => this.handleSubmit()}>{this.state.service_id !== '' ? "Update" : "Save"}</button>
                </div>
              </div>
            </Modal>

            {/* Extra Product Modal */}
            <Modal
              isOpen={this.state.open2}
              toggle={() => this.close()}
            >
              <ModalHeader toggle={() => this.close()}>
                <Label for="title">Add Extra Product</Label>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <input type='text' id='input-first-name' className='form-control' placeholder='Extra Product Name'
                    value={this.state.extraProduct} onChange={(e) => this.onChangeAddName('extraProduct', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrextraProduct}</span>
                </FormGroup>
                {/* <FormGroup>
                  <input type='number' id='input-first-name' className='form-control' placeholder='Extra Product Price'
                    value={this.state.price_extraproduct} onChange={(e) => this.onChangeAddName('price_extraproduct', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrprice_extraproduct}</span>
                </FormGroup> */}
                <FormGroup>
                  <div className='form-control-label'>
                    <label className='custom-control-label'>Name is Multiselect</label>
                    <div className='custom-control custom-radio custom-control-inline'>
                      <input type='radio'
                        value="Yes"
                        checked={this.state.multi_selected === true}
                        onChange={(e) => this.onChangeAddName("multi_selected", true)}
                        id='customRadioInline1' name='customRadioInline1' className='custom-control-input' />
                      <label className='custom-control-label' for='customRadioInline1'>Yes</label>
                    </div>
                    <div className='custom-control custom-radio custom-control-inline'>
                      <input type='radio'
                        value="No"
                        checked={this.state.multi_selected === false}
                        onChange={(e) => this.onChangeAddName("multi_selected", false)}
                        id='customRadioInline2' name='customRadioInline1' className='custom-control-input' />
                      <label className='custom-control-label' for='customRadioInline2'>No</label>
                    </div>
                  </div>
                  <span style={{ color: 'red' }}>{this.state.formErrmulti_selected}</span>
                </FormGroup>
                <FormGroup>
                  {/* <div className='mt-2 mb-2'> */}
                  <button type='button' className='btn btn-warning btn-sm'
                    onClick={this.clickOnDelete}
                  >Remove</button>
                  <button type='button'
                    onClick={this.handleAddSlotClick}
                    className='btn btn-default btn-sm'>Add Size</button>
                  {/* </div> */}

                  {this.state.size_price.map((item, idx) => {
                    return <div className='row'>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Description</label>
                        <input type='text' id='input-first-name' className='form-control'
                          onChange={(e) => this.onChangeSlot(item.index, 'size', e.target.value)}
                          value={item.size}
                          placeholder='Description' />
                      </div>
                      <div className='form-group'>
                        <label className='form-control-label' for='input-first-name'>Price</label>
                        <input type='number' id='input-first-name' className='form-control'
                          value={item.price}
                          onChange={(e) => this.onChangeSlot(item.index, 'price', e.target.value)}
                          placeholder='Price' />
                      </div>
                    </div>
                  })}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="raised" className="btn-default text-white mr-10"
                  onClick={(e) => this.handleSubmit()}
                >
                  {this.state.extra_product_id !== '' ? "Update" : "Save"}
                </Button>
                <Button variant="raised" onClick={() => this.close()} className="btn-danger text-white mr-10">Cancel</Button>
              </ModalFooter>
            </Modal>

            {/* Extra Service Modal */}
            <Modal
              isOpen={this.state.open3}
              toggle={() => this.close()}
            >
              <ModalHeader toggle={() => this.close()}>
                <Label for="title">Add Extra Service</Label>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label className='form-control-label' for='input-first-name'>Extra Service Name</label>
                  <input type='text' id='input-first-name' className='form-control' placeholder='Service Name'
                    value={this.state.extraService} onChange={(e) => this.onChangeAddName('extraService', e.target.value)}
                  />
                  <span style={{ color: 'red' }}>{this.state.formErrextraService}</span>
                </FormGroup>
                <FormGroup>
                  <div className='form-control-label'>
                    <label className='custom-control-label'>Name is Multiselect</label>
                    <div className='custom-control custom-radio custom-control-inline'>
                      <input type='radio'
                        value="Yes"
                        checked={this.state.multi_selected_extra_service === true}
                        onChange={(e) => this.onChangeAddName("multi_selected_extra_service", true)}
                        id='customRadioInline1' name='customRadioInline1' className='custom-control-input' />
                      <label className='custom-control-label' for='customRadioInline1'>Yes</label>
                    </div>
                    <div className='custom-control custom-radio custom-control-inline'>
                      <input type='radio'
                        value="No"
                        checked={this.state.multi_selected_extra_service === false}
                        onChange={(e) => this.onChangeAddName("multi_selected_extra_service", false)}
                        id='customRadioInline2' name='customRadioInline1' className='custom-control-input' />
                      <label className='custom-control-label' for='customRadioInline2'>No</label>
                    </div>
                  </div>
                  <span style={{ color: 'red' }}>{this.state.formErrmulti_selected_extra_service}</span>
                </FormGroup>
                <FormGroup>
                  <div className='mt-2 mb-2'>
                    <button type='button' className='btn btn-warning btn-sm'
                      onClick={this.clickOnDelete}
                    >Remove</button>
                    <button type='button'
                      onClick={this.handleAddSlotClick}
                      className='btn btn-default btn-sm'>Add Size</button>
                  </div>
                  {this.state.size_price_duration.map((item, idx) => {
                    return <div className='row'>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label className='form-control-label' for='input-first-name'>Description</label>
                          <input type='text' id='input-first-name' className='form-control'
                            onChange={(e) => this.onChangeSlot(item.index, 'size', e.target.value)}
                            value={item.size}
                            placeholder='Description' />
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label className='form-control-label' for='input-first-name'>Price</label>
                          <input type='number' id='input-first-name' className='form-control'
                            value={item.price}
                            onChange={(e) => this.onChangeSlot(item.index, 'price', e.target.value)}
                            placeholder='Price' />
                        </div>
                      </div>

                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label className='form-control-label' for='input-first-name'>Service Duration</label>
                          <input type='number' id='input-first-name' className='form-control'
                            value={item.duration}
                            onChange={(e) => this.onChangeSlot(item.index, 'duration', e.target.value)}
                            placeholder='Duration' />
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label className='form-control-label' for='input-first-name'>&nbsp;</label>
                          <Input
                                    type="select"
                                    value={item.unit}
                                    onChange={(e) => this.onChangeSlot(item.index, 'unit', e.target.value)}
                                  >
                                    <option value="">Duration type</option>
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="days">Days</option>
                                    <option value="seconds">Seconds</option>
                            </Input>
                          <span style={{ color: 'red' }}>{this.state.formErrcategory_type}</span>
                        </div>
                      </div>
                    </div>
                  })}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="raised" className="btn-default text-white mr-10"
                  onClick={(e) => this.handleSubmit()}
                >
                  {this.state.extra_service_id !== '' ? "Update" : "Save"}
                </Button>
                <Button variant="raised" onClick={() => this.close()} className="btn-danger text-white mr-10">Cancel</Button>
              </ModalFooter>
            </Modal>

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
    subBusinesslisting: state.subBusiness.subBusinesslisting,
    extraproductList: state.subBusiness.extraproductList,
    extraserviceList: state.subBusiness.extraserviceList,
    productList: state.subBusiness.productList,
    serviceList: state.subBusiness.serviceList,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchsubBusiness: (data) => dispatch(actions.fetchsubBusinessListAction(data)),
    addBusinessCategoryAction: (data) => dispatch(actions.addBusinessCategory(data)),
    editBusinessCategoryAction: (data) => dispatch(actions.editBusinessCategory(data)),
    deleteBusinessCategoryAction: (data) => dispatch(actions.deleteBusinessCategory(data)),
    fetchgetextraproductList: (data) => dispatch(actions.fetchgetextraproductListAction(data)),
    addBusinessExtraProductAction: (data) => dispatch(actions.addBusinessExtraProduct(data)),
    editBusinessExtraProductAction: (data) => dispatch(actions.editBusinessExtraProduct(data)),
    deleteBusinessExtraProductAction: (data) => dispatch(actions.deleteBusinessExtraProduct(data)),
    fetchgetextraserviceList: (data) => dispatch(actions.fetchgetextraserviceListAction(data)),
    addExtraServiceAction: (data) => dispatch(actions.addExtraService(data)),
    editExtraServiceAction: (data) => dispatch(actions.editExtraService(data)),
    deleteExtraServiceAction: (data) => dispatch(actions.deleteExtraService(data)),
    fetchgetproductAction: (data) => dispatch(actions.fetchgetproduct(data)),

    addProductAction: (data, data2,extra_products) => dispatch(actions.addProduct(data, data2,extra_products)),
    editProductAction: (data, product_id, data2,extra_products) => dispatch(actions.editProduct(data, product_id, data2,extra_products)),
    deleteProductAction: (data, data2) => dispatch(actions.deleteProduct(data, data2)),
    editProductImageAction: (data, data2) => dispatch(actions.editProductImage(data, data2)),

    fetchgetServiceAction: (data) => dispatch(actions.fetchgetService(data)),
    addServiceAction: (data, data2,extra_service) => dispatch(actions.addService(data, data2,extra_service)),
    deleteServiceAction: (data, data2) => dispatch(actions.deleteService(data, data2)),

    editServiceAction: (data, service_id, data2) => dispatch(actions.editService(data, service_id, data2)),
    editServiceImageAction: (data, data2) => dispatch(actions.editServiceImage(data, data2)),

    addServiceExtraServiceAction: (data) => dispatch(actions.addServiceExtraService(data)),
    addProductExtraProductAction: (data, data2) => dispatch(actions.addProductExtraProduct(data, data2)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(BusinessDetail));