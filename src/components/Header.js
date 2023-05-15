import React, { useState } from 'react'
import styled from 'styled-components'
import { IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

function Header() {
  const [ user ] = useAuthState(auth);

  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <HeaderContainer>
      <HeaderLeft>
        {/*
        <MenuIconButton sx={{display: "flex", justifyContent: "flex-end"}}  onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
          <MenuIcon/>
        </MenuIconButton>
        */}
        <h3 className={isNavExpanded ? "expanded" : ""}>Donkey Chat</h3>
      </HeaderLeft>

      <HeaderCenter>
        {/*<SearchIcon/>
        <input placeholder='Search'/>*/}
      </HeaderCenter>

      <HeaderRight>
        <Profile>
          <ProfileIconButton onClick={() => alert('Hi ' + user?.displayName)}>
            <ProfileAvatar src={user?.photoURL} alt={user?.displayName} />
          </ProfileIconButton>
        </Profile>
        <Button onClick={() => auth.signOut()}>
          <LogoutIcon/>
        </Button>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  background-color: var(--chatonit-topnav-bg);
  color: #fff;
  display: flex;
  position: fixed;
  padding: 0 25px;

/* position fixed inside a flex element 
  https://stackoverflow.com/a/45926286 */
  top: 0;
  left: 0;
  right: 0;
`

const HeaderLeft = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  h3 {
    color: var(--chatonit-gray-700);
    padding-left: 20px; 
    font-size: 18px;
  }

  /*
  transition: 0.2s ease-out;
  transform: translateX(0);
  opacity: 1;
  &.expanded {
    transform: translateX(100px);
  }

  .MuiSvgIcon-root {
    color: var(--chatonit-gray-700);
  }
  .MuiIconButton-root:hover {
    background-color: transparent;
  }

  @media only screen and (min-width: 600px)  {
    opacity: 0;
  }
  */
`

const MenuIconButton = styled(IconButton)`
`

const HeaderCenter = styled.div`  
  display: flex;
  align-items: center;

  /*
  background-color: var(--chatonit-gray-200);
  text-align: center;
  padding: 3px 30px;
  color: var(--chatonit-gray-400);
  border: 1px solid var(--chatonit-gray-300);
  align-items: center;
  margin: 15px auto;

  input {
    background-color: transparent;
    border-radius: .25rem;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: #fff;
  }
  */
`

const HeaderRight = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;

  margin: 10px 25px;

  button {
    color: var(--chatonit-gray-700);
    min-width: 32px;
    &:hover {
      background-color: var(--chatonit-gray-700);
      color: var(--chatonit-gray-100);
    }
  }
`

const Profile = styled.div`
  margin-right: 25px;

  button {
    &:hover {
      background-color: transparent;
    }
  }
`

const HeaderIconButton = styled(IconButton)`
`
const HeaderAvatar = styled(Avatar)`
`
const ProfileIconButton = styled(IconButton)`
`
const ProfileAvatar = styled(Avatar)`
`
