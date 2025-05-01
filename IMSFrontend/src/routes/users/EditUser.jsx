import React from 'react'

const EditUser = () => {
  return (
    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-3/4 mx-auto mb-4">
    <h3 className="text-bold text-xl">Edit User</h3>
    <div className="mt-5">
        <form action="">
            <div className="grid grid-cols-2 gap-6 p-2">
                <div className='col-span-2'>
                    <label htmlFor="name" className='text-[#374151]'>Name</label>
                    <input type="text" name="name" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="email" className='text-[#374151]'>Email</label>
                    <input type="text" name="email" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
                <div className=''>
                    <label htmlFor="phone" className='text-[#374151]'>Phone</label>
                    <input type="number" name="phone" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="address" className='text-[#374151]'>Address</label>
                    <input type="text" name="address" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="password" className='text-[#374151]'>password</label>
                    <input type="password" name="password" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="password" className='text-[#374151]'>Confirmation Password</label>
                    <input type="password_confirmation" name="password" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                </div>
               
                <div className='text-end'>
                    <input type="submit" value="Add" className='w-1/2 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer' />
                </div>
            </div>
        </form>
    </div>
</div>  )
}

export default EditUser