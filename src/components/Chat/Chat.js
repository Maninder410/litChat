import React, { useEffect, useState } from 'react'
import {user} from '../Join/Joins';
import socketIo from 'socket.io-client';
import './chat.css';
import sendLogo from '../images/send.png'
import Message from '../Message/Messages';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../images/closeIcon.png';
const ENDPOINT = 'https://chatapp4u.onrender.com/';
//for local host endpoint is http://localhost:4000/
let socket;
const Chat = () => {
   const[id,setid]= useState('');
   const [messages,setmessages] = useState([]);
    const send=()=>{
      const message = document.querySelector('#chatInput').value;
        socket.emit('message',{message,id});
        document.querySelector('#chatInput').value='';
    }
    console.log(messages);
    useEffect(()=>{
        socket = socketIo(ENDPOINT,{transports:['websocket']});
    socket.on('connect',()=>{
        setid(socket.id);
    })
    socket.emit('joined',{user})//send user to backend
    socket.on(`welcome `,(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
    })
    socket.on('userJoined',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
    })
    socket.on('leave',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
    })
    return ()=>{
    socket.disconnect();
    socket.off();
    }
   },[])
   useEffect(()=>{
socket.on('sendMessage',(data)=>{
setmessages([...messages,data]);
console.log(data.user,data.message,data.id);

})
return ()=>{
socket.off();
}
   },[messages])
  return (
    <div className='chatPage'>
        <div className="chatContainer">
        <div className="header">
           <h2>lit chat</h2>
           <a href  = '/'>  <img src={closeIcon} alt = "close"/></a>
        </div>
        <ReactScrollToBottom className="chatBox">
         {
            messages.map((item,i)=><Message user={item.id ===id?'':item.user} message = {item.message} classs={item.id ===id?'right':'left'}/>)
         }
        </ReactScrollToBottom>
        <div className="inputBox">
        <input onKeyPress={(event)=>event.key === 'Enter'?send():null}type="text" name = "" id = 'chatInput' />
        <button className='sendBtn' onClick={send}><img src={sendLogo} alt = 'send'/></button>
        </div>
    </div>
    </div>
  )
}

export default Chat