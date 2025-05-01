import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-[url('bg_img.png')] bg-cover bg-no-repeat relative">
        <img src="imsImg.png" alt="" className='h-96 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
        <h3 className="text-center mt-14 text-white font-bold text-5xl">Welcome!</h3>

      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border border-gray-400 rounded-xl p-10">
          <h4 className="font-bold text-3xl mb-3 text-center">Welcome</h4>

          <form action="" >
            <div className="p-2 gap-3">
              <div className='mb-3'>
                <label htmlFor="name" className='text-[#374151]'>Name</label>
                <input type="text" name="name" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
              </div>
              <div className='mb-3'>
                <label htmlFor="email" className='text-[#374151]'>Email</label>
                <input type="email" name="email" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
              </div>
              <div className='mb-3'>
                <label htmlFor="address" className='text-[#374151]'>Address</label>
                <input type="text" name="address" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
              </div>
              <div className='mb-3'>
                <label htmlFor="phone" className='text-[#374151]'>Phone Number</label>
                <input type="number" name="phone" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
              </div>
              <div className='mb-3'>
                <label htmlFor="password" className='text-[#374151]'>Password</label>
                <input type="password" name="password" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
              </div>
              <div className='mb-3'>
                <label htmlFor="password_confirmation" className='text-[#374151]'>Confirm Password</label>
                <input type="password" name="password_confirmation" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen border-[#374151]' />
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