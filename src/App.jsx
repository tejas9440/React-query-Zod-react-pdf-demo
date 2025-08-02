import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import ReactQueryData from './components/data'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Detailpage from './components/Detailpage'
import ZodForm from './components/ZodForm'
import PdfViwer from './components/PdfViwer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/rq',
        element: <ReactQueryData />
      },
      {
        path: '/rq/:id',
        element: <Detailpage />
      },
      {
        path: '/zodForm',
        element: <ZodForm />
      },
      {
        path: '/PdfViwer',
        element: <PdfViwer />
      },
    ]
  }
])


function App() {

  const queryClient = new QueryClient();

  return (

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>


      </RouterProvider>
    </QueryClientProvider>
  )
}

export default App
