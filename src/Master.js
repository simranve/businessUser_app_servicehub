import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import BusinessDetails from './BusinessDetails'
import RideShare from './rideShare'
import Schedule from './schedule'
import Profile from './profile'
import ReportCustomer from './ReportCustomer'
import HappyHourDiscount from './happyHourDiscount'
import OrdersDetails from './OrdersDetails'
import OrdersDetailsRideShare from './OrdersDetailsRideShare'
import ReportsProfessional from './ReportsProfessional'
import AddProfessionals from './AddProfessionals'

export default function Master () {
  return (
    <Router>
      <Sidebar />
      <div class='main-content' id='panel'>
        <Header />
        <Switch>
          <Route path='/items'><BusinessDetails /></Route>
          <Route path='/rideShare'><RideShare /></Route>
          <Route path='/profile'><Profile /></Route>
          <Route path='/ReportCustomer/:id' render={(props) => <ReportCustomer {...props} />}></Route>
          <Route path='/happyHourDiscount'><HappyHourDiscount /></Route>
          <Route path='/getorderdetails/:id' render={(props) => <OrdersDetails {...props} />}></Route>
          <Route path='/reportsprofessional' render={(props) => <ReportsProfessional {...props} />}></Route>
          <Route path='/editprofessional/:id' render={(props) => <AddProfessionals {...props} />} />
          <Route path='/addprofessionals'> <AddProfessionals /></Route>
          
          <Route path='/getorderdetailsRideShareDelivery/:id' render={(props) => <OrdersDetailsRideShare {...props} />}></Route>
          <Route path='/schedule'><Schedule /></Route>
          <Route path='/'><Dashboard /></Route>

        </Switch>
      </div>

    </Router>
  )
}
