import { Form, Card, Button, FloatingLabel, FormSelect } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuthentication();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const setField = (field:string, value:string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // TODO: check user info with DB
    const success = await loginUser(formData.username, formData.password);

    // logged in
    if (success) {
      navigate('/home');
    } else {
      // username or password error
      setError(true);
    }
  };

  return (
    <Container>
      <Card id='registercard' className='text-center'>
        <Card.Header>Login</Card.Header>

        <Card.Body>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              {/* Username Input */}
              <Form.Group className='mb-3' controlId='username'>
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    onChange={e => setField('username', e.target.value)}
                    isInvalid={error}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password or Username Does not match.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              {/* Password Input */}
              <Form.Group className='mb-3' controlId='password'>
                <FloatingLabel controlId="floatingInput" label="Password">
                  <Form.Control 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    onChange={e => setField('password', e.target.value)}
                    isInvalid={error}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password or Username Does not match.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Button type='submit'> Sign In </Button>

              <p className='fs-6'> Don't have an account? <a href='/register'>Sign Up</a> </p>

            </Form>
          </FormContent>
        </Card.Body>
      </Card>
    </Container>
  )
}

const Container = styled('div')`
  padding-left: 25%;
  padding-right: 25%;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const FormContent = styled('div')`
  padding-left: 25%;
  padding-right: 25%;
`;

const SelectGroup = styled('div')`
  padding-right: 35%;
  padding-left: 35%;
`;

export default LoginPage