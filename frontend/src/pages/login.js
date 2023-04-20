import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as axios from 'axios';

import '../css/index.css';
import { setCookie } from '../util/cookies';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.length < 3 || password.length < 5) {
      setErrorMessage('Invalid UserName or Password');
      setShowError(true);
    } else {
      setErrorMessage('');
      setShowError(false);
      axios
        .post('http://localhost:4000/login', {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          setCookie('username', username);
          window.location.href = './lobby?user=' + username;
        })
        .catch((error) => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
          setShowError(true);
        });
    }
  };

  // useEffect(() => {
  //   if (login === true) {
  // if (username.length < 3 || password.length < 5) {
  //   setErrorMessage('Invalid UserName or Password');
  //   setShowError(true);
  // } else {
  //   setErrorMessage('');
  //   setShowError(false);
  //   axios
  //     .post('http://localhost:4000/login', {
  //       username: username,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       setCookie('username', username);
  //       window.location.href = './lobby?user=' + username;
  //     })
  //     .catch(function (error) {
  //       console.log(error.response);
  //       setErrorMessage(error.response.data.message);
  //       setShowError(true);
  //     });
  // }
  // setLogin(false);
  //   }
  // }, [login]);

  return (
    <div className="main">
      <div className="header"> Fastext</div>
      {showError && <div className="errorMessage">{errorMessage}</div>}
      <div className="form">
        <Form className="auth-form" onSubmit={submitHandler}>
          <Form.Group controlId="loginUsername">
            <Form.Label className="input">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              className="text"
              onChange={(e) => setUsername(e.target.value)}
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
            className="button"
            type="submit"
            // onClick={() => setLogin(true)}
          >
            Sign in
          </Button>
        </Form>
      </div>
      <hr />
      <div className="form">
        New around here?{' '}
        <a className="footer" href="./registerUser">
          Sign up
        </a>
      </div>
      <span style={{textAlign: 'center'}}><a className="footer" href="./forgetpass">
        Forget Password
      </a></span>
    </div>
  );
};

export default Login;
