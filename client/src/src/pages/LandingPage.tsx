import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className='display-1 text-center'> Welcome To CS Slots! </h1>
      <br></br>
      <br></br>

      <Stack gap={2} className='col-md-2 mx-auto'>
        <Button variant='primary' onClick={() => navigate('/login')}>Login</Button>
        <Button variant='secondary' onClick={() => navigate('/register')}>Register</Button>
      </Stack>
    </Container>
  )
}

const Container = styled("div")`
  padding: 5%;
`;

export default LandingPage