import React,{Component} from 'react'
import Task from './task'
import TaskDisplay from './taskDisplay'
import Tooltips from './tooltip'
import AddTask from './forms/addTask';
export default class Story extends Component{
    render(){
      const {tasks,loading,filter,taskId,taskTable} = this.props;
      // let content;
      //   content = tasks.map((i,index) =>{

        return(
          
          <div className="container">
            <li  className="mcell-task" ></li>
                      <div className="space">
                          <h2 className="story">{this.props.storyName[0] ? this.props.storyName[0].savedDate : "Click Your Name"}</h2>
                      </div>
                        <div className="row">
                          <div className="col-sm mcell mcolor1">
                            <div className="mcell-title story">
                            <b className="fas fa-lightbulb"/> Backlog
                                <Tooltips id="1" content="what else could you want?" placement="top" storyType={this.props.storyType}/>
                            </div>
                                <Task tasks={this.props.tasks} taskId={this.props.id} loading={this.props.loading} filter="" />
                          </div>
                          <div className="col-sm mcell mcolor2">
                              <div className="mcell-title story">
                              <b className="fas fa-bars"/> TODO
                      {/* <h2>hellow</h2>
                      <h3>{this.props.tasks.id}</h3>
                      <h2>{this.props.taskId}</h2>
                      <h3>{taskTable}</h3> */}
                      
                                <Tooltips id="2" content="get back to work" placement="top" storyType={this.props.storyType}/>
                                <AddTask storyType={this.props.storyType} status={this.props.id}/>
                              </div>
                              <TaskDisplay  taskTable={taskTable} tasks={this.props.tasks} loading={this.props.loading} filter="2"/>
                          </div>
                          
                          <div className="col-sm mcell mcolor3">
                              <div className="mcell-title story">
                              <b className="fas fa-spinner"></b> In Progress
                                <Tooltips id="3" content="are you still not working ?" placement="top" storyType={this.props.storyType}/>                              </div>
                              <Task tasks={this.props.tasks} loading={this.props.loading} filter=""/>
                          </div>
                          <div className="col-sm mcell mcolor4">
                              <div className="mcell-title story">
                              <b className="fas fa-check"/> Done
                                <Tooltips id="4" content="what ever just click on the youtube tab and waste some more time" placement="top" storyType={this.props.storyType}/>                              </div>
                              <Task tasks={this.props.tasks} loading={this.props.loading} filter=""/>
                            </div>
                        </div>
                      </div>
        )
      // })
      // return(
      //   <div className="process">{content}</div>
      // )
    }
}