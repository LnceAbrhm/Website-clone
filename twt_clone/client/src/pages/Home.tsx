import { FormEvent, useEffect, useRef, useState, useMemo} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { formatDistanceStrict, parseISO } from 'date-fns';
import Alert  from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';



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
        <Form>
          <Form.Group controlId='newstatus'>
            <Form.Control type='textarea' placeholder='What is happening!?' value={status} onChange= {(e)=> setStatus(e.target.value)} className='text-bg-dark border-0'/>
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
  <div >
    <Navbar data-bs-theme="dark" className='position-fixed' >
    <Nav defaultActiveKey="/home" className='flex-sm-column h5 text-start' >
      <Nav.Link>Home</Nav.Link>
      <Nav.Link href='/home'> <div><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
        </svg>Home</div></Nav.Link>
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
      console.log(highlight)
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
