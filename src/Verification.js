import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

class Home extends React.Component {
  render () {
    return (
      <div className='main-content'>
        <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9' />
        <div className='container mt--8 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-5 col-md-7'>
              <div className='card bg-secondary border-0 mb-0'>
                <div className='card-header bg-transparent text-center'>
                  <img src='../assets/img/logo.png' style={{ height: 65 }} />
                </div>
                <div className='card-body px-lg-5 py-lg-5'>
                  <div className='text-center text-muted mb-4'>
                    <small>Verification</small>
                  </div>
                  <form role='form'>
                    <div className='form-group mb-3'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'><i className='ni ni-email-83' /></span>
                        </div>
                        <input className='form-control' placeholder='Enter Verification Code' type='text' />
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-12 text-right'>
                        <a href='#' className='text-muted'><small>Resend Code</small></a>
                      </div>
                    </div>

                    <div className='text-center'>
                      <Link to='/dashboard'><button type='button' className='btn btn-primary my-4'>Verify</button></Link>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
