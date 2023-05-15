import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

function Message( {message, timestamp, user, userImage }) {
  const time_ago = new Date(timestamp?.toDate()).toUTCString();

  return (
    <MessageContainer>
      <img src={userImage} alt=""/>
      <MessageInfo>
        <h4>
          {user}{' '}
          <span>{moment(time_ago).fromNow()}</span>
        </h4>
        <p>
          {message}
        </p>
      </MessageInfo>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
  display: flex;
  align-items: start;
  padding: 10px;

  img {
    height: 40px;
    border-radius: 50%;
  }
`
const MessageInfo = styled.div`
  color: var(--chatonit-gray-500);
  //border: 1px solid var(--chatonit-border-color);
  background-color: var(--chatonit-gray-300);
  padding: 15px;
  margin-left: 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  position: relative;
  :before {
    border-color: var(--chatonit-gray-300) var(--chatonit-gray-300) transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: "";
    left: -10px;
    position: absolute;
    top: 0px;
  }

  h4 {
    color: var(--chatonit-gray-700);
    span {
      color: var(--chatonit-text-muted);
      font-weight: 300;
      margin-left: 4px;
      font-size: 10px;
    }
  }

`