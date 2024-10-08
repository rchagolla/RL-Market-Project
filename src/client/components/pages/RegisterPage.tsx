import { Form, Card, Button, FloatingLabel, FormSelect, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

function RegisterPage() {
  const navigate = useNavigate();
  const symbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const numberRegex = /\d/;
  const letterRegex = /[a-zA-Z]+/;
  const spaceRegex = /\s/;
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "I am a CS Slots User!",
    language: "en",
  });

  const setField = (field:string, value:string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // username check
    const isUsernameInvalid = await api.isUsernameInvalid(formData.username);
    setUsernameError(isUsernameInvalid);
    if (isUsernameInvalid) {
      return;
    }

    // password check
    const isPasswordInvalid = await api.isPasswordInvalid(formData.password);
    setPasswordError(isPasswordInvalid);
    if (isPasswordInvalid) {
      return;
    }

    // check passwords match
    if (formData.confirmPassword !== formData.password) {
      setConfirmPassError(true);
      return;
    }

    setConfirmPassError(false);
    // send data to server
    const success = await api.createUser(
      formData.username,
      formData.password,
      formData.bio,
      formData.language
    );

    if (success) {
      navigate('/');
    } else {
      setUsernameTaken(true);
      return;
    }
  };

  // TODO: add ids to inputs to stop warnings
  return (
    <Container>
      <Card id='registercard' className='text-center'>
        <Card.Header>Sign Up</Card.Header>

        <Card.Body>
          {usernameTaken && (<Alert variant='danger' dismissible>Username Already Taken.</Alert>)
          }

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
                    isInvalid={usernameError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username (alphanumeric
                    characters only).
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
                    isInvalid={passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    Your password must be 8-20 characters long, contain a letter, number, special character,
                    and must not contain spaces, or emoji.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              {/* Password Re-type */}
              <Form.Group className='mb-3'>
                <FloatingLabel controlId="floatingInput" label="Re-type Password">
                  <Form.Control 
                  type="password"
                  placeholder="Re-type Password"
                  name="passwordConfirm"
                  onChange={e => setField('confirmPassword', e.target.value)}
                  isInvalid = {confirmPassError}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords must match.
                </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              {/* Language Selection */}
              <Form.Group className='mb-3'>
                <SelectGroup>
                  <FloatingLabel controlId="floatingSelect" label="Preferred language"> 
                    <FormSelect name='language' onChange={e => setField('language', e.target.value)}>
                      <option value='en'> English </option>
                      <option value='es'> Spanish </option>
                      <option value='fr'> French </option>
                    </FormSelect>
                  </FloatingLabel>
                </SelectGroup>
              </Form.Group>

              <Button type='submit'> Register </Button>

              <p className='fs-6'> Already have an account? <a href='/login'>Log in</a> </p>

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

export default RegisterPage