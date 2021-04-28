import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
import moment from 'moment'
import DropdownDate from "react-dropdown-date";
import APIURL from '../../helpers/environment'
// import axios from 'axios'

const formatDate = date => {
  // formats a JS date to 'yyyy-mm-dd'
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title:'',
      content:'',
      workers:'mitch' | 'alex' | 'david',
      createdBy:'5af1921c0fe5703dd4a463ec',
      dueDate:'',
      status:this.props.status,
      taskColor:'Red' |'Yellow' |'Green',
      storyId:this.props.storyType,
      loading:false,
      users:[],
      make: null,
      model: null,
      year: null,
      color: null,
      size: null,
      tireSize: null,
      userInput: null,
      id: 0,
    };
    
    this.toggle = this.toggle.bind(this);
   
  }
  componentDidMount(){
    moment.locale('tr');
    this.changeColumnTitle()
  }
  changeColumnTitle = number=>{
    let newTitle;
    if(number==="1")
      newTitle="Backlog"
    else if(number==="2")
      newTitle="ToDo"
    else if(number==="3")
      newTitle="In Progress"
    else
      newTitle="Done"

    return newTitle;
  }

  setMake(e) {
    this.setState({
        make: (e)
    })
    
}


  handleInput(e) {
     this.setState({
      [e.target.name]: e.target.value
     })
     console.log(this.state.dueDate)
}


// getUsers(){
//   axios.get('/users')
//   .then((r)=> {
//       this.setState({
//           users: r.data,
//           err:''
//       })
//   })
//   .then((r)=>{
//     console.log(this.state.users)
//   })
//   .catch((e)=>{
//       this.setState({
//           err: e
//       })
//   })
// }
  handleClick = event => {
    console.log(this.state.make)
    console.log(this.state.workers)
    // axios.post('/tasks', {
    //   title:this.state.title,
    //   content:this.state.content,
    //   status:this.props.status,
    //   contributors:this.state.contributors,
    //   dueDate:this.state.dueDate,
    //   color:this.state.color,
    //   storyId:this.state.storyId,
    //   createdBy:this.state.createdBy
    // })

    event.preventDefault();
    fetch(`https://fbc-task-server.herokuapp.com/userbike/create`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            // Authorization: `${this.props.token}`,
        }),
        body: JSON.stringify({
          
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            size: this.state.size,
            tireSize: this.state.tireSize,
            userInput: this.state.userInput,
            taskColor: this.state.taskColor,
            dueDate: this.state.dueDate,
            workers: this.state.workers
            
          
          })
        })
      
        .then((result) => result.json())
        .then((data) => { console.log(data.userbike)
      if(!data)
        alert("wow you broke it")

      else{
        this.toggle();
        window.location.reload();
        // this.setState({
        //   title:null,
        //   content:null,
        //   contributors:null,
        //   dueDate:null,
        //   loading:false
        // })
      }
      console.log("test1",data);
    })
    .catch((error)=> {
      console.log(error);
    });
    
  }
  toggle() {
    // this.getUsers();
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const {users} = this.state;
    let userContent;
    if(!users)
      userContent = <option value="">Loading...</option>
    else{
      userContent = users.map((user,index)=>(
              <option key={index} value={user._id}>{user.name + " " + user.lastName}</option>
      ))
    }
    return (
      <div>
        <i className="fas fa-plus-circle customAddTask" onClick={this.toggle}></i>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Create a New Task
          </ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="make">Make</Label><Input type="text" name="make" id="make" onChange={(e) => this.setState({make: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="make">Model</Label><Input type="text" name="model" id="make" onChange={(e) => this.setState({model: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="make">Year</Label><Input type="text" name="year" id="make" onChange={(e) => this.setState({year: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="make">Color</Label><Input type="text" name="color" id="make" onChange={(e) => this.setState({color: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="make">Size</Label><Input type="text" name="size" id="make" onChange={(e) => this.setState({size: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="make">Tire Size</Label><Input type="text" name="tireSize" id="make" onChange={(e) => this.setState({tireSize: e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <Label for="content">Bike Details:</Label>
          <Input type="textarea" name="userInput" id="content" onChange={this.handleInput.bind(this)}/>
        </FormGroup>
        <FormGroup>
            <Label for="workers">Assign to:</Label>
            <Input type="select" name="workers" id="contributors" onChange={this.handleInput.bind(this)}>
                <option value="">Choose:</option>
                <option value="mitch">Mitch</option>
                <option value="alex">Alex</option>
                <option value="david">David</option>
                {/* {userContent} */}
            </Input>
          </FormGroup>
        <FormGroup>
            <Label for="taskColor">Task Color:</Label>
            <Input type="select" name="taskColor" id="taskColor" onChange={this.handleInput.bind(this)}>
                <option value="">Choose:</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Red">Red</option>
            </Input>
          </FormGroup>
              <hr/>
              <i className="fas fa-calendar-alt"></i> Created Date: {moment().format('L, h:mm:ss')} <br/>
              <i className="fas fa-clock"></i> Due Date: <input name="dueDate" id="dueDate" type="datetime-local" onChange={this.handleInput.bind(this)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e)=>this.handleClick(e)}><i className="fas fa-plus-circle"></i> Add</Button>
            <Button color="secondary" onClick={this.toggle}><i className="fas fa-times-circle"></i> Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;