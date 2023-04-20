import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as axios from 'axios';
import '../css/index.css';
import { getCookie, setCookie } from '../util/cookies';

function CreateLobby() {
  const [lobbyname, setLobbyname] = useState('');
  const [password, setPassword] = useState('');
  // const [createLobby, setCreateLobby] = useState(false);
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
      setErrorMessage('Enter proper input');
      setShowError(true);
    } else {
      setErrorMessage('');
      setShowError(false);
      axios
        .post('http://localhost:4000/createlobby', {
          lobbyname: lobbyname,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          setCookie('lobbyname', lobbyname);

          window.location.href = `./chat?user=${username}&&lobbyname=${lobbyname}`;
        })
        .catch(function (error) {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
          setShowError(true);
        });
    }
  }

  // useEffect(() => {
  //   if (createLobby == true) {
  //     if (lobbyname.length < 3 || password.length < 5) {
  //       setErrorMessage('Enter proper input');
  //       setShowError(true);
  //     } else {
  //       setErrorMessage('');
  //       setShowError(false);
  //       axios
  //         .post('http://localhost:4000/createlobby', {
  //           lobbyname: lobbyname,
  //           password: password,
  //         })
  //         .then(function (response) {
  //           console.log(response);
  //           setCookie('lobbyname', lobbyname);

  //           window.location.href = `./chat?user=${username}&&lobbyname=${lobbyname}`;
  //         })
  //         .catch(function (error) {
  //           console.log(error.response);
  //           setErrorMessage(error.response.data.message);
  //           setShowError(true);
  //         });
  //     }
  //     setCreateLobby(false);
  //   }
  // }, [createLobby]);

  return (
    <div className="main">
      <div className="header">Create a lobby</div>
      {showError && <div className="errorMessage">{errorMessage}</div>}
      <div className="form">
        <Form className="auth-form" onSubmit={submitHandler}>
          <Form.Group controlId="loginLobbyname">
            <Form.Label className="input">Lobbyname</Form.Label>
            <Form.Control
              type="text"
              name="lobbyname"
              placeholder="Lobby name (Min length:3)"
              className="text"
              onChange={(e) => setLobbyname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label className="input">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password (Min length:5)"
              className="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            className="create-btn"
            type='submit'
            // onClick={() => setCreateLobby(true)}
          >
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default CreateLobby;
