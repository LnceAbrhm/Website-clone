import { useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { formatDistanceStrict, parseISO } from 'date-fns';


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
      console.log(res.data);
      setName(res.data.name);
    }).catch((error)=>{
      console.log(error);
    })
  }, [user]);

  return name;
}

function GetStatus(){
  const [foryou, setForyou] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=> {
    setLoading(true);
    axios.get("http://localhost:5555/status")
    .then((res)=>{
      console.log(res.data);
      setForyou(res.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }, []);

  return (
    <div>{foryou.map((status) =>(
     <article key={status._id}>
       <a href=""> <b><GetInfo user= {status.uname}/></b> </a>
       <a href="">{status.uname}</a>
       <a href="">{formatDistanceStrict(parseISO(status.createdAt), new Date())}</a>
       <div>
         {status.status}
         </div>
       <div>comments {status.comments}</div>
       <div>repost {status.repost}</div>
       <div>likes {status.likes}</div>
     </article>
       ))}</div>

     )
}

function Home() {
  const [user, setUser] = useState<User[]>([]);
  
  const [recommended, setRecommended] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=> {
    setLoading(true);
    axios.get("http://localhost:5555/users")
    .then((res)=>{
      console.log(res.data.data);
      setUser(res.data.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }, []);

  

  return (
    <>
    <div className='navbanner'>
    <nav aria-label='Primary' role='navigation'>
      <a href="">Home</a>
      <a href="">Explore</a>
      <a href="">Notification</a>
      <a href="">Messages</a>
      <a href="">Lists</a>
      <a href="">Bookmarks</a>
      <a href="">Communities</a>
      <a href="">Premium</a>
      <a href="">Profile</a>

    </nav>
    </div>
    
    <div>
      {loading ? (<Spinner />):
       (<div>
          <GetStatus />
       </div>)}
      
    </div>
    </>
  )
}


export default Home
