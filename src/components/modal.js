import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
import moment from 'moment'
// import axios from 'axios'
import APIURL from '../helpers/environment'

// type Props = {
//   token: string | null;
//   userBikeId: number;
//   // bikeToUpdate: any;
// }

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      make:this.props.propContent.make,
      content:this.props.propContent.content,
      status:this.props.propContent.status,
      color:this.props.propContent.color,
      taskId: this.props.propContent.taskId,
      model: this.props.propContent.model,
      size:this.props.propContent.size,
      tireSize: this.props.propContent.tireSize,
      year: this.props.propContent.year,
      userInput: this.props.propContent.userInput
    };

    this.toggle = this.toggle.bind(this);
  }
  handleInput(e) { 
    this.setState({
     [e.target.name]: e.target.value
    })
    console.log(this.state.title)
}

handleClick = event => {
  // event.preventDefault();
  console.log(this.state.taskId)
  console.log(this.props.taskId)

    fetch(`https://fbc-task-server.herokuapp.com/userbike/${this.props.taskId}`, {
        method: "PUT",
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
      console.log("test3",data);
    })
    .catch((error)=> {
      console.log(error);
    });
    
  

  // axios.put(`/tasks/update/${id}`, {
  //   title:this.state.title,
  //   content:this.state.content,
  //   status:this.state.status
  // })
  // .then((response)=> {
  //   if(response.data.message)
  //     alert(response.data.message)
  //   else{
  //     this.toggle();
  //     this.setState({
  //       title:null,
  //       content:null,
  //       loading:false
  //     })
  //   }
  //   console.log(response);
  // })
  // .catch((error)=> {
  //   console.log(error);
  // });
  
}
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
      let {title,content,status,make,model,color,year,size,tireSize,userInput,taskColor,dueDate,workers} = this.state;
      const {propContent,classType,taskId} = this.props;
    return (
      <div>
        <Button color="primary" size="sm" className={classType} onClick={this.toggle}><i className="fas fa-arrow-alt-circle-right"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          {/* <FormGroup>
          <Label for="make">Make</Label><Input type="text" name="make" id="make" onChange={(e) => this.setState({make: e.target.value})}/>
          </FormGroup> */}
          <Label for="make">Make</Label><Input type="text" name="make" value={make} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Model</Label><Input type="text" name="model" value={model} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Color</Label><Input type="text" name="color" value={color} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Year</Label><Input type="text" name="year" value={year} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Size</Label><Input type="text" name="size" value={size} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Tire Size</Label><Input type="text" name="tireSize" value={tireSize} onChange={this.handleInput.bind(this)}/>
          <Label for="make">Repair</Label><Input type="textarea" name="userInput" value={userInput} onChange={this.handleInput.bind(this)}/>
          </ModalHeader>
          <ModalBody>
            {/* <h2>{this.props.taskId}</h2> */}
          {/* <FormGroup>
          <Label for="content">Task Details:</Label>
          <Input type="textarea" name="content" value={content} onChange={this.handleInput.bind(this)}/>
        </FormGroup>
        <Label for="status">Status:</Label>
            <Input type="select" value={status} name="status" id="status" onChange={this.handleInput.bind(this)}>
                <option value="1">Backlog</option>
                <option value="2">Todo</option>
                <option value="3">In Progress</option>
                <option value="4">Done</option>
            </Input> */}
              <hr/>
              <i className="fas fa-calendar-alt"></i> Created Date: {moment(propContent.date).format("MM.DD.YYYY")}<br/>
              <i className="fas fa-clock"></i> Due Date: {moment(propContent.dueDate).format("MM.DD.YYYY")}<br/>
              <i className="fas fa-user"></i> Created by: {propContent.workers}
          </ModalBody>
          <ModalFooter>
          {/* <img height="35" alt={propContent.contributors[0].name + ' '+propContent.contributors[0].lastName } title={propContent.contributors[0].name + ' '+propContent.contributors[0].lastName } src={'/assets/img/' + propContent.contributors[0].profilePhoto}/> */}
            <Button color="primary" onClick={this.handleClick}>Update</Button>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;