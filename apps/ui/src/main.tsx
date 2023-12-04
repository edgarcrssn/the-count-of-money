import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './app/pages/home/home'
import Login from './app/pages/login/login'
import Register from './app/pages/register/register'
import GoogleRedirect from './app/pages/google-redirect/google-redirect'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthLayout from './app/components/layouts/AuthLayout/AuthLayout'
import DashboardLayout from './app/components/layouts/DashboardLayout/DashboardLayout'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [{ path: '', element: <Home /> }],
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/google-redirect',
      element: <GoogleRedirect />,
    },
  ])

  const queryClient = new QueryClient()

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors />
        <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
