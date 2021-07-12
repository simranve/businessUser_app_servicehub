import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import Login from './Login'
import Verification from './Verification'

import Master from './Master'
import BusinessDetails from './BusinessDetails'

export default function App () {
  return (
    <Router>
      <SnackbarProvider>
        <div>
          <Switch>
            <Route path='/dashboard'> <Master /></Route>
            <Route path='/items'> <BusinessDetails /></Route>
            <Route path='/verification'> <Verification /></Route>
            <Route path='/'><Login /></Route>
          </Switch>
        </div>
      </SnackbarProvider>
    </Router>
  )
}
