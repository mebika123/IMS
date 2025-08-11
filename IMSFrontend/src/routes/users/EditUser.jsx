import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const EditUser = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {

        if (user.role != 'admin') {
            navigate('/dashboard');
        }
    }, [user]);
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        type: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/user/${id}`);
                console.log(res.data);
                setForm(res.data.user)
            }
            catch (err) {
                console.log("error in fetching data");
            }
        };
        fetchUsers()
    }, [id]);

    const [formError, setFormError] = useState({
        name: [],
        email: [],
        phone: [],
        address: [],
        type: [],
        password: [],
        password_confirmation: []
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        console.log(form);
        try {
            const res = await axios.put(`/user/update/${id}`, form);
            if (res.data.status) {
                navigate('/dashboard/users');
            }
        }
        catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                name: errors.name || [],
                email: errors.email || [],
                phone: errors.phone || [],
                address: errors.address || [],
                type: errors.type || [],
                password: errors.password || [],
                password_confirmation: errors.password_confirmation || []
            });
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }



    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-3/4 mx-auto mb-4">
            <h3 className="text-bold text-xl">Edit User</h3>
            <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 p-2">
                        <div className='col-span-2'>
                            <label htmlFor="name" className='text-[#374151]'>Name</label>
                            <input type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.name.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.name[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="email" className='text-[#374151]'>Email</label>
                            <input type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.email.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.email[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="phone" className='text-[#374151]'>Phone</label>
                            <input type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.phone.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.phone[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className=''>
                            <label htmlFor="address" className='text-[#374151]'>Address</label>
                            <input type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.address.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.address[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className=''>
                            <label htmlFor="type" className='text-[#374151]'>Type</label>
                            <select name="type" value={form.type} onChange={handleChange} id="" className='w-full rounded-lg border p-2 mt-1 bg-lightgreen'>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                            {formError.type.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.type[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="password" className='text-[#374151]'>password</label>
                            <input type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.password.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.password[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="password" className='text-[#374151]'>Confirmation Password</label>
                            <input type="password"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.password_confirmation.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.password_confirmation[0]
                                    }
                                </p>
                            }
                        </div>
                        <div className='text-end'>
                            <input type="submit" value="Update" className='w-1/2 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser