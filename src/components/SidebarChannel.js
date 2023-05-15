import React from 'react'
import styled from "styled-components";
import { useDispatch } from "react-redux"
import { enterRoom } from '../features/appSlice.js'
import { db } from "../firebase";

function SidebarChannel({ Icon, title, id }) {
  const dispatch = useDispatch();

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        roomId: id,
      }))
    }
  };

  return (
    <SidebarChannelContainer onClick={selectChannel}>
      {Icon && <Icon fontSize='small' style={{ padding: 10 }}/>}
      {Icon ? (
        <h3>{title}</h3>
      ): (
        <SidebarChannelItem>
          <span>#</span> {title}
        </SidebarChannelItem>
      )}
    </SidebarChannelContainer>
  )
}

export default SidebarChannel

const SidebarChannelContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 5px;
`

const SidebarChannelItem = styled.h3`
  padding: 7px 10px 7px 10px;
  font-weight: 300;
  width: 100%;
  margin-left: 20px;

  span {
    padding: 1px;
  }
  @media only screen and (min-width: 600px)  {
    padding: 7px 25px;
    margin-left: 0;
    span {
      padding: 15px;
    }
  }

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  @media only screen and (min-width: 600px)  {
    :hover {
      background-color: var(--chatonit-gray-300);
      cursor: pointer;
      text-decoration: none;
    }
  }

  @media only screen and (min-width: 600px) and (max-width: 920px)  {
    padding: 7px 10px;
    span {
      padding: 1px;
    }
  }
`
