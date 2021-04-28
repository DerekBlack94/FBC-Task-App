import React,{Component} from 'react'
import moment from 'moment'
import APIURL from '../helpers/environment'
// import { render } from 'pug';

class deleteTable extends Component{



handleClick = event => {
    console.log(this.props.taskId)
  
  fetch(`https://fbc-task-server.herokuapp.com/userbike/${this.props.taskId}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // this.setState({
      //   appointment: data.deleteUserBike,
      // });
      console.log("response", data);
      window.location.reload();
    });
  }

  render(){
      return(
        <i id="delete" className="fas fa-times" onClick={this.handleClick}></i>
      )
  }
}

export default deleteTable;