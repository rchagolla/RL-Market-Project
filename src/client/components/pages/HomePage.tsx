import React, {useState} from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { products } from '@rocketleagueapi/items';
import { Card, ListGroup, Container } from 'react-bootstrap';

interface Product {
  name: string;
  blueprint: boolean;
  special: number;
  paintable: boolean;
  currency: boolean;
  quality: number;
  slot: number;
  tradable: boolean;
  tradeIn: boolean;
};

interface ProductCollection {
  [key: string]: Product;
};

function HomePage() {
  const user = useCurrentUser();
  const prods: ProductCollection = products as ProductCollection;

  return (
    <Container className='p-3'>
      {Object.entries(prods).map(([key, value]) => (
        <Card style={{ width: '18rem' }} key={key}>
          <Card.Img variant="top" src="public/img/comingSoon.jpeg" />
          <Card.Body>
            <Card.Title>{value.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}

      {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="./public/img/comingSoon.jpeg" />
        <Card.Body>
          <Card.Title>pending</Card.Title>
        </Card.Body>
      </Card> */}
    </Container>
  )
}

export default HomePage