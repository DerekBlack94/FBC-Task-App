import React,{Component} from 'react'
import Header from './common/headers'
class About extends Component{

    render(){
        return(
            <div>
              
              <Header/>
              
                  <aside className="container">
                    <div className="col-sm aboutUs">
                        <h2 className="mcell-title story">Family bike chain</h2>
                        <div className="padding20">@derekblack</div>
                    </div>
                  </aside>
            </div>
        )
    }
}
export default About