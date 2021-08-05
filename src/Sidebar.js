import React ,  { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Sidebar extends Component  {
  render(){
    const userToken = JSON.parse(localStorage.getItem('userInfo'))
    let data = {}
    let authRedirect = null
    if (!userToken) { 
      authRedirect = <Redirect from="./Dashboard" to= "/"/>
    }
    else{
      data = userToken.capabilities
    }
    return(
      <nav className='sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white' id='sidenav-main'>
      <div className='scrollbar-inner'>
        <div className='sidenav-header  align-items-center'>
          <a className='navbar-brand' href='javascript:void(0)'>
            <img src='../assets/img/logo.png' className='navbar-brand-img' alt='...' />
          </a>
        </div>
        <div className='navbar-inner'>
          <div className='collapse navbar-collapse' id='sidenav-collapse-main'>
            <ul className='navbar-nav'>
            {data !== null && data.delivery === true?
              <li className='nav-item'>
                <Link className='nav-link active' to='/delivery'>
                  <i className='ni ni-app text-primary' />
                  <span className='nav-link-text'>Delivery</span>
                </Link>
              </li>:''}
              {data !== null && data.ride_share === true?
              <li className='nav-item'>
                <Link className='nav-link active' to='/delivery'>
                  <i className='ni ni-app text-primary' />
                  <span className='nav-link-text'>Ride Share</span>
                </Link>
              </li>:''}
              {/* <li className='nav-item'>
                <Link className='nav-link' to='/rideShare'>
                  <i className='ni ni-hat-3 text-primary' />
                  <span className='nav-link-text'>Ride share</span>
                </Link>
              </li> */}
              {data !== null && data.schedule === true?
              <li className='nav-item'>
                <Link className='nav-link' to='/schedule'>
                  <i className='ni ni-briefcase-24 text-primary' />
                  <span className='nav-link-text'>Schedule</span>
                </Link>
              </li>:''}
              {data !== null && data.report === true?
              <li className='nav-item'>
                <Link className='nav-link' to='/reportsprofessional'>
                  <i className='ni ni-archive-2 text-primary' />
                  <span className='nav-link-text'>Report</span>
                </Link>
              </li>:''}
              {data !== null && data.happy_hour_discount === true?
              <li className='nav-item'>
                <Link className='nav-link' to='/happyHourDiscount'>
                  <i className='ni ni-tv-2 text-primary' />
                  <span className='nav-link-text'>Happy hour discount</span>
                </Link>
              </li>:''}
              {data !== null && data.category_product_service === true?
              <li className='nav-item'>
                <Link className='nav-link' to='/items'>
                  <i className='ni ni-single-02 text-primary' />
                  <span className='nav-link-text'>Category, Product and service</span>
                </Link>
              </li>:''}
              
              <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  <i className='ni ni-box-2 text-primary' />
                  <span className='nav-link-text'>Profile</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Button className='nav-link' onClick={() => this.props.onLogout()}>Logout</Button>
                {/* <Link className='nav-link' to='/orderdetails'>
                  <i className='ni ni-box-2 text-primary' />
                  <span className='nav-link-text'>Logout</span>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
  }
}
  
const mapStateToProps = (state) => {
  return {
    dashboardStats: state.auth.dashboardStats,
    listingunread: state.auth.listingunread,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
