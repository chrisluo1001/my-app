import React from "react";
import { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AlertBox from '../AlertBox';
import ModalHelp from '../ModalHelp';
import { Counter } from '../../redux/Counter';
import store from "../../store";

const Header = () => {

    const [show, setShow] = useState(true);
    const [count, setCount] = useState(10);
    //console.log(store.getState());
    //store.subscribe(() => console.log('Look ma, Redux!!'));
    let cc = 0;
    function clickAdd() {
      store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: cc++ }));
    }
    function addArticle(payload) {
      return { type: "ADD_ARTICLE", payload };
    } 
    //store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: ()=>{setCount(count+1)} }) );
    //console.log(store.getState());
    const dd = <Row><Col>Hello Kitty</Col><Col></Col></Row>;
    return (
         <div className="App">
         <Container fluid>
           <Row>
             <Col><Button onClick={clickAdd}>Show Toast</Button></Col>
           </Row>

           <Row>
             <Col>{count}</Col>
             <Col xs={2}></Col>
             <Col>
                 <Button variant="primary" size="sm" id="dst-whatsnew-btn" aria-label={`Click for What's New with DSV`}
                   className="dst-whatsnew-button" title={`Click for What's New with DSV`}
                   >
                   <span className="dst-whatsnew-btntxt">{`What's New?`}</span>
                   </Button>
                   <a href='#' target="_blank" rel="noopener noreferrer"
                     id="dst-help-btn" aria-label="Click for Help on using the DSV"
                     className="dst-help-link" title="Click for Help with DSV"
                   >
                     Help
                   </a>
             </Col>
           </Row >
<dd />
           {
             show && (
              <Row>
              <Col xs={2}>Hello Kitty</Col>
              <Col></Col>
             </Row>
             )
           }
           <Row>
               {/* <Toast show={show} onClose={() => toggleShow(false)}>
                       <Toast.Header>
                         <strong className="mr-auto">React-Bootstrap</strong>
                       </Toast.Header>
                       <Toast.Body>hello</Toast.Body>
               </Toast> */}
           </Row>
           <Row>
               <AlertBox />
           </Row>
           <Row>
            <ModalHelp />
           </Row>
           <Row>
             <Counter />
           </Row>
         </Container>
         </div>
         );
};

export default Header;