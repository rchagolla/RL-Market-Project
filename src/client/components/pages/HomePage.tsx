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
  // const [currPaginationStart, setCurrPaginationStart] = useState(1);

  // change items on page
  function changePage(page:number) {
    const newEnd = page * itemsPerPage;
    const newStart = newEnd - itemsPerPage;
    setSlicedProducts(productsArr.slice(newStart, newEnd));
  }

  // change pagination numbers
  function updatePagination(offset:number) {
    // edge case errors
    if (pagesArr[9] === 10 && offset === -1) {
      return;
    }

    if (pagesArr[8] === 129 && offset === 1) {
      return;
    }

    // handling last section of pagination of 9
    if (pagesArr[9] === 120 && offset === 1) {
      setPagesArr(Array.from({length: 9}, (_, i) => 121 + i));
      return;
    }

    // update pagination section
    if (offset === 1) {
      const newStart = pagesArr[9] + 1;
      setPagesArr(Array.from({length: 10}, (_, i) => newStart + i));
    } else if (offset === -1) {
      const newStart = pagesArr[0] - 10;
      setPagesArr(Array.from({length: 10}, (_, i) => newStart + i));
    }


    // if (currPaginationStart === 1 && offset === -1) {
    //   return;
    // }

    // if (currPaginationStart === 121 && offset === 1) {
    //   return;
    // }

    // // update pagination start
    // if (offset === 1) {
    //   const newStart = currPaginationStart + 10;
    //   setCurrPaginationStart(currPaginationStart + 10);

    //   // update pagination values
    //   const newArr = Array.from({length: 10}, (_, i) => newStart + i);
    //   setPagesArr(newArr);
    // } else if (offset === -1) {
    //   const newStart = currPaginationStart - 10;
    //   setCurrPaginationStart(currPaginationStart - 10);

    //   // update pagination values
    //   const newArr = Array.from({length: 10}, (_, i) => currPaginationStart + i);
    //   setPagesArr(newArr);
    // }
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
        <Pagination.First onClick={() => updatePagination(-1)}></Pagination.First>
        {pagesArr.map((i) => (
          <Pagination.Item onClick={() => changePage(i)} key={i}>{i}</Pagination.Item>
        ))}
        <Pagination.Last onClick={() => updatePagination(1)}></Pagination.Last>
      </Pagination>
    </Container>
  )
}

export default HomePage;