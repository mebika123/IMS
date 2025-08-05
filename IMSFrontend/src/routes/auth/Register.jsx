import axios from '../../axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    name: [],
    email: [],
    phone: [],
    address: [],
    password: [],
    password_confirmation: []
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(form);
    try {
      const res = await axios.post('/register', form);
      if (res.data) {
        navigate('/dashboard');
      }
    }
    catch (err) {
      const errors = err.response?.data?.errors || {};
      setFormError({
        name: errors.name || [],
        email: errors.email || [],
        phone: errors.phone || [],
        address: errors.address || [],
        password: errors.password || [],
        password_confirmation: errors.password_confirmation || []
      });
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }
  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-[url('bg_img.png')] bg-cover bg-no-repeat relative">
        <img src="imsImg.png" alt="" className='h-96 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
        <h3 className="text-center mt-14 text-white font-bold text-5xl">Welcome!</h3>

      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border border-gray-400 rounded-xl p-10">
          <h4 className="font-bold text-3xl mb-3 text-center">Welcome</h4>

          <form onSubmit={handleSubmit} >
            <div className="p-2 gap-3">
              <div className='mb-3'>
                <label htmlFor="name" className='text-[#374151]'>Name</label>
                <input type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.name[0]
                  }
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor="email" className='text-[#374151]'>Email</label>
                <input type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.email[0]
                  }
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor="address" className='text-[#374151]'>Address</label>
                <input type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.address[0]
                  }
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor="text" className='text-[#374151]'>Phone Number</label>
                <input type="number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.phone[0]
                  }
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor="password" className='text-[#374151]'>Password</label>
                <input type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.password[0]
                  }
                </p>
              </div>
              <div className='mb-3'>
                <label htmlFor="password_confirmation" className='text-[#374151]'>Confirm Password</label>
                <input type="password"
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
                <p className="text-red-500">
                  {
                    formError.password_confirmation[0]
                  }
                </p>
              </div>


              <div className='text-center '>
                <input type="submit" value="Register" className='py-2 px-8 rounded-lg bg-darkgreen text-white  mt-1 cursor-pointer' />
              </div>
            </div>
          </form>
          <p className='text-center mt-3'>Don't have account? <Link to='/register' className='text-darkgreen'>Register</Link></p>

        </div>
      </div>
    </div>
  )
}

export default Register