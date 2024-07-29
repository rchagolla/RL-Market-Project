import React, {useState} from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { products } from '@rocketleagueapi/items';
import { Card, Row, Container, Pagination } from 'react-bootstrap';
import { NavbarWithSearch } from '../home/NavbarWithSearch';

// 6314 items from products
// 49 items per page
// 129 pages

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

  // used for item format
  const totalPages = 129;
  const itemsPerPage = 49;
  const prods: ProductCollection = products as ProductCollection;
  const productsArr = Object.entries(prods);
  const [slicedProducts, setSlicedProducts] = useState(productsArr.slice(0, 49));

  // used for pagination format
  const [pagesArr, setPagesArr] = useState(Array.from({length: 10}, (_, i) => i + 1));
  const [isFirstDisabled, setIsFirstDisabled] = useState(true);
  const [isLasttDisabled, setIsLastDisabled] = useState(false);

  // change items on page
  function changePage(page:number) {
    const newEnd = page * itemsPerPage;
    const newStart = newEnd - itemsPerPage;
    setSlicedProducts(productsArr.slice(newStart, newEnd));
  }

  // change pagination numbers
  function updatePagination(offset:number) {
    // edge case errors
    if (pagesArr[0] === 1 && offset === -1) {
      setIsFirstDisabled(true);
      return;
    }

    // handling last section of pagination of 9
    if (pagesArr[9] === 120 && offset === 1) {
      setPagesArr(Array.from({length: 9}, (_, i) => 121 + i));
      setIsLastDisabled(true);
      return;
    }

    // update pagination section
    if (offset === 1) {
      const newStart = pagesArr[9] + 1;
      setPagesArr(Array.from({length: 10}, (_, i) => newStart + i));
      setIsFirstDisabled(false);
    } else if (offset === -1) {
      const newStart = pagesArr[0] - 10;
      setPagesArr(Array.from({length: 10}, (_, i) => newStart + i));
      setIsLastDisabled(false);
    }
  }

  return (
    <Container  fluid className='p-3'>
      <NavbarWithSearch />
      <Row className='justify-content-center mb-3'>
        {slicedProducts.map(([key, value]) => (
          <Card className='m-2' style={{ width: '13%' }} key={key}>
            <Card.Img variant="top" src="img/comingSoon.jpeg" />
            <Card.Body>
              <Card.Title>{value.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Pagination className='justify-content-center'>
        <Pagination.First disabled={isFirstDisabled} onClick={() => updatePagination(-1)}></Pagination.First>
        {pagesArr.map((i) => (
          <Pagination.Item onClick={() => changePage(i)} key={i}>{i}</Pagination.Item>
        ))}
        <Pagination.Last disabled={isLasttDisabled} onClick={() => updatePagination(1)}></Pagination.Last>
      </Pagination>
    </Container>
  )
}

export default HomePage;