import React from 'react'
import styled from "styled-components";
import SidebarChannel from './SidebarChannel.js';
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/compat/app'

import { IconButton, Avatar, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

function Sidebar() {
  const [ channels ] = useCollection(db.collection('rooms'));
  const [ user ] = useAuthState(auth);

  const addChannel = () => {
    const channelName = prompt('Please enter channel name');

    if(channelName) {
      db.collection('rooms').add({
        name: channelName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <SidebarContainer>
      {/*
      <SidebarItem Icon={InsertCommentIcon} title="Threads" />
      <SidebarItem Icon={InboxIcon} title="Meantions & reactions" />
      <SidebarItem Icon={DraftsIcon} title="Saved items" />
      <SidebarItem Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarItem Icon={PeopleAltIcon} title="People and user groups" />
      <SidebarItem Icon={AppsIcon} title="Apps" />
      <SidebarItem Icon={FileCopyIcon} title="File browser" />
      <SidebarItem Icon={ExpandLessIcon} title="Show less" />
      <SidebarItem Icon={PeopleAltIcon} title="People" />
      */}
      <SidebarItem>
        <InsertCommentIcon title="Channels" fontSize='small' style={{ padding: 10 }}/>
        <h3>Channels</h3>
      </SidebarItem>

      {channels?.docs.map((doc) => (
        <SidebarChannel key={doc.id} id={doc.id} title={doc.data().name} />
      ))}

      <SidebarItem>
        <Button onClick={addChannel}>
          <AddIcon title="Add channel" fontSize='small' style={{ padding: 10 }}/>
          <h3>Add channel</h3>
        </Button>
      </SidebarItem>

    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 75px;
  background-color: var(--chatonit-gray-200);
  color: #fff;
  width: 100%;
  white-space: nowrap;
  overflow-y: auto;
  height: 70px;

  @media only screen and (min-width: 600px)  {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    height: auto;

    width: 20%;
    max-width: 200px;
    min-width: 150px;
    margin-top: 75px;
    padding-top: 20px;
  }
`

const SidebarItem = styled.div`
  display: flex;
  font-size: 13px;
  align-items: center;

  .MuiSvgIcon-root {
    margin-left: 15px;
  }

  h3 {
    font-weight: 500;
    margin-right: 10px;
  }

  button {
    display: flex;
    flex: 1;
    justify-content: start;
    text-transform: inherit;
    color: var(--chatonit-gray-700);
    font-size: 12px;
    padding: 1px 10px;

    :hover {
      background-color: var(--chatonit-gray-300);
      cursor: pointer;
    }

    .MuiSvgIcon-root {
      margin-left: 5px;
      padding-left: 0!important;
    }
  }
  &:first-child {
    display: none;
  }
  @media only screen and (min-width: 600px)  {
    &:first-child {
      display: flex;
    }
    h3 {
      margin-right: 0;
    }
    button {
      padding: 7px;
      .MuiSvgIcon-root {
        margin-left: 15px;
      }
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 920px)  {
    .MuiSvgIcon-root {
      margin-left: 1px;
    }
    button {
      .MuiSvgIcon-root {
        margin-left: 1px;
      }
    }
  }
`