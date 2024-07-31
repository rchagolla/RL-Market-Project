import React from 'react';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthentication } from '../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';

export function NavbarWithSearch() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { logoutUser } = useAuthentication();

  // async function logout() {
  //   const success = await logoutUser();
  //   if (success) {
  //     navigate('/');
  //   } else {
  //     // TODO: change to alert
  //     console.log('error logging out!');
  //   }
  // };
  
  return (
    // TODO: Finish navbar
    <NavbarContainer>
      <Navbar>
        <Container fluid className='justify-content-left'>
          <Row className='p-2'>
            <Col>
              <Navbar.Brand href="/">
                <img
                  alt="logo"
                  src="/img/rlmarket.png"
                  width="70"
                  height="70"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
            </Col>
            
            <Col>
              <h3>RL Market</h3>
            </Col>

          </Row>
          <Button className='rounded-pill' size='lg' variant='dark' onClick={() => navigate('/profile')}>
            <AiOutlineUser />
          </Button>
        </Container>
      </Navbar>
    </NavbarContainer>
  );
}

const NavbarContainer = styled('div')`
  background-color: #16191c;
`;