import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/products');
                setProducts(res.data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchproducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
            setProducts(products.filter(product => product.id !== id));
            alert('Category deleted successfully!');
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category. Please try again.');
        }
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Product List</h3>
                <div>
                    <Link to='/dashboard/addproduct' className='rounded-lg bg-darkgreen text-white py-2 px-5'>+ New Product</Link>
                </div>
            </div>
            <div className="mt-5">
                <div className="overflow-x-auto  w-full">
                    <table className="whitespace-nowrap w-full">
                        <thead>
                            <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                                <th className='py-2'>Name</th>
                                <th className='py-2'>Sku</th>
                                <th className='py-2'>category</th>
                                <th className='py-2'>stock</th>
                                <th className='py-2'>unit</th>
                                <th className='py-2'>min stock level</th>
                                <th className='py-2'>price</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ?    (

                                    products?.map((product) => {
                                        <tr className="text-center">
                                            <td className='py-2'>{Product.name}</td>
                                            <td className='py-2'>{Product.sku}</td>
                                            <td className='py-2'>{product.category.name}</td>
                                            <td className='py-2'>{product.stock}</td>
                                            <td className='py-2'>{product.unit}</td>
                                            <td className='py-2'>{product.min_stock_level}</td>
                                            <td className='py-2'>{product.price}</td>
                                            <td className='py-2'>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to='' className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                                                    <form action="">
                                                        <button className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Delete</button>
                                                    </form>
                                                </div>
                                            </td>
    
                                        </tr>
    
                                    })
                                ):(
                                    <tr>
                                        <td colSpan="8" className="py-5 text-center text-gray-500">
                                            No product found.
                                        </td>
                                    </tr>
                                )

                                }
                            
                            
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Product