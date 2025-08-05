import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../axios';

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchvendors = async () => {
            try {
                const res = await axios.get('/vendors');
                // console.log(res.data)
                setVendors(res.data.vendors);

            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchvendors();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vendor?')) {
            return;
        }

        try {
            await axios.delete(`/vendor/delete/${id}`);
            setVendors(vendors?.filter(vendor => vendor?.id !== id));
            alert('Vendor deleted successfully!');
        } catch (error) {
            console.error('Failed to delete vendor:', error);
            alert('Failed to delete vendor. Please try again.');
        }
    };
    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Vendors List</h3>
                <div>
                    <Link to='/dashboard/addvendor' className='rounded-lg bg-darkgreen text-white py-2 px-5'>+ New Vendor</Link>
                </div>
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
                                <th className='py-2'>Pan No</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendors?.map((vendor) => (
                                    <tr className="text-center">
                                        <td className='py-2'>{vendor.name}</td>
                                        <td className='py-2'>{vendor.email}</td>
                                        <td className='py-2'>{vendor.phone}</td>
                                        <td className='py-2'>{vendor.address}</td>
                                        <td className='py-2'>{vendor.pan_no}</td>
                                        <td className='py-2'>
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/dashboard/editvendor/${vendor.id}`} className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                                                    <button
                                                        onClick={() => handleDelete(vendor.id)}
                                                        className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Delete</button>
                                            </div>
                                        </td>

                                    </tr>

                                ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>)
}

export default Vendors