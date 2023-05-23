import React, { useState } from 'react'
import './Join.css';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
let user;
const sendUser=()=>{
  user= document.querySelector('#joinInput').value;
  document.querySelector('#joinInput').value='';

 }
const Joins = () => {
const [name,setName] = useState('');
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="" />
      <h1> LIT CHATTERS</h1>
      <input onChange ={(e)=>setName(e.target.value)} type="text" id = 'joinInput' placeholder='enter your name' />
      <Link onClick={(event)=>!name?event.preventDefault:null} to = '/chat'>
      <button onClick={sendUser} className = "joinbtn">Login In</button>
      </Link>
      </div>
    </div>
  )
}

export default Joins;
export {user}