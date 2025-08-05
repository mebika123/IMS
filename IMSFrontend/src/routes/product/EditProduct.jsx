import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [warehouses, setWarehouses] = useState([{ warehouse_id: '', quantity: '', }]);
    const [allWarehouses, setAllWarehouses] = useState([]);
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const res = await axios.get('/warehouses');
                setAllWarehouses(res.data.warehouses);
            } catch (err) {
                console.error("Error fetching warehouses", err);
            }
        };
        fetchWarehouses();
    }, []);

    const [form, setForm] = useState({
        name: '',
        description: '',
        unit: '',
        price: '',
        category_id: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formError, setFormError] = useState({
        name: [],
        description: [],
        unit: [],
        price: [],
        category_id: []
    });


    const [categories, setCategories] = useState([]);

   useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/product/${id}`);
      const product = res.data.product;

      setForm({
        name: product.name,
        description: product.description,
        unit: product.unit,
        price: product.price,
        category_id: product.category_id
      });

      const mappedWarehouses = product.warehouses.map((w) => ({
        warehouse_id: String(w.id), 
        quantity: w.pivot.quantity
      }));

      setWarehouses(mappedWarehouses.length > 0 ? mappedWarehouses : [{ warehouse_id: '', quantity: '' }]);

      const rescategories = await axios.get('/categories');
      setCategories(rescategories.data.categories);
    } catch (err) {
      console.error("Error fetching product", err);
    }
  };

  fetchCategories();
}, [id]);


    const handleAddWarehouse = () => {
        setWarehouses([...warehouses, { warehouse_id: '', quantity: '' }]);
    };

    const handleRemoveWarehouse = (index) => {
        const newWarehouses = [...warehouses];
        newWarehouses.splice(index, 1);
        setWarehouses(newWarehouses);
    };

    const handleWarehouseChange = (index, field, value) => {
        const newWarehouses = [...warehouses];
        newWarehouses[index][field] = value;
        setWarehouses(newWarehouses);
    };
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
            const res = await axios.put(`/product/update/${id}`, form);
            if (res.data.status) {
                navigate('/dashboard/products');
            }
        }
        catch (err) {
            const errors = err.response?.data?.errors || {};
            setFormError({
                name: errors.name || [],
                description: errors.description || [],
                // stock: errors.stock || [],
                // min_stock_level: errors.min_stock_level || [],
                unit: errors.unit || [],
                price: errors.price || [],
                category_id: errors.category_id || []
            });
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }





    return (
        <div className="grid lg:grid-cols-2 gap-2">
            <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 mx-auto mb-4 w-full">
                <h3 className="text-bold text-xl">Add Product</h3>
                <div className="mt-5">
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
                                value={form.description}
                                rows='4'>

                            </textarea>
                            {formError.description.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.description[0]
                                    }
                                </p>
                            }
                        </div>
                        {/*thiss is stock column 
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
                                {formError.min_stock_level.length > 0 &&
                                    <p className="text-red-500">
                                        {
                                            formError.min_stock_level[0]
                                        }
                                    </p>
                                }
                            </div> */}
                        <div>
                            <label htmlFor="unit" className='text-[#374151]'>Unit</label>
                            <input type="text"
                                name="unit"
                                value={form.unit}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.unit.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.unit[0]
                                    }
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="category" className='text-[#374151]'>Category</label>
                            <select name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen'>
                                <option value="">Select Category</option>
                                {
                                    categories.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                            {formError.category_id.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.category_id[0]
                                    }
                                </p>
                            }
                        </div>
                        <div>
                            <label htmlFor="price" className='text-[#374151]'>Price</label>
                            <input type="text"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className='w-full rounded-lg border p-2 mt-1 bg-lightgreen' />
                            {formError.price.length > 0 &&
                                <p className="text-red-500">
                                    {
                                        formError.price[0]
                                    }
                                </p>
                            }
                        </div>
                        <div></div>

                    </div>
                </div>
            </div>
            <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 mx-auto mb-4 w-full">
                <h3 className="text-bold text-xl">Select Warehouse</h3>
                <div className="mt-5">

                    <div className="overflow-x-auto  w-full">
                        <table className="whitespace-nowrap w-full mb-5">
                            <thead>
                                <tr className=''>
                                    <th className='py-2 border'>WareHouse</th>
                                    <th className='py-2 border'>Quantity</th>
                                    <th className='py-2 border'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouses.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border">
                                            <select
                                                name="warehouse_id"
                                                value={item.warehouse_id}
                                                onChange={(e) => handleWarehouseChange(index, 'warehouse_id', e.target.value)}
                                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                            >
                                                <option value="">Select Warehouse</option>
                                                {allWarehouses.map((wh) => (
                                                    <option key={wh.id} value={String(wh.id)}>
                                                        {wh.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleWarehouseChange(index, 'quantity', e.target.value)}
                                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveWarehouse(index)}
                                                    className="py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}



                            </tbody>

                        </table>
                        <div className="flex justify-end w-full">
                            <button className='bg-blue-700 text-white rounded-md w-44 p-1 hover:bg-blue-800 transition-all'
                                onClick={handleAddWarehouse}
                            >+Add Another Warehouse</button>
                        </div>

                        <div className="text-center">

                            <button className='w-60 rounded-lg bg-darkgreen text-white p-2 mt-1' onClick={handleSubmit}>Add</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct