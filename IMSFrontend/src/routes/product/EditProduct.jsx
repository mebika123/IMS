import React from 'react'

const EditProduct = () => {
    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-3/4 mx-auto mb-4">
            <h3 className="text-bold text-xl">Edit Product</h3>
            <div className="mt-5">
                <form action="">
                    <div className="grid grid-cols-2 gap-6 p-2">
                        <div className='col-span-2'>
                            <label htmlFor="product_name" className='text-[#374151]'>Product Name</label>
                            <input type="text" name="product_name" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="description" className='text-[#374151]'>Description</label>
                            <textarea className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' name='description' rows='4'></textarea>
                        </div>
                        <div>
                            <label htmlFor="SKU" className='text-[#374151]'>SKU</label>
                            <input type="text" name="SKU" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="stock" className='text-[#374151]'>Stock</label>
                            <input type="number" name="stock" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="minstocklevel" className='text-[#374151]'>Min Stock Level</label>
                            <input type="number" name="minstocklevel" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="unit" className='text-[#374151]'>Unit</label>
                            <input type="text" name="unit" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="category" className='text-[#374151]'>Category</label>
                            <select name="category" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen'>
                                <option value="">kg</option>
                                <option value="">pieces</option>
                                <option value="">meter</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className='text-[#374151]'>Price</label>
                            <input type="text" name="price" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div></div>
                        <div className='text-end'>
                            <input type="submit" value="Add" className='w-1/2 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct