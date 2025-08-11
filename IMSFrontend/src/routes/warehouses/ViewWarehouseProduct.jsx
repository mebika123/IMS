import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';

const ViewWarehousesProduct = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

  const handleDelete = async (warehouseId, productId) => {
    if (!window.confirm('Are you sure to remove this product from warehouse?')) {
        return;
    }

    try {
        await axios.delete(`/warehouse/${warehouseId}/product/${productId}`);
        setProducts(products.filter(product => product.id !== productId));
        alert('Product removed successfully!');
    } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to remove product');
    }
};


    useEffect(() => {
        const fetchWarehouseProducts = async () => {
            try {
                const res = await axios.get(`/warehouseProduct/${id}`);
                setProducts(res.data.warehouse);
            } catch (error) {
                console.error('Failed to fetch warehouse products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouseProducts();
    }, [id]);

    return (
        <div className="shadow bg-white border rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Products in Warehouse {id}</h3>
                <Link className="rounded-lg bg-darkgreen text-white py-2 px-5" to="/dashboard/warehouse">
                    Back to Warehouses
                </Link>
            </div>

            <div className="mt-5">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading...</div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="whitespace-nowrap w-full">
                            <thead>
                                <tr className="bg-gray-200 text-sm text-gray-600">
                                    <th className="py-2">Product Name</th>
                                    <th className="py-2">Quantity</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id} className="text-center border-t">
                                            <td className="p-2">{product.name}</td>
                                            <td className="p-2">{product.quantity}</td>
                                            <td className='p-2'>
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleDelete(id, product.id)}
                                                        className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="py-5 text-center text-gray-500">
                                            No products found in this warehouse.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewWarehousesProduct;
