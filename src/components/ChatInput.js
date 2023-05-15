import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { db, auth } from '../firebase'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('');
  const [ user ] = useAuthState(auth);
  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    if (input) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput('');
  }

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  });

  return (
    <ChatInputContainter>
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Enter message...`}/>
        {/*#${channelName}*/}
        <Button hidden type="submit" onClick={sendMessage}>
          Send
          <SendIcon/>
        </Button>
      </form>
    </ChatInputContainter>
  )
}

export default ChatInput

const ChatInputContainter = styled.div`
  margin: 5px 0 0;
  //margin-top: auto;
  padding: 20px 40px 20px 25px;
  border-top: 1px solid var(--chatonit-border-color);
  form {
    display: flex;
    input {
      border: 1px solid var(--chatonit-border-color);
      background-color: var(--chatonit-gray-200);
      color: var(--chatonit-gray-700);
      border-radius: .25rem;
      padding: 20px;
      outline: none;
      
      flex: 1;
      :focus {
        background-color: var(--chatonit-gray-300);
      }
    }
    button {
      border: 1px solid var(--chatonit-btn-border-color);
      background-color: var(--chatonit-btn-bg);
      color: var(--chatonit-gray-700);
      padding: 0 20px;
      margin-left: 20px;
      text-transform: inherit;
      font-weight: 700;
      font-size: 15px;
      .MuiSvgIcon-root {
        padding-left: 10px;
        font-size: 18px;
        padding-bottom: 3px;
      }
    }
  }
`