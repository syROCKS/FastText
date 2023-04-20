import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as axios from 'axios';

import '../css/index.css';
import { getCookie, setCookie } from '../util/cookies';

function JoinLobby() {
  const [lobbyname, setLobbyname] = useState('');
  const [password, setPassword] = useState('');
  // const [joinLobby, setJoinLobby] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const username = new URLSearchParams(window.location.search).get('user');
  const authUser = getCookie('username');

  if (authUser === null || username !== authUser) {
    alert('User not logged in. Redirecting to login page');
    window.location.href = './login';
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (lobbyname.length < 3 || password.length < 5) {
      setErrorMessage('Invalid LobbyName or Password');
      setShowError(true);
    } else {
      setErrorMessage('');
      setShowError(false);
      axios
        .post('http://localhost:4000/joinlobby', {
          lobbyname: lobbyname,
          password: password,
        })
        .then((response) => {
          console.log(response);
          setCookie('lobbyname', lobbyname);
          window.location.href = `./chat?user=${username}&&lobbyname=${lobbyname}`;
        })
        .catch((error) => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
          setShowError(true);
        });
    }
  };

  // useEffect(() => {
  //   if (joinLobby == true) {
  //     if (lobbyname.length < 3 || password.length < 5) {
  //       setErrorMessage('Invalid LobbyName or Password');
  //       setShowError(true);
  //     } else {
  //       setErrorMessage('');
  //       setShowError(false);
  //       axios
  //         .post('http://localhost:4000/joinlobby', {
  //           lobbyname: lobbyname,
  //           password: password,
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           setCookie('lobbyname', lobbyname);
  //           window.location.href = `./chat?user=${username}&&lobbyname=${lobbyname}`;
  //         })
  //         .catch((error) => {
  //           console.log(error.response);
  //           setErrorMessage(error.response.data.message);
  //           setShowError(true);
  //         });
  //     }
  //     setJoinLobby(false);
  //   }
  // }, [joinLobby]);

  return (
    <div className="main">
      <div className="header">Join a lobby</div>
      {showError && <div className="errorMessage">{errorMessage}</div>}
      <div className="form">
        <Form className="auth-form" onSubmit={submitHandler}>
          <Form.Group controlId="loginuser">
            <Form.Label className="input">Lobbyname</Form.Label>
            <Form.Control
              type="text"
              name="LobbyName"
              placeholder="LobbyName"
              className="text"
              onChange={(e) => setLobbyname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label className="input">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            className="join-btn"
            type="submit"
            // onClick={() => setJoinLobby(true)}
          >
            Join
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JoinLobby;
