import React from 'react'
import { Link } from 'react-router-dom'

const Customers = () => {
    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Customers List</h3>
              
            </div>
            <div className="mt-5">
                <div className="overflow-x-auto  w-full">
                    <table className="whitespace-nowrap w-full">
                        <thead>
                            <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Email</th>
                                <th className='py-2'>Contact</th>
                                <th className='py-2'>Address</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td className='py-2'>Name</td>
                                <td className='py-2'>Email</td>
                                <td className='py-2'>Contact</td>
                                <td className='py-2'>Address</td>
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
    )

}

export default Customers