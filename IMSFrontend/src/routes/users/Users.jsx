import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const Users = () => {
        const { user } = useAuth();
        const navigate = useNavigate();
        useEffect(()=>{

            if(user.role != 'admin'){
                navigate('/dashboard');
            }
        },[user]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/users');
                // console.log(res.data)
                setUsers(res.data);

            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await axios.delete(`/user/delete/${id}`);
            setUsers(users?.filter(user => user?.id !== id));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Users List</h3>
                <div>
                    <Link to='/dashboard/user/add' className='rounded-lg bg-darkgreen text-white py-2 px-5'>+ New User</Link>
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
                                <th className='py-2'>Type</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                            <tbody>

                                {
                                    users?.map((user) => (

                                        <tr className="text-center" key={user.id}>
                                            <td className='p-2'>{user?.name}</td>
                                            <td className='p-2'>{user?.email}</td>
                                            <td className='p-2'>{user?.phone}</td>
                                            <td className='p-2'>{user?.address}</td>
                                            <td className='p-2'>{user?.type}</td>
                                            <td className='p-2'>
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/dashboard/user/edit/${user.id}`} className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className='py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users