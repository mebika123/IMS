import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [form, setForm] = useState({
        name: '',
        code: '',
        description: '',
        sku: '',
        stock: '',
        min_stock_level: '',
        unit: '',
        price: '',
        category_id: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formError, setFormError] = useState({
        name: [],
        code: [],
        description: [],
        sku: [],
        stock: [],
        min_stock_level: [],
        unit: [],
        price: [],
        category_id: []
    });

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const rescategories = await axios.get('http://localhost:8000/api/categories');
                setCategories(rescategories.data.categories);
            }
            catch (err) {

            }
        };
        fetchCategories();
    }, []);


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
        try {
            const res = await axios.post('http://localhost:8000/api/product/store');
            if (res.data.response) {
                navigate('/dasboard/products');
            }
        }
        catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                name: errors.name || [],
                code: errors.code || [],
                description: errors.description || [],
                sku: errors.sku || [],
                stock: errors.stock || [],
                min_stock_level: errors.min_stock_level || [],
                unit: errors.unit || [],
                price: errors.price || [],
                category_id: errors.category_id || []
            });
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }





return (
    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-3/4 mx-auto mb-4">
        <h3 className="text-bold text-xl">Add Product</h3>
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 p-2">
                    <div className='col-span-2'>
                        <label htmlFor="name" className='text-[#374151]'>Product Name</label>
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
                        <label htmlFor="description" className='text-[#374151]'>Description</label>
                        <textarea
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen'
                            name='description'
                            rows='4'>
                            {form.description}
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="stock" className='text-[#374151]'>Stock</label>
                        <input type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                    </div>
                    <div>
                        <label htmlFor="min_stock_level" className='text-[#374151]'>Min Stock Level</label>
                        <input type="number"
                            name="min_stock_level"
                            value={form.min_stock_level}
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                    </div>
                    <div>
                        <label htmlFor="unit" className='text-[#374151]'>Unit</label>
                        <input type="text"
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                    </div>
                    <div>
                        <label htmlFor="category" className='text-[#374151]'>Category</label>
                        <select name="category"
                            value={form.category}
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen'>
                            <option value="">Select Category</option>
                            {
                                categories.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className='text-[#374151]'>Price</label>
                        <input type="text"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                    </div>
                    <div></div>
                    <div className='text-end'>
                        <input type="submit" value="Add" className='w-1/2 rounded-lg bg-darkgreen text-white p-2 mt-1 cursor-pointer' />
                    </div>
                </div>
            </form>
        </div>
    </div>
)
}

export default AddProduct