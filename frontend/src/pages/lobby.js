import { Button } from 'react-bootstrap';

import '../css/index.css';
import { getCookie } from '../util/cookies';

const Lobby = () => {
  const username = new URLSearchParams(window.location.search).get('user');
  const authUser = getCookie('username');

  if (authUser === null || username !== authUser) {
    alert('User not logged in. Redirecting to login page');
    window.location.href = './login';
  }

  return (
    <div className="lobby">
      <div className="header">Hey, {username}</div>
      <Button
        className="lobby-btn1"
        onClick={() => {
          window.location.href = `./joinLobby?user=${username}`;
        }}
      >
        Join Lobby
      </Button>
      <div className="lobby-text">OR</div>
      <Button
        className="lobby-btn2"
        onClick={() => {
          window.location.href = `./createLobby?user=${username}`;
        }}
      >
        Create Lobby
      </Button>
    </div>
  );
};

export default Lobby;
