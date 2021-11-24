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

class ReportsProfessional extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start_date:'',
      end_date:'',
      business_id:'',
    }
  }
  componentDidMount = async () => {
    let business_id = await localStorage.getItem('userId');
    if (business_id) {
      await this.setState({
        business_id: business_id,
      });
      await this.props.fetchReportProfessionalList(business_id);
      const getData = await this.props.data_bussiness;
      this.props.fetchReportProfessionalList(business_id);
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
    let ReportTable = <Spinner />;
    
    {this.props.professionalReportList.length > 0?
      this.props.professionalReportList.map(datas=>{
         orderList.push(
            {
          
              s_no:(sno++),
              BusinessName:datas._id.professional_id[0].name,
              promocode_Discount:datas.promocode_Discount,
              gross_total:datas.gross_total,
              total_service_charge:datas.total_service_charge,
              item_total:datas.item_total,
              total_services: datas.total_services,
              total_service_charge: datas.total_service_charge,
              item_total: datas.item_total,
              promocode_Discount: datas.promocode_Discount,
              happy_hour_discount: datas.happy_hour_discount,
              product_tax: datas.product_tax,
              service_tax: datas.service_tax,
              overall_product_service:datas.product_tax+datas.service_tax,
              tip: datas.tip,
              gross_total: datas.gross_total,
              total_service_fees: datas.total_service_fees,
              total_processing_fees: datas.total_processing_fees,
              product_count: datas.product_count,
              service_count: datas.service_count,
              extra_product_count: datas.extra_product_count,
              extra_service_count: datas.extra_service_count,
              overall:datas.total_service_charge+datas.item_total,
              bussiness_owner_money:datas.bussiness_owner_money,
              action:
              <div>
                <NavLink className='btn btn-icon btn-default' 
                  to={'/ReportCustomer/'+datas._id.professional_id[0]._id} 
                >
                  <span className='btn-inner--icon'><i className='fas fa-pencil-alt' /></span>
                </NavLink>
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
              label: "Total customers",
              field: "BusinessName",
              sort: "asc",
            },
            
            {
              label: "professional name",
              field: "BusinessName",
              sort: "asc",
            },
            
            {
              label: "overall total service",
              field: "total_service_charge",
              sort: "asc",
            },
            
            {
              label: "overall product and service",
              field: "overall",
              sort: "asc",
            },
            
            {
              label: "total promo code discount",
              field: "promocode_Discount",
              sort: "asc",
            },
            
            {
              label: "total happy hour discount",
              field: "happy_hour_discount",
              sort: "asc",
            },
            
            {
              label: "overall total item",
              field: "item_total",
              sort: "asc",
            },
            
            {
              label: "total waiting time",
              field: "waiting_time",
              sort: "asc",
            },
            
            {
              label: "total service tax and product tax",
              field: "overall_product_service",
              sort: "asc",
            },
            
            {
              label: "total tip",
              field: "tip",
              sort: "asc",
            },
            
            {
              label: "overall gross total",
              field: "gross_total",
              sort: "asc",
            },
            
            {
              label: "total service hub connect fees",
              field: "servicehubConnetFees",
              sort: "asc",
            },
            {
              label: "total business owner money",
              field: "bussiness_owner_money",
              sort: "asc",
            },
            // {
            //   label: "total service fees",
            //   field: "total_service_fees",
            //   sort: "asc",
            // },
            
            // {
            //   label: "total processing fees",
            //   field: "total_processing_fees",
            //   sort: "asc",
            // },
            
            // {
            //   label: "total cancellation charge",
            //   field: "total_cancellation_fees",
            //   sort: "asc",
            // },
            // {
            //   label: "service charge",
            //   field: "total_service_charge",
            //   sort: "asc",
            // },
            {
              label: "Action",
              field: "action",
              sort: "asc",
            },
            
          ],
          rows: orderList,
        };
    
        ReportTable = (
          <MDBDataTable striped bordered hover entries={10} data={data} />
        );
  

  return (
    <div>
      <div className='header bg-primary pb-6'>
        <div className='container-fluid'>
          <div className='header-body'>
            <div className='row align-items-center py-4'>
              <div className='col-lg-6 col-7'>
                <h6 className='h2 text-white d-inline-block mb-0'>Report for Business</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid mt--6'>
        <div className='row'>
          <div className='col'>
            <div className='card'>
              <div className='card-header border-0'>
                <div className='row align-items-center py-4'>
                  <div className='col-lg-3'>
                    <select className='form-control' id='exampleFormControlSelect1'>
                      <option>All Countries</option>
                      <option>Deactive</option>
                      <option>All</option>
                    </select>
                  </div>
                  <div className='col-lg-3'>
                    <div className='row'>
                      <div className='col form-inline'>
                        <div className='form-group'>
                          <label className='form-control-label mr-2' for='from'>From</label>
                          <input type='date' id='from' className='form-control'/>
                        </div>
                      </div>
                      <div className='col form-inline'>
                        <div className='form-group'>
                          <label className='form-control-label mr-2' for='to'>To Date</label>
                          <input type='date' id='to' className='form-control' 
                              onChange={(e) => this.onChangeAddName('mobile_no', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table align-items-center table-flush'>
                  {ReportTable}  
                </table>
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
    professionalReportList: state.report.professionalReportList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReportProfessionalList: (id) => dispatch(actions.fetchReportProfessionalListAction(id)),
    // updateOrderList: (orderId,data) => dispatch(actions.updateOrderListAction(orderId,data)),
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(ReportsProfessional));
