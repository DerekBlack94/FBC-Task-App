import React from 'react'
import {Route} from 'react-router'
import App from './components/dashboard'
import About from './components/about';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label, Jumbotron, Container } from 'reactstrap';
import Photo from './assets/IMG.JPG'
const IndexPage = () => {

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center', 
        backgroundColor: "gray",
         
    }
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center', 
    }
    const backgroundImg = {
        backgroundImage: "https://images.squarespace-cdn.com/content/v1/5c997130a09a7e3c501b5bdb/1553565630171-4UEJ7DETES71NOXY7DA2/ke17ZwdGBToddI8pDm48kDHPSfPanjkWqhH6pl6g5ph7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwONMR1ELp49Lyc52iWr5dNb1QJw9casjKdtTg1_-y4jz4ptJBmI9gQmbjSQnNGng/IMG_9659.JPG?format=2500w"
    }

    return <div className="homeDiv">
        <img  src={Photo} alt="/"  width="50vw" height="600" z-index="-2"></img>
        
        <Container fluid>
          <h1 className="display-3">Family Bike Chain</h1>
          <p style={centerStyle} className="lead">Welcome to Family Bike Chain repair and task tracker</p>
        <a style={centerStyle} href="/story/1">Task App</a>
        <br/>
        <a style={centerStyle} href="https://www.familybikechain.com/">FBC website</a>
        </Container>
      
        </div>
}
const NotFoundPage = () => {

    return <div><h2>Not Found</h2><br/><a href="/story/1">Homepage</a></div>
}
export default(
    <Route>
        <Route path='/story/:id' exact component={App}/>
        <Route path='/about' exact component={About}/>
        <Route exact path="/" component={App} />
        <Route path='*' exact component={NotFoundPage}/>
    </Route>
)