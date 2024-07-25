import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import nullthrows from "nullthrows";
import { rpcClient } from "typed-rpc";
// import { APIService } from '../server/server';
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from './components/pages/RegisterPage';
import HomePage from "./components/pages/HomePage";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

// export const api = rpcClient<APIService>('http://localhost:5000/rpc')

function onLoad() {
  const rootElement = document.getElementById("root");
  const root = ReactDOM.createRoot(rootElement!);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
  ]);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

window.addEventListener("load", onLoad);