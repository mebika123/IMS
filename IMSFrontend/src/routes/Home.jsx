import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
      <div className="flex gap-8 items-stretch">
        <div className='w-3/5'>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-xl">Overview</h3>
            <div className="flex flex-nowrap gap-4">
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Product</h5>
                    <p className="font-bold">125</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Product</h5>
                    <p className="font-bold">125</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Product</h5>
                    <p className="font-bold">125</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Product</h5>
                    <p className="font-bold">125</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Today's Sell Orders</h3>

            </div>
            <div className="mt-5">
              <div className="overflow-x-auto  w-full">
                <table className="whitespace-nowrap w-full">
                  <thead>
                    <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                      <th className='py-2'>Product</th>
                      <th className='py-2'>Quantity</th>
                      <th className='py-2'>Price</th>
                      <th className='py-2'>Prority</th>
                      <th className='py-2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className='py-2'>Product</td>
                      <td className='py-2'>Quantity</td>
                      <td className='py-2'>Price</td>
                      <td className='py-2'>Prority</td>
                      <td className='py-2'>
                        <div className="flex items-center justify-end gap-2">
                          <Link to='' className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                          <form action="">
                            <button className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Delete</button>
                          </form>
                        </div>
                      </td>

                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='w-2/5'>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-3xl">Welcome,  User </h3>

          </div>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-xl">Notification</h3>

          </div>
        </div>
      </div>
    </>


  )
}

export default Home