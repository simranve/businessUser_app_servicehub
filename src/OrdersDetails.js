import React from 'react'
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
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";

class OrdersDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      order_id:'',
      customerName:'',
      customerPhone:'',
      customerEmail:'',
      professionalName:'',
      professionalPhone:'',
      professionalEmail:'',
      total_service_charge:'',
      item_total:'',
      happy_hour_discount:'',
      promocode_Discount:'',
      product_tax:'',
      service_tax:'',
      processing_fee:'',
      service_fee:'',
      tip_Ammount:'',
      total_Ammount:'',
      service:[],
      product:[],
      extra_service:[],
      extra_product:[]
    }
    this.updateState = this.updateState.bind(this);
  }
  async updateState(data) {
    setTimeout(async () => {
      console.log('Our data is fetched');
      await this.setState(data)
    }, 1000)
  }
  
  componentDidMount = async () => {
    console.log(this.props,"match data_order");
    let order_id = await this.props.match.params.id;

    if (order_id) {
      console.log(order_id);
      await this.setState({
        order_id: order_id,
        // category_name:this.props.match.params.name
      });
      await this.props.orderDetailsAction(order_id);
      const getData = await this.props.data_order;
      console.log(getData)
      this.props.orderDetailsAction(order_id);
      if(getData){
        
        await this.updateState(
          {
            customerName:(getData.user_id && getData.user_id.length > 0)?getData.user_id[0].name:'',
            customerPhone:(getData.user_id && getData.user_id.length > 0)?getData.user_id[0].country_code+" "+getData.user_id[0].mobile_no:'',
            customerEmail : (getData.user_id && getData.user_id.length > 0)?getData.user_id[0].email:'',
            professionalName:(getData.professional_id && getData.professional_id.length > 0)?getData.professional_id[0].name:'',
            professionalPhone:(getData.professional_id && getData.professional_id.length > 0)?getData.user_id[0].country_code+" "+getData.professional_id[0].mobile_no:'',
            professionalEmail:(getData.professional_id && getData.professional_id.length > 0)?getData.professional_id[0].email:'',
            total_service_charge:(getData.rideShare_delivery_Details)?getData.rideShare_delivery_Details.total_service_charge:0,
            item_total:getData.item_total,
            happy_hour_discount:getData.happy_hour_discount,
            promocode_Discount:getData.promocode_Discount,
            product_tax:getData.product_tax,
            service_tax:getData.service_tax,
            processing_fee:getData.processing_fee,
            service_fee:getData.service_fee,
            tip_Ammount:getData.tip_Ammount,
            total_Ammount:getData.total_Ammount,
            service:getData.service_array,
            product:getData.product_array,
            extra_service:getData.extra_service_array,
            extra_product:getData.extra_product_array,
          }
        );
        await this.setState({
          product:getData.product_array,
        })
      }
      console.log(this.state.product);
    }
  };
  render(){
    
    let business_id = this.props.match.params.id;
    let getData = this.props.data_order;
    
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Orders Detail</h6>
                </div>
              </div>
  
            </div>
          </div>
        </div>
  
        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-6'>
                      <h4 className='mb-0'>Customer Detail</h4>
                      <div className='row'>
                        <div className='col-4'>Name</div>
                        <div className='col-8'>{this.state.customerName}</div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>Phone</div>
                        <div className='col-8'>{this.state.customerPhone}</div>
                      </div>
                      <div className='row mb-4'>
                        <div className='col-4'>Email</div>
                        <div className='col-8'>{this.state.customerEmail}</div>
                      </div>
                    </div>
  
                    <div className='col-6'>
                      <h4 className='mb-0'>Professional Detail</h4>
                      <div className='row'>
                        <div className='col-4'>Name</div>
                        <div className='col-8'>{this.state.professionalName}</div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>Phone</div>
                        <div className='col-8'>{this.state.professionalPhone}</div>
                      </div>
                      <div className='row mb-4'>
                        <div className='col-4'>Email</div>
                        <div className='col-8'>{this.state.professionalEmail}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className='row mt-5'>
                    <div className='col-7'>
                      <div className='table-responsive'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th className='text-center' width='10%'>Product name</th>
                              <th className='text-center' width='10%'>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.product?this.state.product.map(data=>{
                                // console.log(data)
                                return(<tr>
                                <td>
                                  <span className='text-inverse'>{data._id}</span>
                                </td>
                                <td className='text-center'>{data.product_name}</td>
                                <td className='text-center'>{data.price}</td>
                              </tr>)
                              
                            }):<tr>
                            <td>
                              <span className='text-inverse'></span>
                            </td>
                            <td className='text-center'></td>
                            <td className='text-center'></td>
                          </tr>}
                              
                          </tbody>
                        </table>
  
                        <table className='table mt-5'>
                          <thead>
                            <tr>
                              <th>Service</th>
                              <th className='text-center' width='10%'>Service Name</th>
                              <th className='text-center' width='10%'>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.service ?this.state.service.map(data=>{
                                // console.log(data)
                                return(<tr>
                                <td>
                                  <span className='text-inverse'>{data._id}</span>
                                </td>
                                <td className='text-center'>{data.service_name}</td>
                                <td className='text-center'>{data.price}</td>
                              </tr>)
                              
                            }):<tr>
                            <td>
                              <span className='text-inverse'></span>
                            </td>
                            <td className='text-center'></td>
                            <td className='text-center'></td>
                          </tr>}
                          </tbody>
                        </table>

                        <table className='table mt-5'>
                          <thead>
                            <tr>
                              <th>Extra Service</th>
                              <th className='text-center' width='10%'>Service Name</th>
                              <th className='text-center' width='10%'>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                          {/* extra_service:getData.extra_service_array,
            extra_product:getData.extra_product_array, */}
                          {this.state.extra_service ?this.state.extra_service.map(data=>{
                                // console.log(data)
                                return(<tr>
                                <td>
                                  <span className='text-inverse'>{data._id}</span>
                                </td>
                                <td className='text-center'>{data.extraService}</td>
                                <td className='text-center'>{data.price}</td>
                              </tr>)
                              
                            }):<tr>
                            <td>
                              <span className='text-inverse'></span>
                            </td>
                            <td className='text-center'></td>
                            <td className='text-center'></td>
                          </tr>}
                          </tbody>
                        </table>

                        <table className='table mt-5'>
                          <thead>
                            <tr>
                              <th>Extra Product</th>
                              <th className='text-center' width='10%'>Service Name</th>
                              <th className='text-center' width='10%'>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.extra_product ? this.state.extra_product.map(data=>{
                                // console.log(data)
                                return(<tr>
                                <td>
                                  <span className='text-inverse'>{data._id}</span>
                                </td>
                                <td className='text-center'>{data.extraProduct}</td>
                                <td className='text-center'>{data.price}</td>
                              </tr>)
                              
                            }):
                            <tr>
                              <td>
                                <span className='text-inverse'></span>
                              </td>
                              <td className='text-center'></td>
                              <td className='text-center'></td>
                            </tr>
                            
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
  
                    <div className='col-5'>
                      <div className='table-responsive'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th colSpan='2'>Service</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Service Total</th>
                              <td className='text-center'>$ {this.state.total_service_charge ?this.state.total_service_charge:0}</td>
                            </tr>
                            <tr>
                              <th>Product Total</th>
                              <td className='text-center'>$ {this.state.item_total ?this.state.item_total:0}</td>
                            </tr>
                            <tr>
                              <th>Happy Hours Discount</th>
                              <td className='text-center'>$ {this.state.happy_hour_discount?this.state.happy_hour_discount:0}</td>
                            </tr>
                            <tr>
                              <th>Promo Discount</th>
                              <td className='text-center'>$ {this.state.promocode_Discount?this.state.promocode_Discount:0}</td>
                            </tr>
                            <tr>
                              <th>Product Tax</th>
                              <td className='text-center'>$ {this.state.product_tax?this.state.product_tax:0}</td>
                            </tr>
                            <tr>
                              <th>Service Tax</th>
                              <td className='text-center'>$ {this.state.service_tax?this.state.service_tax:0}</td>
                            </tr>
                            <tr>
                              <th>Processing Fee</th>
                              <td className='text-center'>$ {this.state.processing_fee?this.state.processing_fee:0}</td>
                            </tr>
                            <tr>
                              <th>Service Fee</th>
                              <td className='text-center'>$ {this.state.service_fee?this.state.service_fee:0}</td>
                            </tr>
                            <tr>
                              <th>Tip</th>
                              <td className='text-center'>$ {this.state.tip_Ammount?this.state.tip_Ammount:0}</td>
                            </tr>
                            <tr>
                              <th>Total Charge</th>
                              <td className='text-center'>$ {this.state.total_Ammount?this.state.total_Ammount:0}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
  
                  <hr />
  
                  <div className='row'>
                    <div className='col-6'>
                      <h4 className='mb-0'>Rating & Comments by Professional Service</h4>
                      <div className='row'>
                        <div className='col-4'>Rating :</div>
                        <div className='col-8'>&nbsp;</div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>Comment :</div>
                        <div className='col-8'>&nbsp;</div>
                      </div>
                    </div>
  
                    <div className='col-6'>
                      <h4 className='mb-0'>Rating & Comments by Customer</h4>
                      <div className='row'>
                        <div className='col-4'>Rating :</div>
                        <div className='col-8'>&nbsp;</div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>Comment :</div>
                        <div className='col-8'>&nbsp;</div>
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
    )
  }
  
}
const mapPropsToState = (state) => {
  return {
    success: state.order.success,
    error: state.order.error,
    orderListing: state.order.orderListing,
    data_order: state.order.data_order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderDetailsAction: (orderId) => dispatch(actions.orderDetails(orderId)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(OrdersDetail));
