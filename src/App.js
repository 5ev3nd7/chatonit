import React from 'react';
import './App.css';
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Chat from './components/Chat.js';
import People from './components/People.js';
import Login from './components/Login.js';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Spinner from 'react-spinkit'

function App() {
  const [ user, loading ] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <Spinner name="ball-spin-fade-loader" color="grey" fadeIn="none"/>
        </AppLoadingContents>
      </AppLoading>
    )
  }
  return (
    <div className="app">

      <Router>
        {!user ? (
          <Login/>
        ) : (
          <>
            <Header/>
            <AppBody>
              <Sidebar/>
              <Routes>
                <Route path="/" element={<Chat/>}/>
                {/*<Route path="/people" element={<People/>}/>*/}
              </Routes>
            </AppBody>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh; 
`
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
