import React, {useState} from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { products, qualities, slots } from '@rocketleagueapi/items';
import { Card, Row, Container, Pagination, Modal, Button } from 'react-bootstrap';
import { NavbarWithSearch } from '../home/NavbarWithSearch';
import { api } from '../../api';

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
  const [itemSold, setItemSold] = useState(false);

  // used for item format
  const totalPages = 129;
  const itemsPerPage = 49;
  const prods: ProductCollection = products as ProductCollection;
  const productsArr = Object.entries(prods);
  const [slicedProducts, setSlicedProducts] = useState(productsArr.slice(0, itemsPerPage));

  // used for pagination format
  const [pagesArr, setPagesArr] = useState(Array.from({length: 10}, (_, i) => i + 1));
  const [isFirstDisabled, setIsFirstDisabled] = useState(true);
  const [isLastDisabled, setIsLastDisabled] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  // modal states
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(productsArr[0]);

  function handleShow(itemId: string) {
    const item = productsArr.filter(([key, value]) => key === itemId);
    setSelectedItem(item[0]);
    setShow(true);
  }

  async function handleSell(itemId: string) {
    const success = await api.sellItem(itemId);

    handleClose();
  }

  const handleClose = () => setShow(false);

  // change items on page
  function changePage(page:number) {
    setCurrPage(page);
    const newEnd = page * itemsPerPage;
    const newStart = newEnd - itemsPerPage;
    setSlicedProducts(productsArr.slice(newStart, newEnd));
  }

  // decrement page
  function prevPage() {
    if (currPage === 1) {
      return;
    }

    const newPage = currPage - 1;
    const newEnd = newPage * itemsPerPage;
    const newStart = newEnd - itemsPerPage;
    setSlicedProducts(productsArr.slice(newStart, newEnd));
    setCurrPage(newPage);
  }

  // increment page
  function nextPage() {
    if (currPage === 129) {
      return;
    }

    const newPage = currPage + 1;
    const newEnd = newPage * itemsPerPage;
    const newStart = newEnd - itemsPerPage;
    setSlicedProducts(productsArr.slice(newStart, newEnd));
    setCurrPage(newPage);
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
    <>
      <NavbarWithSearch />
      
      <Container  fluid className='p-3'>

        <Pagination className='justify-content-center mt-5'>
          <Pagination.First disabled={isFirstDisabled} onClick={() => updatePagination(-1)}></Pagination.First>
          <Pagination.Prev onClick={prevPage}></Pagination.Prev>
          {pagesArr.map((i) => (
            <Pagination.Item onClick={() => changePage(i)} key={i}>{i}</Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage}></Pagination.Next>
          <Pagination.Last disabled={isLastDisabled} onClick={() => updatePagination(1)}></Pagination.Last>
        </Pagination>

        <Row className='justify-content-center mb-3'>
          page {currPage} of {totalPages}
        </Row>

        <Row className='justify-content-center mb-3'>
          {slicedProducts.map(([key, value]) => (
            <Card className='m-2' style={{ width: '13%' }} key={key} onClick={() => handleShow(key)}>
              <Card.Img variant="top" src="img/comingSoon.jpeg" />
              <Card.Body>
                <Card.Title>{value.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>

        {/* TODO: Refactor modal to it's own component */}
        <Modal 
          show={show}
          onHide={handleClose}
          className='justify-content-center text-center'
          centered
          size='lg'
        > 
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem[1].name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img
              src='img/comingSoon.jpeg'
              width='50%'
            />
            <br />
            <br />

            <Button className='m-2' variant='outline-secondary' size='sm'> {qualities[selectedItem[1].quality]} </Button>
            <Button variant='outline-secondary' size='sm'> {slots[selectedItem[1].slot]} </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" size='lg' onClick={handleClose}>
              Buy
            </Button>
            <Button variant="danger" size='lg' onClick={() => handleSell(selectedItem[0])}>
              Sell
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className='justify-content-center mb-3'>
          page {currPage} of {totalPages}
        </Row>

        <Pagination className='justify-content-center'>
          <Pagination.First disabled={isFirstDisabled} onClick={() => updatePagination(-1)}></Pagination.First>
          <Pagination.Prev onClick={prevPage}></Pagination.Prev>
          {pagesArr.map((i) => (
            <Pagination.Item onClick={() => changePage(i)} key={i}>{i}</Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage}></Pagination.Next>
          <Pagination.Last disabled={isLastDisabled} onClick={() => updatePagination(1)}></Pagination.Last>
        </Pagination>
      </Container>
    </>
  )
}

export default HomePage;