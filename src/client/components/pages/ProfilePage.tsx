import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthentication } from '../hooks/useAuthentication';

function ProfilePage() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { logoutUser } = useAuthentication();

  async function logout() {
    const success = await logoutUser();
    if (success) {
      navigate('/');
    } else {
      // TODO: change to alert
      console.log('error logging out!');
    }
  }

  return (
    <div>
      ProfilePage
      <br></br>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default ProfilePage