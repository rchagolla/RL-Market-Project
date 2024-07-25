import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider,  useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import { useCurrentUser } from "./hooks/useCurrentUser";

const queryClient = new QueryClient();

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<RequireAuth Component={HomePage} FallbackComponent={LandingPage} />),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}

/**
 * Prevents routes from being accessed if not logged in.
 */
function RequireAuth({
  Component,
  FallbackComponent,
}: {
  Component: React.FC;
  FallbackComponent?: React.FC;
}) {
  const user = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null && !FallbackComponent) {
      navigate("/", { replace: true });
    }
  }, [user, FallbackComponent]);

  if (user == null) {
    return FallbackComponent == null ? null : <FallbackComponent />;
  }

  return <Component />;
}