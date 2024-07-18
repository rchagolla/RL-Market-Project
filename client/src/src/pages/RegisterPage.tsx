import { Form, Card, Button, FloatingLabel, FormSelect } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {

  return (
    <Container>
      <Card id='registercard' className='text-center'>
        <Card.Header>Sign Up</Card.Header>

        <Card.Body>
          <FormContent>
            <Form>
              {/* Email Input */}
              <Form.Group className='mb-3'>
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Form.Control type="text" placeholder="Username" />
                </FloatingLabel>
              </Form.Group>

              {/* Password Input */}
              <Form.Group className='mb-3'>
                <FloatingLabel controlId="floatingInput" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters and numbers,
                  and must not contain spaces, special characters, or emoji.
                </Form.Text>
              </Form.Group>

              {/* Password Re-type */}
              <Form.Group className='mb-3'>
                <FloatingLabel controlId="floatingInput" label="Re-type Password">
                  <Form.Control type="password" placeholder="Re-type Password" />
                </FloatingLabel>
              </Form.Group>

              {/* Bio Input */}
              <Form.Group className='mb-3'>
                <FloatingLabel controlId="floatingInput" label="Bio">
                  <Form.Control as="textarea" placeholder="Bio" />
                </FloatingLabel>
              </Form.Group>

              {/* Language Selection */}
              <Form.Group>
                <SelectGroup>
                  <FormSelect>
                    <option value='en'> English </option>
                    <option value='es'> Spanish </option>
                    <option value='fr'> French </option>
                  </FormSelect>
                </SelectGroup>
              </Form.Group>

              <Button> Register </Button>

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
  padding-right: 65%;
`;

export default RegisterPage