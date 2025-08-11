import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios'; 
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/categories');
                setCategories(res.data.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            await axios.delete(`/category/delete/${id}`);
            setCategories(categories.filter(category => category.id !== id));
            alert('Category deleted successfully!');
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category. Please try again.');
        }
    };

    return (
        <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Categories List</h3>
                <div>
                    <Link className='rounded-lg bg-darkgreen text-white py-2 px-5' to='/dashboard/category/add'>+ New Category</Link>
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
                                    <th className='py-2'>Active</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category.id} className="text-center border-t">
                                            <td className='p-2'>{category.name}</td>
                                            <td className='p-2'>
                                                {category.active ? (
                                                    <span className="text-green-600 font-semibold">Active</span>
                                                ) : (
                                                    <span className="text-red-600 font-semibold">Inactive</span>
                                                )}
                                            </td>
                                            <td className='p-2'>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link 
                                                        to={`/dashboard/category/edit/${category.id}`}
                                                        className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(category.id)}
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
                                            No categories found.
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

export default Categories;
