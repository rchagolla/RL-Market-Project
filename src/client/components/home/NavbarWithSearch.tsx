import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthentication } from '../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';

export function NavbarWithSearch() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { logoutUser } = useAuthentication();

  async function logout() {
    const success = await logoutUser();
    if (success) {
      navigate('/');
    } else {
      console.log('error logging out!');
    }
  };
  
  return (
    <NavbarContainer>
      <Navbar>
        <Container fluid className='justify-content-left'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/rlmarket(2).png"
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <h1>Welcome {user?.username}!</h1>
          <Button onClick={logout}>Logout</Button>
        </Container>
      </Navbar>
    </NavbarContainer>
  );
}

const NavbarContainer = styled('div')`
  
`;