import React from 'react'
import Sidebar from '../components/layouts/Sidebar'
import Header from '../components/layouts/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Layout = () => {

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  if (!user) navigate("/login")
  return (
    <div className='flex'>
      <Sidebar />
      <div className="md:w-5/6 w-full md:ms-auto">
        <Header />
        <div className='pt-8 pb-3 px-7'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout