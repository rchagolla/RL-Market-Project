import React, {useState} from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { products } from '@rocketleagueapi/items';
import { Card, Row, Container } from 'react-bootstrap';

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
    <Container  fluid className='p-3'>
      <Row className='justify-content-center'>
        {Object.entries(prods).map(([key, value]) => (
          <Card className='m-2' style={{ width: '13%' }} key={key}>
            <Card.Img variant="top" src="img/comingSoon.jpeg" />
            <Card.Body>
              <Card.Title>{value.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  )
}

export default HomePage