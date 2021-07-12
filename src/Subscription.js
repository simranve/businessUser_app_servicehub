import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { 
  Button , 
  Modal ,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
	Label,
	Input,
} from 'reactstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from "./Spinner/Spinner";
import { MDBDataTable } from "mdbreact";
import * as actions from './store/actions/index'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'

class Subscription extends React.Component {
  constructor(props){
    super(props)
    this.state={
      name : '',
      open:false,
      formErrname:'',
      plan_day:'',
      formErrplan_day:'',
      description:'',
      formErrdescription:'',
      cost:'',
      formErrcost:'',
      currency:'',
      formErrcurrency:'',
      subscriptionId:'',
      openDialgue:false,
    }
  }
  open() {
    this.setState({ open: true });
  }
  componentWillMount () {
    this.props.fetchSubscriptionList()
    console.log(this.props.subscriptionlisting)
  }
  async close() {
    await this.setState({ 
      name : '',
      open:false,
      formErrname:'',
      plan_day:'',
      formErrplan_day:'',
      description:'',
      formErrdescription:'',
      cost:'',
      formErrcost:'',
      currency:'',
      formErrcurrency:'',
      subscriptionId:'',
    });
    console.log(this.state.open) 
  }
  handleSubmit = async()=>{

    await this.setState({
      formErrname: (this.state.name === '') ? "Please provide this field" : '',
      formErrplan_day: (this.state.plan_day == '') ? "Please provide this field" : '',
      formErrdescription: (this.state.description == '') ? "Please provide this field" : '',
      formErrcost: (this.state.cost == '') ? "Please provide this field" : '',
      formErrcurrency:(this.state.currency == '') ? "Please provide this field" : '',
    })
    if (!((this.state.name === '') && (this.state.plan_day === '') && (this.state.description == '') && (this.state.cost == '') && (this.state.currency == ''))) {
      if(this.state.subscriptionId === ''){
        this.props.addSubscriptionAction({
          name:this.state.name,
          plan_day:this.state.plan_day,
          description:this.state.description,
          cost:this.state.cost,
          currency:this.state.currency,
        })
      }
      else{
        this.props.editSubscriptionAction(this.state.subscriptionId,{
          name:this.state.name,
          plan_day:this.state.plan_day,
          description:this.state.description,
          cost:this.state.cost,
          currency:this.state.currency,
        })
      }
    }
    this.close()
    
  }
  closeDialgue() {
    this.setState({ openDialgue: false,subscriptionId:'' });
  }
  onChangeAddName= async (key,value)=>{
    var self=this;
    await self.setState({
      [key]: value
    })
    if(value){
      await this.setState({
        formErr:""
      })
    }
  }
  handleOpenDelete = (id) => {
    
		if(id) {

      this.setState({ 
        subscriptionId : id,
        openDialgue:true 
      });
		}
	
	}
  deleteUserPermanently() {
		if(this.state.subscriptionId) {
			this.props.deleteSubscriptionAction(this.state.subscriptionId);
      this.closeDialgue()
      this.setState({ subscriptionId: '' });
		}
  }
  handleOpen = async (data) => {
    console.log(data)
    await this.setState({
      name:data.name,
      plan_day:data.plan_day,
      description:data.description,
      cost:data.cost,
      currency:data.currency,
      open:data.open,
      subscriptionId:data.subscriptionId
    })
  }
  render(){
    const { open } = this.state;
    var sno = 1
    let subscriptionList = [];
    let subscriptionTable = <Spinner />;
    {this.props.subscriptionlisting.length > 0
      ? this.props.subscriptionlisting.map(datas => {
        subscriptionList.push(
          {

            s_no:(sno++),
            name:datas.name,
            plan_day:datas.plan_day,
            description:datas.description,
            cost:datas.cost,
            currency:datas.currency,
            action:<div>
              {/* <NavLink className='btn btn-icon btn-default btn-sm' to={'/businesssubcategory/'+datas._id+'/'+datas.name} >
                <span className='btn-inner--icon'><i className='fas fa-plus' /></span>
              </NavLink> */}
              <Button className='btn btn-icon btn-info btn-sm' onClick={(data_id,name) =>this.handleOpen({
                name:datas.name,
                plan_day:datas.plan_day,
                description:datas.description,
                cost:datas.cost,
                currency:datas.currency,
                subscriptionId:datas._id,
                open:true
              })}>
                <span class='btn-inner--icon'><i class='fas fa-pencil-alt' /></span>
              </Button>
              {/* <button class='btn btn-icon btn-danger btn-sm' type='button'>
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </button> */}
              <Button className='btn btn-icon btn-danger btn-sm' 
              onClick={(id) =>this.handleOpenDelete(datas._id)}
              >
                <span class='btn-inner--icon'><i class='fas fa-trash' /></span>
              </Button>
            </div>

            }
        )
      })

      : subscriptionList.push(
        ['No record']
      )}
      const data = {
        columns: [
          {
            label: "Sr.No",
            field: "s_no",
            sort: "asc",
          },
          {
            label: "name",
            field: "name",
            sort: "asc",
          },
          {
            label: "plan_day",
            field: "plan_day",
            sort: "asc",
          },
          {
            label: "description",
            field: "description",
            sort: "asc",
          },
          {
            label: "cost",
            field: "cost",
            sort: "asc",
          },
          {
            label: "currency",
            field: "currency",
            sort: "asc",
          },
          {
            label: "Action",
            field: "action",
            sort: "asc",
          },
        ],
        rows: subscriptionList,
      };
  
      subscriptionTable = (
        <MDBDataTable striped bordered hover entries={10} data={data} />
      );
    return (
      <div>
        <div className='header bg-primary pb-6'>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row align-items-center py-4'>
                <div className='col-lg-6 col-7'>
                  <h6 className='h2 text-white d-inline-block mb-0'>Settings</h6>
                </div>
                  <Dialog
                    open={this.state.openDialgue}
                    onClose={() => this.closeDialgue()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">Do you want to delete this plan?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <button class='btn btn-icon btn-danger btn-sm' type='button' onClick={() => this.closeDialgue()}>
                              No
                    </button>
                    <button class='btn btn-icon btn-success btn-sm' onClick={()=>this.deleteUserPermanently()} type='button'>
                              Yes
                    </button>
                  </DialogActions>
              </Dialog>
              </div>
  
              <ul className='nav nav-pills nav-fill flex-column flex-sm-row' id='tabs-text' role='tablist'>
                <li className='nav-item'>
                  <Link to='/aboutus' className='nav-link mb-sm-3 mb-md-0 ' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>About Us</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/privacypolicy' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Privacy Policy</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/termandcondition' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Term & Condition</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/contactus' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>Contact Us</Link>
                </li>
                {/* <li className='nav-item'>
                  <Link to='/settings' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-1-tab' data-toggle='tab' href='#tabs-text-1' role='tab' aria-controls='tabs-text-1' aria-selected='true'>Multi City Settings</Link>
                </li> */}
                <li className='nav-item'>
                  <Link to='/firstorderdiscount' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-2-tab' data-toggle='tab' href='#tabs-text-2' role='tab' aria-controls='tabs-text-2' aria-selected='false'>First Order Discount</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/promocode' className='nav-link mb-sm-3 mb-md-0' id='tabs-text-3-tab' data-toggle='tab' href='#tabs-text-3' role='tab' aria-controls='tabs-text-3' aria-selected='false'>Promo Code</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/subscription' className='nav-link mb-sm-3 mb-md-0 active' id='tabs-text-3-tab' data-toggle='tab' href='#tabs-text-3' role='tab' aria-controls='tabs-text-3' aria-selected='false'>Subscription</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className='container-fluid mt--6'>
          <div className='row'>
            <div className='col'>
              <div className='card'>
                <div className='card-header'>
                  <div className='row align-items-center'>
                    <div className='col-6'>
                      <h3 className='mb-0'>Subscription</h3>
                    </div>
                  </div>
                </div>
                <Modal
                isOpen={this.state.open}
                toggle={() => this.close()}
            >
                <ModalHeader toggle={() => this.close()}>
                  <Label for="title">Add Subscription</Label>      
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type="text" name="link" id="link" placeholder="name" value={this.state.name} onChange={(e)=>this.onChangeAddName('name',e.target.value)} />
                        <span style={{color:'red'}}>{this.state.formErrname}</span>
                  </FormGroup>
                    <FormGroup>
                        <Input type="text" name="link" id="link" placeholder="plan_day" value={this.state.plan_day} onChange={(e)=>this.onChangeAddName('plan_day',e.target.value)} />
                        <span style={{color:'red'}}>{this.state.formErrplan_day}</span>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="link" id="link" placeholder="description" value={this.state.description} onChange={(e)=>this.onChangeAddName('description',e.target.value)} />
                        <span style={{color:'red'}}>{this.state.formErrplan_day}</span>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="link" id="link" placeholder="cost" value={this.state.cost} onChange={(e)=>this.onChangeAddName('cost',e.target.value)} />
                        <span style={{color:'red'}}>{this.state.formErrcost}</span>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="link" id="link" placeholder="currency" value={this.state.currency} onChange={(e)=>this.onChangeAddName('currency',e.target.value)} />
                        <span style={{color:'red'}}>{this.state.formErrcurrency}</span>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  
                    <Button variant="raised" className="btn-success text-white mr-10"  onClick={(e)=>this.handleSubmit()}>{this.state.subscriptionId !== ''?"Update":"Save"}</Button>
                        <Button variant="raised" onClick={()=>this.close()} className="btn-danger text-white mr-10">Cancel</Button>
                </ModalFooter>
              </Modal>
                <div className='card-body'>
  
                <div className='table-responsive'>
                  <table className='table align-items-center table-flush'>
                    {subscriptionTable}
                  </table>
                </div>
  
                  <button 
                    className='btn btn-success float-left' 
                    type='button'
                    onClick={() => this.open()}
                  >Add</button>
                  <button className='btn btn-default float-left mr-4' type='button'>Cancel</button>
  
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
    subscriptionlisting: state.subscription.subscriptionlisting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSubscriptionList: () => dispatch(actions.fetchSubscriptionListAction()),
    addSubscriptionAction: (data) => dispatch(actions.addSubscription(data)),
    deleteSubscriptionAction: (data) => dispatch(actions.deleteSubscription(data)),
    editSubscriptionAction: (data,data1) =>dispatch(actions.editSubscription(data,data1)),
  }
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(Subscription))
