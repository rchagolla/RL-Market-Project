import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, FormSelect, FloatingLabel } from 'react-bootstrap'
import styled from 'styled-components';
import { User } from '../../../server/models/User';
import { useCurrentUser } from '../hooks/useCurrentUser';

function AccountDetails() {
  const user = useCurrentUser();
  const [usernameErr, setUsernameErr] = useState(false);
  const [bioErr, setBioErr] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    language: ''
  });

  const setField = (field:string, value:string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    setUsernameErr(true);
    setBioErr(true);
  };

  return (
    <Card>
      <Card.Header>Account Details</Card.Header>

      <Card.Body className='mh-100'>
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
                  onChange={e => setField('username', e.target.value)}
                  isInvalid={usernameErr}
                />
                <Form.Control.Feedback type="invalid">
                  Username is invalid.
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
                  onChange={e => setField('bio', e.target.value)}
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
                  <FormSelect name='language' onChange={e => setField('language', e.target.value)}>
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