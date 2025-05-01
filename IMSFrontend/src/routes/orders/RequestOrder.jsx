import React, { useState } from 'react'

const RequestOrder = () => {
    const [products, setProducts] = useState([
        { product: '', quantity: '', price: '', priority: '' }
    ]);

    const handleAddProduct = () => {
        setProducts([...products, { product: '', quantity: '', price: '', priority: '' }]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const handleChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="text-center">
                <h3 className="font-bold text-xl">Orders Request</h3>

            </div>
            <div className="mt-5">
                <div className="overflow-x-auto  w-full">
                    <table className="whitespace-nowrap w-full mb-5">
                        <thead>
                            <tr className=''>
                                <th className='py-2 border'>Product</th>
                                <th className='py-2 border'>Quantity</th>
                                <th className='py-2 border'>Price</th>
                                <th className='py-2 border'>Specification</th>
                                <th className='py-2 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2 border">
                                        <select
                                            name="product"
                                            value={item.product}
                                            onChange={(e) => handleChange(index, 'product', e.target.value)}
                                            className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                        >
                                            <option value="">Select Product</option>
                                            <option value="Product1">Product 1</option>
                                            <option value="Product2">Product 2</option>
                                            <option value="Product3">Product 3</option>
                                        </select>
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="text"
                                            name="price"
                                            value={item.price}
                                            onChange={(e) => handleChange(index, 'price', e.target.value)}
                                            className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <textarea name="specification" id="" rows='4'
                                        className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                         value={item.specification}
                                         onChange={(e) => handleChange(index, 'specification', e.target.value)}
                                         >

                                         </textarea>
                                    </td>
                                    <td className="p-2 border">
                                        <div className="text-end gap-2">
                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProduct(index)}
                                                    className="py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className="flex justify-end w-full">
                        <button className='bg-blue-700 text-white rounded-md w-44 p-1 hover:bg-blue-800 transition-all'  onClick={handleAddProduct}>+Add Another Product</button>
                    </div>

                    <div className="text-center">

                        <button className='bg-darkgreen text-white rounded-md  p-2'>Create Request</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RequestOrder