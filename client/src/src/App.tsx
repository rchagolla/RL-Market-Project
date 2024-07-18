import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {Suspense} from 'react';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage></LandingPage>
    },
    {
      path: '/login',
      element: <LoginPage></LoginPage>
    },
    {
      path: '/register',
      element: <RegisterPage></RegisterPage>
    }
  ]);

  return (
    // TODO: center loading spinner
    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
