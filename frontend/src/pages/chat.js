import { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';

import '../css/chat.css';
import { getCookie, deleteCookie } from '../util/cookies';
import logo from '../images/LOGO.png';

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const lobbyname = new URLSearchParams(window.location.search).get(
    'lobbyname'
  );
  const username = new URLSearchParams(window.location.search).get('user');
  const [messages, setMessages] = useState([]);
  const messagesEnd = useRef(null);

  const authUser = getCookie('username');

  if (authUser === null || username !== authUser) {
    alert('User not logged in. Redirecting to login page');
    window.location.href = './login';
  } else {
    const authLobby = getCookie('lobbyname');

    if (authLobby === null || lobbyname !== authLobby) {
      alert('Lobby not logged in. Redirecting to lobby page');
      window.location.href = './lobby?user=' + username;
    }
  }

  const socket = io(`http://localhost:4000/`, { transports: ['websocket'] });

  // Join chatroom
  useEffect(() => {
    socket.emit('joinRoom', { username, lobbyname });
  }, []);

  // Get room and users
  socket.on('roomUsers', ({ users }) => {
    setUserlist(users);
  });

  // Message from server
  socket.on('message', (message) => {
    setMessages((prevState) => [...prevState, message]);
  });

  useEffect(() => {
    // used for scrolling the chat smoothly
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // On Submitting the message/form
  const handleSubmit = (msg) => {
    setMessage('');
    socket.emit('chatMessage', { username, lobbyname, msg });
  };

  const handleKeyUp = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13) && message.trim().length > 0) {
      handleSubmit(message);
    }
  };

  // On Submitting the message/form
  const leaveLobby = () => {
    deleteCookie('lobbyname');
    window.location.href = './lobby?user=' + username;
  };
  // On Submitting the message/form
  const signOut = (msg) => {
    deleteCookie('username');
    deleteCookie('lobbyname');
    window.location.href = './login';
  };

  return (
    <div className="chat-main">
      <div className="chat-header">
        <img src={logo} alt="fastext messenger" className="chat-image" />
        <h1 className="chat-heading">Fastext</h1>
      </div>
      <div className="row chat-message">
        <div className="chat-sidebar col-lg-3 ">
          <h2>{username}</h2>
          <Button className="chat-btn1" onClick={() => leaveLobby()}>
            Leave Lobby
          </Button>
          <Button className="chat-btn2" onClick={() => signOut()}>
            Sign out
          </Button>
          <h3>Lobby Name</h3>
          <h4>{lobbyname}</h4>
          <h3>People</h3>
          <div>
            {userlist.map((user, key) => (
              <div id={key}>{user.username}</div>
            ))}
          </div>
        </div>

        <div className="chat-message col-lg-9 ">
          <div className="message-display">
            {messages && messages.length
              ? messages.map((message, index) => (
                  <div
                    className={`msg-container${
                      message.username === username
                        ? '-right'
                        : message.username !== 'ChatCord Bot'
                        ? '-left'
                        : ''
                    }`}
                    key={index}
                  >
                    {message.username !== 'ChatCord Bot' && (
                      <div className="msg-header"> {message.username}</div>
                    )}

                    <div className="msg-content"> {message.text}</div>

                    {message.username !== 'ChatCord Bot' && (
                      <div className="time-right"> {message.time}</div>
                    )}
                  </div>
                ))
              : null}
            <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
          </div>
          <input
            className="chat-input "
            type="text"
            placeholder="Enter Message"
            value={message}
            onKeyUp={handleKeyUp}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />
          <Button className="chat-send" onClick={() => handleSubmit(message)}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
