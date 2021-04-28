import React,{Component} from 'react'
// import axios from 'axios'
import {Link} from 'react-router'
import Story from './story'
import AddStory from './forms/addStory';
import Loader from './loader'
import Header from './common/headers'
import APIURL from '../helpers/environment'

class Dashboard extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      show: true,
      tasks:[],
      stories:[],
      err:'',
      err2:'',
      loading:true,
      loadingStory:true
    };
    
    this.getData = this.getData.bind(this)
  }
  
  componentDidMount = ()=>{
    this.getStoryDetails();
    this.getData();
  //   setInterval(() => {
  //     this.getData();
  // }, 2000);
  }

  getStoryDetails = () => {
    fetch(`https://fbc-task-server.herokuapp.com/appointments/`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": "application/json",
          // Authorization: `${this.props.token}`,
      }),
     
      })
      .then((r) => r.json())
    .then((r)=> {
        this.setState({
            stories: r.GetAppointments,
            err2:''
        })
    })
    .then(()=>{
      this.setState({
        loadingStory:false
    })
  })
    .catch((e)=>{
        this.setState({
          loadingStory:false,
          err2: e
        })
    })
   
  }
  getData = () => {

    // event.preventDefault();
    fetch(`https://fbc-task-server.herokuapp.com/userbike/`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            // Authorization: `${this.props.token}`,
        }),
       
        })
      
        .then((r) => r.json())
        .then((r) => { 
          this.setState({
                       tasks: r.getUserBike,
                      err:''
                  })

           console.log(r.getUserBike)

      if(!r)
        alert("wow you broke it")

      else{
        // this.toggle();
       
      }
      console.log("test1",r.getUserBike);
    })
    .then(()=>{
             this.setState({
               loading:false
            })
           })


    .catch((error)=> {
      if (!error.response){
              this.setState({
                loading:true,
                err: error
            })
          }
              else
                this.setState({
                    loading:false,
                    err: error
                })
            })
            console.log(this.props.router.params.id)
          }

//     .then((r)=> {

//       this.setState({
//           tasks: r.data,
//           err:''
//       })
//     })
//     .then(()=>{
//       this.setState({
//         loading:false
//       })
//     })
//     .catch((e)=>{
//       if (!e.response){
//       this.setState({
//         loading:true,
//         err: e
//     })
//   }
//       else
//         this.setState({
//             loading:false,
//             err: e
//         })
//     })
   
    
// }
    render(){
      let {stories,loadingStory,taskId, tasks} = this.state;
      let storyTable;
      let taskTable;
      // if(!loadingStory)
      storyTable = stories.map((story,index)=>{
        return(
          <li key={index}>
            <Link to={`/story/${story.id}`} activeClassName="active">
              <i className="fas fa-list-alt"></i>
              <span className="menu-text">{story.savedDate}</span>
            </Link>
                   {/* <h2>
                      {this.state.}
                     </h2>
                     <h1>Hello</h1> */}
          </li>
        )
      })
      // else
      // storyTable = <li>
      //   <div className="loader">
      //    <Loader/>
      //     </div>
      // </li>


      taskTable = tasks.map((i,index) => {
        return(
        <li key={index}>
          <h2>{i.id}</h2>
        </li>
        )

      })

        return(
          <div>
              <div className="side">
                <span className="logo">FBC Task App</span>
                <ul className="side-menu">
                  {storyTable}
                </ul>
                  {/* {taskTable} */}
                <div className="otherMenu">
                  <AddStory/>
                </div>
              </div>
              <div className="con">
                <Header/>
                  <aside>
                      <Story 
                      storyName={this.state.stories.filter(i=>i.id===parseInt(this.props.router.params.id))} 
                      storyType={this.props.params.id} 
                      tasks={this.state.tasks} 
                      loading={this.state.loading}
                      taskId={this.state.id}
                      taskTable={taskTable}
                      />
                  </aside>

              </div>
            </div>
        )
      }
    }
export default Dashboard