import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label } from 'reactstrap';
// import axios from 'axios'
import APIURL from '../../helpers/environment'

class AddStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title:'',
      createdBy:'',
      count:2,
      savedDate: '',
      userInput: '',
      appCount: null,
    };
    
    this.toggle = this.toggle.bind(this);
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  handleInput(e) {
     this.setState({
      [e.target.name]: e.target.value
     })
     console.log(this.state.dueDate)
}

// getStoryCount = () => {

//   fetch(`http://localhost:3000/appointments/count`, {
//       method: "GET",
//       headers: new Headers({
//           "Content-Type": "application/json",
//           // Authorization: `${this.props.token}`,
//       }),
     
//       })
//       .then((r) => r.json())
//   .then((r)=> {
//       this.setState({
//           count: r,
//           err:''
//       })
//       console.log(r)
//   })
//   .catch((e)=>{
//       this.setState({
//           err: e
//       })
//   })
// }

handleClick = event => {
  console.log(this.state.savedDate)
  console.log(this.state.userInput)
 
  console.log(this.state.appCount)
  // this.setState({
  //   storyId : storyId + 1

  // })
  console.log(this.state.appCount)
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
  fetch(`https://fbc-task-server.herokuapp.com/appointments/create`, {
      method: "POST",
      headers: new Headers({
          "Content-Type": "application/json",
          // Authorization: `${this.props.token}`,
      }),
      body: JSON.stringify({
        
          savedDate: this.state.savedDate,
          userInput: this.state.userInput,
          storyId: this.state.appCount,
          
          
        
        })
      })
    
      .then((result) => result.json())
      .then((data) => { console.log(data)
        
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
      
      // })
    }
    console.log("test1",data);
  })
  .catch((error)=> {
    console.log(error);
  });
  
}

  // handleClick = event => {
  //   this.getStoryCount()
  //   axios.post('/story', {
  //     title:this.state.title,
  //     createdBy:this.state.createdBy,
  //     storyId:this.state.count
  //   })
  //   .then((response)=> {
  //     if(response.data.error)
  //       alert(response.data.error)
  //     else{
  //       this.toggle();
  //       this.setState({
  //         title:null,
  //         createdBy:null,
  //         storyId:null,
  //         loading:false
  //       })
  //     }
  //     console.log(response);
  //   })
  //   .catch((error)=> {
  //     console.log(error);
  //   });
  // }
  toggle() {
    this.setState({
      modal: !this.state.modal,
      appCount: this.state.appCount + 1
    });
  }

  render() {

    return (
      <div>
        <Button color="secondary" onClick={this.toggle}><i className="fas fa-plus-circle"/> Add New Worker</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Add Worker
          </ModalHeader>
          <ModalBody>
          <FormGroup><Label for="title">Worker Name(*):</Label><Input type="text" name="savedDate" onChange={this.handleInput.bind(this)}/></FormGroup>
          {/* <FormGroup><Label for="createdBy">Created by(*):</Label><Input type="text" name="userInput" onChange={this.handleInput.bind(this)}/></FormGroup> */}
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick.bind(this)}><i className="fas fa-plus-circle"></i> Add</Button>
            <Button color="secondary" onClick={this.toggle}><i className="fas fa-times-circle"></i> Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddStory;