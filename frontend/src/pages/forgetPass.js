import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as axios from 'axios';

import '../css/index.css';

const ForgetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPass, setNewPass] = useState('');
  // const [verifyUser, setVerifyUser] = useState(false);
  // const [resetPass, setResetPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetPassButton, setShowResetPassButton] = useState(false);
  const [dob, setDob] = useState('');

  const getAge = (DOB) => {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const verifyUserHandler = (event) => {
    event.preventDefault();
    if (username.length < 3 || getAge(dob) < 18) {
      setErrorMessage('Enter proper input');
      setShowError(true);
    } else {
      setErrorMessage('');
      setShowError(false);
      axios
        .post('http://localhost:4000/verifyUser', {
          username: username,
          dob: dob,
        })
        .then((response) => {
          console.log(response);
          setShowResetPassButton(true);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.message);
          setShowError(true);
        });
    }
  };

  const resetPassHandler = (event) => {
    event.preventDefault();
    if (newPass.length < 5) {
      setErrorMessage('Password should be greater than 5');
      setShowError(true);
    } else {
      setErrorMessage('');
      setShowError(false);
      axios
        .post('http://localhost:4000/resetPass', {
          username: username,
          newPass: newPass,
        })
        .then((response) => {
          console.log(response);
          window.location.href = './login';
        })
        .catch((error) => {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
          setShowError(true);
        });
    }
  };

  // useEffect(() => {
  //   if (verifyUser === true) {
  //     if (username.length < 3 || getAge(dob) < 18) {
  //       setErrorMessage('Enter proper input');
  //       setShowError(true);
  //     } else {
  //       setErrorMessage('');
  //       setShowError(false);
  //       axios
  //         .post('http://localhost:4000/verifyUser', {
  //           username: username,
  //           dob: dob,
  //         })
  //         .then(function (response) {
  //           console.log(response);
  //           setShowResetPassButton(true);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           setErrorMessage(error.response.data.message);
  //           setShowError(true);
  //         });
  //     }
  //     setVerifyUser(false);
  //   }
  // }, [verifyUser]);

  // useEffect(() => {
  //   if (resetPass === true) {
  //     if (newPass.length < 5) {
  //       setErrorMessage('Password should be greater than 5');
  //       setShowError(true);
  //     } else {
  //       setErrorMessage('');
  //       setShowError(false);
  //       axios
  //         .post('http://localhost:4000/resetPass', {
  //           username: username,
  //           newPass: newPass,
  //         })
  //         .then(function (response) {
  //           console.log(response);
  //           window.location.href = './login';
  //         })
  //         .catch(function (error) {
  //           console.log(error.response);
  //           setErrorMessage(error.response.data.message);
  //           setShowError(true);
  //         });
  //     }
  //     setResetPass(false);
  //   }
  // }, [resetPass]);

  const resetPassButton = () => {
    return (
      <Form.Group controlId="loginPassword">
        <Form.Label className="input">New Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          className="text"
          onChange={(e) => setNewPass(e.target.value)}
        />
      </Form.Group>
    );
  };

  return (
    <div className="main">
      <div className="header">Password Reset</div>
      {showError && <div className="errorMessage">{errorMessage}</div>}
      <div className="form">
        <Form
          className="auth-form"
          onSubmit={showResetPassButton ? resetPassHandler : verifyUserHandler}
        >
          <Form.Group controlId="loginUsername">
            <Form.Label className="input">Username</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="name"
              className="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="loginDob">
            <Form.Label className="input">Date of birth</Form.Label>
            <Form.Control
              type="date"
              name="name"
              placeholder="name"
              className="text"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>

          {showResetPassButton && resetPassButton()}
          {!showResetPassButton && (
            <Button
              variant="dark"
              className="button"
              type="submit"
              // onClick={() => setVerifyUser(true)}
            >
              Verify
            </Button>
          )}
          {showResetPassButton && (
            <Button
              variant="dark"
              className="button"
              type="submit"
              // onClick={() => setResetPass(true)}
            >
              Reset
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
