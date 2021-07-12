import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  NavLink
} from 'react-router-dom'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";

class ReportCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start_date:'',
      end_date:'',
      professional_id:'',
    }
  }
  componentDidMount = async () => {
    let professional_id = await localStorage.getItem('userId');
    if (professional_id) {
      await this.setState({
        professional_id: professional_id,
      });
      await this.props.fetchReportCustomerList(professional_id);
      const getData = await this.props.data_bussiness;
      this.props.fetchReportCustomerList(professional_id);
    }
  };
  changeActiveStatus(id,data) {
    if(id){
      this.props.updateOrderList(id,data);
    }
  }
  render(){

    var sno = 1

    let orderList = [];
    let orderTable = <Spinner />;
    
    {this.props.customerListing.length > 0?
      this.props.customerListing.map(datas=>{
        
          orderList.push(
            {
          
              s_no:(sno++),
              OrderId:datas._id,
              service_start_time:datas.service_start_time,
              service_end_time:datas.service_end_time,  
              CustomerName:datas.user_id[0].name,
              bussinessName:datas.bussiness_id[0].name,
              CustomerPhone:datas.user_id[0].country_code+datas.user_id[0].mobile_no,
              ProfessionalName:datas.professional_id[0].name,
              ProfessionalPhone:datas.user_id[0].country_code+datas.user_id[0].mobile_no,
              BusinessName:datas.bussiness_id[0].name,
              Date:datas.createdAt,
              SlotTime:datas._id,
              GrandTotal:datas.total_Ammount,
              PaymentMethod:datas.payment_method,
              OrderStatus:datas.status,
              order_type:datas.order_type,
              total_service_charge:datas.total_service_charge,
              item_total:datas.item_total,
              total_product_service:datas.total_service_charge+datas.item_total,
              waiting_time:datas.waiting_time,
              promocode_Discount:datas.promocode_Discount,
              happy_hour_discount:datas.happy_hour_discount,
              total_item:datas.product.length,
              product_tax:datas.product_tax,
              service_tax:datas.service_tax,
              service_fee:datas.service_fee,
              tip_Ammount:datas.tip_Ammount,
              processing_fee:datas.processing_fee,
              action:<div>
                {datas.order_type === 'productAndService'?<NavLink className='btn btn-icon btn-default' to={'/getorderdetails/'+datas._id} >
                  <span className='btn-inner--icon'><i className='fas fa-pencil-alt' /></span>
                </NavLink>:<NavLink className='btn btn-icon btn-default' to={'/getorderdetailsRideShareDelivery/'+datas._id} >
                  <span className='btn-inner--icon'><i className='fas fa-pencil-alt' /></span>
                </NavLink>}
              
              {/* <button type='button' className='btn btn-success' data-toggle='tooltip' data-placement='top' title='Accept'
              onClick={(id) =>this.changeActiveStatus(datas._id,{status:'accept'})}
              >
              <span className='btn-inner--icon'><i className='fas fa-check' /></span>
              </button>
              <button type='button' className='btn btn-danger' data-toggle='tooltip' data-placement='top' title='Reject'
              onClick={(id) =>this.changeActiveStatus(datas._id,{status:'reject'})}
              >
                <span className='btn-inner--icon'><i className='fas fa-ban' /></span>
              </button> */}
              
            </div>
          
            }
          )
      })
      
      :orderList.push(
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
                label: "Service Id",
                field: "OrderId",
                sort: "asc",
              },
              {
                label: "Customer Name",
                field: "CustomerName",
                sort: "asc",
              },
              
              {
                label: "Total Service",
                field: "total_service_charge",
                sort: "asc",
              },
              
              {
                label: "Promo code discount",
                field: "promocode_Discount",
                sort: "asc",
              },
              {
                label: "Item Total",
                field: "item_total",
                sort: "asc",
              },
              {
                label: "Tip",
                field: "tip_Ammount",
                sort: "asc",
              },
              {
                label: "Gross Total",
                field: "GrandTotal",
                sort: "asc",
              },
              
              {
                label: "SHC",
                field: "promocode_Discount",
                sort: "asc",
              },
              
              {
                label: "bom",
                field: "promocode_Discount",
                sort: "asc",
              },
              
              {
                label: "service status",
                field: "OrderStatus",
                sort: "asc",
              },
              
              {
                label: "Action",
                field: "action",
                sort: "asc",
              },
          ],
          rows: orderList,
        };
    
        orderTable = (
          <MDBDataTable striped bordered hover entries={10} data={data} />
        );
  
  return (
    <div>
      <div className='header bg-primary pb-6'>
        <div className='container-fluid'>
          <div className='header-body'>
            <div className='row align-items-center py-4'>
              <div className='col-lg-6 col-7'>
                <h6 className='h2 text-white d-inline-block mb-0'>Report Customer</h6>
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
                <div className='row align-items-center'>
                  <div className='col-lg-3'>
                    <div className='row'>
                      <div className='col form-inline'>
                        <div className='form-group'>
                          <label className='form-control-label mr-2' for='from'>From</label>
                          <input type='date' id='from' className='form-control' />
                        </div>
                      </div>
                      <div className='col form-inline'>
                        <div className='form-group'>
                          <label className='form-control-label mr-2' for='to'>To Date</label>
                          <input type='date' id='to' className='form-control' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-2'>
                    <select className='form-control' id='exampleFormControlSelect1'>
                      <option>All Countries</option>
                      <option>Deactive</option>
                      <option>All</option>
                    </select>
                  </div>
                  <div className='col-lg-2'>
                    <select className='form-control' id='exampleFormControlSelect1'>
                      <option>All Cities</option>
                      <option>Deactive</option>
                      <option>All</option>
                    </select>
                  </div>
                  <div className='col-lg-2'>
                    <select className='form-control' id='exampleFormControlSelect1'>
                      <option>All Order Status</option>
                      <option>Deactive</option>
                      <option>All</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='card-body'>

                <div className='table-responsive'>
                  <table className='table align-items-center table-flush'>
                    {orderTable}
                  </table>
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
    success: state.report.success,
    error: state.report.error,
    customerListing: state.report.customerListing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReportCustomerList: (id) => dispatch(actions.fetchReportCustomerListAction(id)),
    // updateOrderList: (orderId,data) => dispatch(actions.updateOrderListAction(orderId,data)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(ReportCustomer));
