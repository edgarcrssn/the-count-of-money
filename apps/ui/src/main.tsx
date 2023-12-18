import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './app/pages/home/home'
import GoogleRedirect from './app/pages/google-redirect/google-redirect'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import DashboardLayout from './app/components/layouts/DashboardLayout/DashboardLayout'
import Profile from './app/pages/profile/profile'
import Cryptocurrencies from './app/pages/cryptocurrencies/cryptocurrencies'
import Articles from './app/pages/articles/articles'
import { ThemeProvider } from './app/context/Theme/ThemeProvider'
import NotFound from './app/pages/not-found/not-found'
import Admin from './app/pages/admin/admin'
import { CurrentUserProvider } from './app/context/CurrentUser/CurrentUserProvider'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/google-redirect',
      element: <GoogleRedirect />,
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'cryptocurrencies',
          element: <Cryptocurrencies />,
        },
        {
          path: 'articles',
          element: <Articles />,
        },
        {
          path: 'profile/:nickname',
          element: <Profile />,
        },
        {
          path: 'admin',
          element: <Admin />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])

  const queryClient = new QueryClient()

  return (
    <StrictMode>
      <ThemeProvider>
        <CurrentUserProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster richColors />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
