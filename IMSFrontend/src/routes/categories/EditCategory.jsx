import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const EditCategory = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        active: false,
    });

    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({
        name: [], 
        active: []
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/category/${id}`);
                setForm({
                    name: res.data.category.name, 
                    active: res.data.category.active,
                });
            } catch (err) {
                setError('Failed to load category.');
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.put(`http://localhost:8000/api/category/update/${id}`, form);
            if (res.data.status) {
                navigate('/dashboard/categories');
            }
        } catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                name: errors.name || [], // Changed from 'title' to 'name'
                active: errors.active || [],
            });
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-2/4 mx-auto mb-4">
            <h3 className="text-bold text-xl">Edit Category</h3>
            <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="p-2">
                        <div className='mb-3'>
                            <label htmlFor="name" className='text-[#374151]'>Category Name</label>
                            <input
                                type="text"
                                name="name" // Changed 'title' to 'name'
                                value={form.name} // Changed 'title' to 'name'
                                onChange={handleChange}
                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                            />
                            {formError.name.length > 0 && (
                                <p className="text-red-500">{formError.name[0]}</p>
                            )}
                        </div>

                        <div className='mb-3'>
                            <input
                                type="checkbox"
                                name="active"
                                checked={form.active}
                                onChange={handleChange}
                                className="align-middle"
                            />
                            <label htmlFor="active" className='text-[#374151] ml-2'>Is Active</label>
                        </div>

                        <div className=''>
                            <input
                                type="submit"
                                value="Update"
                                className="w-1/5 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer"
                            />
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCategory;
