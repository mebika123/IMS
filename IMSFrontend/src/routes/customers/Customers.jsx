import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get('/customers');
                console.log(res.data)
                setCustomers(res.data);

            } catch (error) {
                console.error('Failed to fetch customers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }

        try {
            await axios.delete(`/customer/delete/${id}`);
            setCustomers(customers?.filter(customer => customer?.id !== id));
            alert('customer deleted successfully!');
        } catch (error) {
            console.error('Failed to delete customer:', error);
            alert('Failed to delete customer. Please try again.');
        }
    };
    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Customers List</h3>
                <Link to='/dashboard/addcustomer' className='rounded-lg bg-darkgreen text-white py-2 px-5'>+ New User</Link>

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
                            {
                                customers?.map((customer) => (
                                    <tr className="text-center">
                                        <td className='py-2'>{customer.name}</td>
                                        <td className='py-2'>{customer.email}</td>
                                        <td className='py-2'>{customer.phone}</td>
                                        <td className='py-2'>{customer.address}</td>
                                        <td className='py-2'>
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/dashboard/editCustomer/${customer.id}`} className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                                                <button
                                                    onClick={() => handleDelete(customer.id)}
                                                    className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Delete</button>
                                            </div>
                                        </td>

                                    </tr>

                                ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )

}

export default Customers