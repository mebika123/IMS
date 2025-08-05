import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import React, { useEffect, useState } from 'react'

const EditVendor = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        pan_no:''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/vendor/${id}`);
                // console.log(res.data.vendor);
                setForm(res.data.vendor)
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
        pan_no:[]
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
            const res = await axios.put(`/vendor/update/${id}`, form);
            if (res.data.status) {
                navigate('/dashboard/vendors');
            }
        }
        catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                name: errors.name || [],
                email: errors.email || [],
                phone: errors.phone || [],
                address: errors.address || [],
            });
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }
    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-3/4 mx-auto mb-4">
            <h3 className="text-bold text-xl">Edit Vendors</h3>
            <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 p-2">
                        <div className='col-span-2'>
                            <label htmlFor="name" className='text-[#374151]'>Name</label>
                            <input type="text"
                                value={form.name}
                                onChange={handleChange}
                                name="name"
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="email" className='text-[#374151]'>Email</label>
                            <input type="text"
                                value={form.email}
                                onChange={handleChange}
                                name="email"
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="address" className='text-[#374151]'>Address</label>
                            <input type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="phone" className='text-[#374151]'>Phone</label>
                            <input type="number"
                                value={form.phone}
                                onChange={handleChange}
                                name="phone"
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                        </div>
                        <div>
                            <label htmlFor="pan_no" className='text-[#374151]'>Pan No</label>
                            <input type="text"
                                value={form.pan_no}
                                onChange={handleChange}
                                name="pan_no"
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />

                        </div>
                    </div>
                    <div className='text-center'>
                        <input type="submit" value="Add" className='w-32 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditVendor