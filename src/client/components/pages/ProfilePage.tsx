import React from 'react'
import { Button, Container, Tab, Nav, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthentication } from '../hooks/useAuthentication';
import AccountDetails from '../profilePage/AccountDetails';

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
    <Container fluid className='p-4 text-center'>
      <h1>Welcome, {user?.username}!</h1>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Account Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">My Orders</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <AccountDetails></AccountDetails>
              </Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default ProfilePage