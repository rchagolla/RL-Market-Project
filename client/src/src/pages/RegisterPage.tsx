import { Form, Card, Button, FloatingLabel, FormSelect } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const symbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const [usernameError, setUsernameError] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    language: "en",
  });
  // const [errors, setErrors] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  //   bio: "",
  //   language: "",
  // });

  const setField = (field:string, value:string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  };

  // const findErrors = () => {
  //   const {username, password, confirmPassword, bio, language} = formData;
  //   const [newErrors, setNewErrors] = useState({});
  //   if (!username || username === '') {
  //     setNewErrors({
  //       ...newErrors,
  //       ['username']: 'Username can\'t be empty!'
  //     })
  //   }

  //   return newErrors;
  // };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // checks if there is symbols in username
    if (symbols.test(formData.username)){
      setUsernameError(false);
    }

    // checks if password is 8-20 in length and if it contains a letter, number, and symbol
    
  };

  return (
    <Container>
      <Card id='registercard' className='text-center'>
        <Card.Header>Sign Up</Card.Header>

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
                    isInvalid={!usernameError}
                    required
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
                    required
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
                  required
                />
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