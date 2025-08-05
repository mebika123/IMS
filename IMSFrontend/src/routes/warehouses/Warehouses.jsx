import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios'; 
const Warehouses = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const res = await axios.get('/warehouses');
                setWarehouses(res.data.warehouses);
                console.log(res.data);
            } catch (error) {
                console.error('Failed to fetch warehouse:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this warehouse?')) {
            return;
        }

        try {
            await axios.delete(`/warehouse/delete/${id}`);
            setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
            alert('warehouse deleted successfully!');
        } catch (error) {
            console.error('Failed to delete warehouse:', error);
            alert('Failed to delete warehouse. Please try again.');
        }
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Warehouse List</h3>
                <div>
                    <Link className='rounded-lg bg-darkgreen text-white py-2 px-5' to='/dashboard/addwarehouse'>+ New Warehouse</Link>
                </div>
            </div>

            <div className="mt-5">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading...</div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="whitespace-nowrap w-full">
                            <thead>
                                <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                                    <th className='py-2'>Name</th>
                                    <th className='py-2'>Adress</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouses && warehouses.length > 0 ? (
                                    warehouses.map((warehouse) => (
                                        <tr key={warehouse.id} className="text-center border-t">
                                            <td className='p-2'>{warehouse.name}</td>
                                            <td className='p-2'>
                                                {warehouse.address }
                                            </td>
                                            <td className='p-2'>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link 
                                                        to={`/dashboard/editwarehouse/${warehouse.id}`}
                                                        className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(warehouse.id)}
                                                        className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-5 text-center text-gray-500">
                                            No warehouses found.
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

export default Warehouses;
