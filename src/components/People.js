import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { useDocument, useCollection } from "react-firebase-hooks/firestore";

import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase'

function People() {
  const [ user ] = useAuthState(auth);

  console.log(db.collection('users').orderBy('timestamp','asc'));

  return (
    <PeopleContainer>
      <h1>People</h1>
      {user.displayName}
    </PeopleContainer>
  )
}

export default People

const PeopleContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`