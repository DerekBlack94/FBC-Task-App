import React,{Component} from 'react'
import moment from 'moment'
import ModalExampleDimmer from './modal'
// import axios from 'axios'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui';
import Loader from './loader';
import { Badge } from 'reactstrap';
import DeleteTask from './deleteTask';
import APIURL from '../helpers/environment'

class TaskDisplay extends Component{
  componentWillReceiveProps(){
  
    $(".mcell-task").draggable({
      appendTo: "body",
      cursor: "move",
      helper: 'clone',
      revert: "invalid"
  });
  
  $(".mcell").droppable({
      tolerance: "intersect",
      accept: ".mcell-task",
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function(event, ui) {        
          $(this).append($(ui.draggable));
          console.log($(this).find("li").attr('id'))
      }
  });
  }
// api = id => {
//   axios.delete('/tasks/delete/'+id)
//   .then(function (response) {
//     if(response.status==="1")
//       alert("ok")
//     console.log(response);
//   })
//   .then(()=>{
    
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// }
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
    // window.location.reload();
  });
}
  render(){
    const {tasks,loading,filter,taskId} = this.props;
      let content;
      if (loading) {
        content = <div className="loader">
         <Loader/>
          </div>;
      }
      else{
        content = 
        tasks
        
        // .filter(i=>i.id===Number(filter))
        .map((i,index)=>{
          return(
            <li id={i.id} className="mcell-task" key={index}>
              <span className="task-name">
                <span>{i.make}</span>
                <DeleteTask taskId={i.id} />
                {/* <i id="delete" className="fas fa-times" onClick={this.handleClick}></i> */}
              </span>
              <span className="task-details">{i.model}</span>
             <span>
                 {i.taskColor === "Green" ? <Badge color="success">On Track</Badge> : <div/>}
                 {i.taskColor === "Yellow" ? <Badge color="warning">Issue</Badge> : <div/>}
                 {i.taskColor === "Red" ? <Badge color="danger">Behind</Badge> : <div/>}
                 </span> 
              
              <div>
              <span className="task-due">{moment(i.dueDate).format("MM.DD.YYYY")}</span>
              <span className="task-contributors">
                <h2>
                  {/* {i.id} */}
                  </h2>
                {/* <img alt={i.contributors[0].name + ' '+i.contributors[0].lastName } title={i.contributors[0].name + ' '+i.contributors[0].lastName } src={'/assets/img/' + i.contributors[0].profilePhoto}/> */}
              </span>
            </div>
            <div className={i.color}/>
            <ModalExampleDimmer taskId={i.id} propContent={i} classType="btnDashboard"/>
            </li>
          )
        })
    }
    return(
      <div className="process">{content}</div>
    )
  }
}
export default TaskDisplay;