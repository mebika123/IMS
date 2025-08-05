import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropOpen, setDropOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const res = await axios.get('/products');
                setProducts(res.data.products);
                console.log(res.data.products);
                setFilteredProducts(res.data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchproducts();
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/categories');
                const sortedCategories = res.data.categories.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setCategories(sortedCategories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories()
    }, []);
    useEffect(() => {
        if (filters.length === 0) {
            setFilteredProducts(products); // Show all if no filter
        } else {
            setFilteredProducts(
                products.filter((p) =>
                    filters.some((f) => f.id === p.category.id)
                )
            );
        }
    }, [filters, products]);
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            return;
        }

        try {
            await axios.delete(`/product/delete/${id}`);
            setProducts(products?.filter(product => product?.id !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product. Please try again.');
        }
    };


    const filterCategory = (id, value) => {
        setIsAllSelected(false);
        if (filters.some((f) => f.id == id)) {
            setFilters(prev => (prev.filter((p) => p.id != id)));
        }
        else {
            setFilters(prev => ([
                ...prev,
                {
                    id,
                    value
                }
            ]));
        }
    };

    const toggleDropdown = () => {
        setDropOpen(!dropOpen);
    };

    const selectAll = () => {
        if (!isAllSelected) {
            setIsAllSelected(true);
        }
        const all = categories.map(category => ({
            id: category.id,
            value: category.name
        }));
        setFilters(all);
    }
    const removeCategory = (id, value) => {
        setIsAllSelected(false);
        setDropOpen(!dropOpen);

        if (filters.some((f) => f.id == id)) {
            setFilters(prev => (prev.filter((p) => p.id != id)));
        }

    }
    const removeAll = () => {
        setIsAllSelected(false);

        setFilters([]);
    }
    return (
        <>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : (
                <div className="">

                    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
                        <div className="flex items-center gap-3">
                            <div className="">Select Categories</div>
                            <div className="w-1/3 relative">
                                {/*  <input type="text" className='border border-[rgb(229,231,235)] rounded-md p-2 w-full' placeholder='search' onClick={toggleDropdown} /> */}
                                <div className='border flex items-center flex-wrap gap-3 border-[rgb(229,231,235)] rounded-md p-2 w-full max-h-20 no-scrollbar overflow-y-auto' onClick={toggleDropdown}>

                                    {
                                        filters?.map((filter) => (
                                            <div className="bg-slate-500 text-white rounded-md p-1 flex  gap-2 text-xs items-center">
                                                <span>{filter.value}</span>
                                                <FontAwesomeIcon icon={faXmark} onClick={() => removeCategory(filter.id, filter.value)} />
                                            </div>
                                        ))
                                    }
                                    {filters?.length == 0 && 'Search'}
                                </div>
                                <div className='absolute right-0 inset-y-0 flex items-center pr-3'>
                                    {filters?.length > 0 &&
                                        <FontAwesomeIcon icon={faXmark} onClick={removeAll} />
                                    }
                                </div>
                                {dropOpen && (
                                    <div className="border border-[#E5E7EB] rounded-lg p-2 w-full top-full max-h-40 overflow-y-auto absolute bg-white">
                                        <div className='mt-3 ml-2 '>
                                            <input type="checkbox"
                                                name="" id=""
                                                checked={isAllSelected}
                                                onClick={() => !isAllSelected ? selectAll() : removeAll()} /> Select All
                                        </div>
                                        {
                                            categories?.map((category) => (
                                                <div className='mt-3 ml-2 '>
                                                    <input type="checkbox" name="categories" value={category.id}
                                                        checked={filters.some((f) => f.id == category.id)}
                                                        onChange={() => filterCategory(category.id, category.name)} /> {category.name}
                                                </div>
                                            ))
                                        }

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                    <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-xl">Product List</h3>
                            <div>
                                <Link to='/dashboard/addproduct' className='rounded-lg bg-darkgreen text-white py-2 px-5'>+ New Product</Link>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="overflow-x-auto  w-full">
                                <table className="whitespace-nowrap w-full">
                                    <thead>
                                        <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                                            <th className='py-2'>Product Code</th>
                                            <th className='py-2'>Name</th>
                                            <th className='py-2'>Sku</th>
                                            <th className='py-2'>category</th>
                                            <th className='py-2'>unit</th>
                                            <th className='py-2'>Unit Price</th>
                                            <th className='py-2'>Warehouse</th>
                                            <th className='py-2'>Quantity</th>
                                            <th className='py-2'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            filteredProducts?.map((product) => (

                                                <tr className="text-center" key={product.id}>
                                                    <td className='p-2'>{product?.code}</td>
                                                    <td className='p-2'>{product?.name}</td>
                                                    <td className='p-2'>{product?.sku}</td>
                                                    <td className='p-2'>{product?.category?.name}</td>
                                                    <td className='p-2'>{product?.unit}</td>
                                                    <td className='p-2'>{product?.price}</td>
                                                    <td className="p-2">
                                                        {product.warehouses.map((w, i) => (
                                                            <span key={i}>
                                                                {w.name}
                                                                <br />
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td className="p-2">
                                                        {product.warehouses.reduce((total, w) => total + Number(w.pivot.quantity), 0)}
                                                    </td>
                                                    <td className='p-2'>
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link to={`/dashboard/editproduct/${product.id}`} className='py-1 rounded-lg px-4 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all ease-in-out'>Edit</Link>
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
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
                </div>
            )}
        </>
    )
}

export default Product