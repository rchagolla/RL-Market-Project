import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, FormSelect, FloatingLabel } from 'react-bootstrap'
import styled from 'styled-components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { api } from '../../api';

function AccountDetails() {
  const user = useCurrentUser();
  const [usernameErr, setUsernameErr] = useState(false);
  const [bioErr, setBioErr] = useState(false);
  // MAY NEED TO CHANGE
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const bio = e.target[1].value;
    const language = e.target[2].value
    
    // check username format
    const isUsernameInvalid = await api.isUsernameInvalid(username);
    setUsernameErr(isUsernameInvalid);
    if (usernameErr) {
      return;
    }

    // check bio
    if (bio === '') {
      setBioErr(true);
      return;
    }

    setBioErr(false);
    // save changes/check if username taken.
    const success = await api.modifyUser(username, bio, language);
    if (success) {
      console.log('user details modified!');
      return;
    }

    console.log('username is taken');
  };

  return (
    <Card>
      <Card.Header>Account Details</Card.Header>

      <Card.Body className='mh-100'>
        <img
          alt="logo"
          src="/img/userIcon.png"
          width="70"
          height="70"
          className="rounded-circle mb-4"
        />

        <FormContent>
          <Form onSubmit={handleSubmit}>
            {/* Username Input */}
            <Form.Group as={Row} className="mb-3" controlId="formUsername">
              <Form.Label column>
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type='text'
                  name="username"
                  defaultValue={user?.username}
                  isInvalid={usernameErr}
                />
                <Form.Control.Feedback type="invalid">
                  Username is invalid. (alphanumeric
                  characters only).
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Bio Input */}
            <Form.Group as={Row} className="mb-3" controlId="formBio">
              <Form.Label column>
                Bio 
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as='textarea'
                  name="bio"
                  defaultValue={user?.bio}
                  isInvalid={bioErr}
                />
                <Form.Control.Feedback type="invalid">
                  Bio can't be empty.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Language Selection */}
            <Form.Group className='mb-3'>
              <SelectGroup>
                <FloatingLabel controlId="floatingSelect" label="Preferred language"> 
                  <FormSelect name='language' onChange={e => setPreferredLanguage(e.target.value)}>
                    <option value='en'> English </option>
                    <option value='es'> Spanish </option>
                    <option value='fr'> French </option>
                  </FormSelect>
                </FloatingLabel>
              </SelectGroup>
            </Form.Group>

            <Button type='submit'>Save</Button>

          </Form>
        </FormContent>
      </Card.Body>
    </Card>
  )
}

const FormContent = styled('div')`
  padding-left: 25%;
  padding-right: 25%;
`;

const SelectGroup = styled('div')`
  padding-right: 35%;
  padding-left: 35%;
`;

export default AccountDetails