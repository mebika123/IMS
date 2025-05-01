import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3 border-b border-b-[#E5E7EB] gap-4 bg-white'>
      <div className='flex items-center gap-4 md:hidden'>
        <Link to="" className=" text-darkgreen">
          <h4 className="text-lg font-bold">Inventory Management</h4>
        </Link>
            
        </div>
        <div>
        <input type="text" className='w-80 rounded-lg border border-[#D1D5DB] p-2 mt-1' name='search' placeholder='Search here ' />
      </div>
      <form action="" method='POST'>
        <button className='rounded-lg bg-darkgreen text-white py-2 px-5'>Logout</button>
      </form>
    </div>  )
}

export default Header