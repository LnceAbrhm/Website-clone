import { FormEvent, useEffect, useRef, useState, useMemo} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { formatDistanceStrict, parseISO } from 'date-fns';
import Alert  from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import grey from './img/grey.jpg';



interface User{
  id: string;
  name: string;
  uname: string;
  pass: string;
  cmark: boolean;
}

interface Status{
  _id: string,
  uname : string,
  status: string,
  likes: number,
  comments: number,
  repost: number,
  createdAt: string, 
  updatedAt: string,
}

interface Highlight{
  _id: string,
  type : string,
  title: string,
  date: string, 
  franchise: string,
}

interface Trend{
  _id: string,
  type : string,
  title: string,
  total: number,
  location: string, 
}

function GetInfo({ user } : { user: string }){
  const [name, setName] = useState<string>();

  useEffect(()=> {
    axios.get(`http://localhost:5555/${user}`)
    .then((res)=>{
      setName(res.data.name);
    }).catch((error)=>{
      console.log(error);
    })
  }, [user]);

  return name;
}

function GetStatus(){
  const [foryou, setForyou] = useState<Status[]>([]);

  useEffect(()=> {
    axios.get("http://localhost:5555/status")
    .then((res)=>{
      setForyou(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  }, []);

  return (
    <div >
    <div className='statusList'>{foryou.map((status) =>(
      <div key={status._id} className='status'>
     <article >
      <div><a href=""> <b><GetInfo user= {status.uname}/></b> </a></div>
      <div><a href="">{status.uname}</a></div>
      <div><a href="">{formatDistanceStrict(parseISO(status.createdAt), new Date())}</a></div>
       
       <div>
         {status.status}
         </div>
       <div>comments {status.comments}</div>
       <div>repost {status.repost}</div>
       <div>likes {status.likes}</div>
     </article>
     </div>
       ))}</div>
      </div>
     )
}

function CreateStatus(){
  const [status, setStatus] = useState<string>('');
  const uname = useRef<string>('JaimeL');
  const [loading, setLoading] = useState<boolean>(false);
  
  function handleNewStatus (e: React.FormEvent) {
      e.preventDefault()
      const newStatus = {
        status,
        uname,
      }
      setLoading(true)
      axios
        .post('http://localhost:5555/createStatus', newStatus)
        .then(()=>{
          setLoading(false);
        })
        .catch((err) =>{
          setLoading(false);
          console.log(err);
          <Alert variant='danger'>
            <p>An error happened.</p>
          </Alert>
        });
    }
  
  return(
      <>
      {loading ? (<Spinner />):''}
      <Col md={1}></Col>
      <Col>
        <Form>
          <Row>
            <Form.Group controlId='newstatus'>
              <Form.Control type='textarea' placeholder='What is happening!?' value={status} onChange= {(e)=> setStatus(e.target.value)} className='text-bg-dark border-0'/>
            </Form.Group>
          </Row>
          <Row></Row>
          <Row>
            <div>
              <div></div>
            </div>
            <div>
              <Button variant="primary" type="submit" className='rounded-pill w-0' onClick={handleNewStatus} >
                    Post
              </Button>
            </div>  
          </Row>
        </Form>
        </Col>
      </>
    )
  
}

function LeftSide({ user } : { user: User }){

  return(
  <>
      {/* test adding a scrollspy */}
    <div className='position-fixed' >
    <Container > 

    <div >
    <Row>
    <Navbar data-bs-theme="dark"  >
    <Container className='leftnav' >  
    <Nav defaultActiveKey="/home"  className='fs-4' >
      <Nav.Link className=' rounded-pill text-center w-25' ><div><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
        </svg></div></Nav.Link>

      <Nav.Link href='/home' className='rounded-pill w-75'> 
      <div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
        </svg>
        </div>
        <div className='pe-3'></div>
        <div>Home</div>

      </div></Nav.Link>

      <Nav.Link className='rounded-pill w-75'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Explore</div></Nav.Link>

      <Nav.Link className='rounded-pill w-100'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Notification</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-100'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Messages</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-75'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-slash-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Grok</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-50'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
          <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>List</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-100'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Bookmarks</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-100'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Communities</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-100'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Premium</div>
        </Nav.Link>

      <Nav.Link className='rounded-pill w-75'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
          </svg>
        </div>
        <div className='pe-3'></div>
        <div>Profile</div>
        </Nav.Link>
      {/*need to fix drop down  */}
      <NavDropdown id='more-dropdown' title={
        <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg>
          </div>
          <div className='pe-3'></div>
          <div>More</div>
        </div>
        } menuVariant='dark' >
          <span>
          <NavDropdown.Item href="">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
              <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
            <div className='p-1'></div>
            <div>Monetization</div>
            </NavDropdown.Item>
          <NavDropdown.Item href="">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-up-right-square" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"/>
              </svg>
            </div>
            <div className='p-1'></div>
            <div>Ads</div>
            </NavDropdown.Item>
          <NavDropdown.Item href="">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </div>
            <div className='pe-1'></div>
            <div>Jobs</div>
            </NavDropdown.Item>
          <NavDropdown.Item href="">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
              </svg>
            </div>
            <div className='p-1'></div>
            <div>Create your Space</div>
            </NavDropdown.Item>
          <NavDropdown.Item href="">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
            </div>
            <div className='p-1'></div>
            <div>Settings and privacy</div>
            </NavDropdown.Item>
          </span>
        </NavDropdown>
    </Nav>
    </Container>
    </Navbar>
    </Row>
    </div>
    <div >
      <Row className="border"><PostModal /></Row>
    </div>
    <div >
    <Row className="border" >
    
      <Nav.Link className='test'>
        <Row>
          <Col md={1}>
          <div><Image src={grey} width={25} height={25} roundedCircle /></div>
          </Col>

          <Col md={6}>
            <Row className='fs-6 fw-medium '>
              <div>{user.name}</div>
            </Row>

            <Row className='fs-6 fw-lighter '>
              <div>@{user.uname}</div>
            </Row>
          </Col> 
          <Col md={1}>
          <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg>
              </div>
          </Col>
        </Row>
        
        </Nav.Link>
    </Row>
    </div>
    </Container>
    </div>
    </>
    )
}

function PostModal(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='rounded-pill w-100'>
        Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Header>
        <Modal.Body><CreateStatus /></Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

function SearchBar(){
  const [results, setResults] = useState<User[]>([]);
  const [query, setQuery] = useState<String>("");
  const navigate = useNavigate();
    useEffect(()=>{
      axios.get("http://localhost:5555/users")
      .then((res)=>{
        setResults(res.data.data);
      }).catch((error)=>{
        console.log(error);
      })
      }, [])

    const filteredResults = useMemo(()=> { return results.filter( result => {
      return  result.uname.toLowerCase().includes(query.toLowerCase()) || result.name.toLowerCase().includes(query.toLowerCase());
    })}, [query])

    function handleVisibilty(){
      
      document.getElementsByClassName('searchResults')[0].classList.toggle('visible');
    }
    function handleRedirect(e : String){
      return navigate(`/${e}`);
    }
  return (
    <>
    <Navbar className="bs-dark-bg-subtle justify-content-between d-block">
        <Form >
          
            <Row >
                <Col >
                  
                  <Form.Control type='text' placeholder='Search' onFocus={(e) => {handleVisibilty()}}
                  onChange = {(e)=> setQuery(e.target.value)} onBlur= {(e) => {handleVisibilty()}}
                  className='text-bg-dark border-0'
                  /> 
                  
                </Col>
            </Row>

            <Row className='searchResults' >
              <Card className='text-bg-dark border-0'>
                <Col>
                  <div >
                    {query==="" ? <Card.Body><div>Try searching for people,list, or keywords</div></Card.Body> : filteredResults.map(result =>(
                    
                    <div id={result.id}>
                      <Button type= 'button' onMouseDown={()=>{handleRedirect(result.name)}} variant='dark'> <div>{result.uname}</div>
                      <div>{result.name}</div> </Button>
                    </div>
                    
                    ))}
                  </div>
                </Col>
              </Card>
            </Row>
          
        </Form>
      
    </Navbar>
    </>
  )

}

function RightSide(){
  const [highlight, setHighlight] = useState<Highlight[]>([]);
  const [trend, setTrend] = useState<Trend[]>([]);
  const [whoTofollow, setWhoToFollow] = useState<User[]>([]);
    useEffect(()=>{
      axios.get("http://localhost:5555/users")
      .then((res)=>{
        setWhoToFollow(res.data.data);
      }).catch((error)=>{
        console.log(error);
      })
      }, [])

    useEffect(()=>{
      axios.get("http://localhost:5555/trending")
      .then((res)=>{
        setTrend(res.data.trend);
        setHighlight(res.data.highlight);
      }).catch((error)=>{
        console.log(error);
      })
      }, [])
  return(
  <>
    <Card bg='dark' text='white'>
       <Card.Body>
         <Card.Title>Subscribe to Premium</Card.Title>
         <Card.Text>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</Card.Text>
         <Button>Subscribe</Button>
       </Card.Body>  
      </Card>
    <Card bg='dark' text='white'>
      <Card.Title>What's happening</Card.Title>
      <div>
        {highlight.map(result =>(         
          <div id={result._id}>
            <Button type= 'button' variant='dark'> <div>{result.title}</div>
              <div>{result.franchise}</div> </Button>
          </div>      
        ))}
      </div>
      <div >
          {trend.map(result =>(         
          <div id={result._id}>
            <Button type= 'button' variant='dark'> <div>{result.type}</div>
              <div>{result.total}</div> </Button>
          </div>      
        ))}
      </div>
      <Button>See more</Button>
      </Card> 
      
    <Card bg='dark' text='white'>
      <Card.Title>Who to follow</Card.Title>
      <div >
        {whoTofollow.map(result =>(         
          <div id={result.id}>
            <Button type= 'button' variant='dark'> <div>{result.name}</div>
              <div>{result.uname}</div> </Button>
          </div>      
        ))}
      </div>
      <Button>See more</Button>
      </Card>
  </>
  )
}

function Home() {
  const [user, setUser] = useState<User>({} as User);
  const [recommended, setRecommended] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=> {
    setLoading(true);
    axios.get("http://localhost:5555/JaimeL")
    .then((res)=>{
      setUser(res.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }, []);

  

  return (
    <> 
    <Container className='main' fluid >
      <Container className=' text-white'  >
        <Row className='border'>
          <Col className='border' md={3}><LeftSide user = { user } /> </Col>

          <Col className='border' md={6}>
          <div>
            <Row className=''>
              <Nav className='justify-content-left position-fixed' >
                
                
                <Col md={2} className='text-center'>
                  <div>
                  <Nav.Item >
                  <Nav.Link href='/home' className=''><div ><span >For you  </span></div></Nav.Link>
                  </Nav.Item>
                  </div>
                </Col>
               
                <div ><Nav.Item>
                  <Nav.Link href=''><span> Following</span></Nav.Link>
                </Nav.Item>
                </div>
              </Nav>
            </Row>
          </div>
            <Row style={{marginBottom: 50}}></Row>
            <Row>
              <CreateStatus />
            </Row>
            <Row>
              {loading ? (<Spinner />):
            (<div>
            <GetStatus />
            </div>)}
            </Row>
            
          </Col>
          
          <Col>
          <Row>
            <SearchBar />
          </Row>
          <Row>
          <RightSide />
          </Row>
          </Col>
        </Row>

      </Container> 
    </Container>
    
    </>
  )
}


export default Home
