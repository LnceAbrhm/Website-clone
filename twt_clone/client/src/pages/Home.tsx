import { useEffect, useRef, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { formatDistanceStrict, parseISO } from 'date-fns';
import Alert  from 'react-bootstrap/Alert';


// create new tabs for empty href
interface User{
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
  
  const handleNewStatus = (e: React.FormEvent) => {
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
        <Form>
          <Form.Group controlId='newstatus'>
            <Form.Control type='text' placeholder='What is happening!?' value={status} onChange= {(e)=> setStatus(e.target.value)}className='text-bg-dark border-0'/>
          </Form.Group>
          <Button variant="primary" type="submit" className='rounded' onClick={handleNewStatus}>
                Post
          </Button>
        </Form>
      </>
    )
  
}
function LeftSide({ user } : { user: User }){

  return(
  <div className=''>
    <Navbar bg= "dark" data-bs-theme="dark" className='position-fixed' >
    <Nav defaultActiveKey="/home" className='flex-sm-column h5 text-start' >
      <Nav.Link href='/home'>Home</Nav.Link>
      <Nav.Link>Home</Nav.Link>
      <Nav.Link>Explore</Nav.Link>
      <Nav.Link>Notification</Nav.Link>
      <Nav.Link>Messages</Nav.Link>
      <Nav.Link>lists</Nav.Link>
      <Nav.Link>Bookmarks</Nav.Link>
      <Nav.Link>Communities</Nav.Link>
      <Nav.Link>Premium</Nav.Link>
      <Nav.Link>Profile</Nav.Link>
      <Nav.Link className='fs-6 fw-lighter'>@{user.uname}</Nav.Link>
    </Nav>
    </Navbar>
    </div>
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
    
    <Container className='bg-dark text-white' fluid >
      <Row >
        <Col xs lg='3' ><LeftSide user = { user } /> </Col>
        <Col>
          <Nav justify variant='underline'>
            <Nav.Item>
              <span>For you  </span>
            </Nav.Item>
            <Nav.Item>
              <span> Following</span>
            </Nav.Item>
          </Nav>
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
        </Col>
      </Row>

    </Container> 
    
    <div><a href=""></a></div>
    <div></div>
    <div></div>
    <div>
      
    </div>
    
    </>
  )
}


export default Home
