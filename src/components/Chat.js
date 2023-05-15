import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput.js'
import Message from './Message.js'
import { selectRoomId } from '../features/appSlice.js'
import { Button } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase.js";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading])

	return (
		<ChatContainer>
      {roomDetails && roomMessages && (
        <>
    			<Header>
            <HeaderLeft>
              <h4><strong>#{roomDetails?.data().name}</strong></h4>
              <StarBorderOutlinedIcon/>
            </HeaderLeft>
            <HeaderRight>
              <HeaderDetailsButton onClick={() => alert("Date created: " + roomDetails?.data().timestamp.toDate())}>
                <InfoOutlinedIcon/> Details
              </HeaderDetailsButton>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map(doc => {
              const  { message, timestamp, user, userImage } = doc.data();

              return (
                <Message 
                  key = {doc.id} 
                  message = {message} 
                  timestamp = {timestamp} 
                  user = {user} 
                  userImage = {userImage} 
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef = {chatRef}
            channelName = {roomDetails?.data().name}
            channelId = {roomId}
          />

        </>
      )}
		</ChatContainer>
	)
}

export default Chat

const ChatContainer = styled.div`  
  //margin-top: 60px;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`
const Header = styled.div`
  margin-top: 135px;
  @media only screen and (min-width: 600px)  {
    margin-top: 75px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 5px;

  border-bottom: 1px solid var(--chatonit-border-color);
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  h4 {
    text-transform: lowercase;
    margin-right: 10px;
    color: #fff;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
  }

`
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  button {  
    font-size: 14px;
    color: var(--chatonit-gray-500);
    text-transform: inherit;
    :hover {
      background-color: transparent;
    }
  }
  .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }

`
const HeaderDetailsButton = styled(Button)`
`

const ChatMessages = styled.div`
  //border: 1px solid var(--chatonit-border-color);
  //background-color: var(--chatonit-gray-200);
  overflow-y: auto;

  margin: auto 0 0;
  padding: 0 15px;
`
const ChatBottom = styled.div`
  //padding-bottom: 100px;
`
