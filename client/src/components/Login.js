import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const history = useHistory()

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }

  const onSubmit = (e) => {
      e.preventDefault()
      axios
          .post('http://localhost:5000/api/login', {
              username: username,
              password: password
          })
          .then(res => {
              console.log(res);
              localStorage.setItem('token', res.data.payload)
              history.push('/bubbles')
          })
          .catch(err => console.error(err))
      setUsername('');
      setPassword('');
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h4>Login below:</h4>
          <div className='login-form'>
            <form onSubmit={onSubmit}>
                <label>Username: </label>
                <input 
                    type='text' 
                    value={username}
                    onChange={handleUserNameChange} 
                />
                <label>Password: </label>
                <input 
                    type='text'
                    value={password}
                    onChange={handlePasswordChange}
                />
                    <button type='submit'>
                        Login
                    </button>
            </form>
          </div>
    </>
  );
};

export default Login;
