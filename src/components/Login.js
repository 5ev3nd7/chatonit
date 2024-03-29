import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'

function Login() {
  const signIn = e => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((error) => 
    alert(error.message));
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="/chatonit_logo.png" alt=""/>
        <p>Sign in to</p>
        <h1>ChatOnit</h1>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0, 0.12), 0 1px 2px rgba(0,0,0, 0.24);

  img {
    object-fit: contain;
    height: 300px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 50px;
    text-transform: inherit!important;
    background-color: #0a8d48!important;
    color: #fff;
  }
`