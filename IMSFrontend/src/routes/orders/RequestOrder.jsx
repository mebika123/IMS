import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const RequestOrder = ({ type }) => {
    const [products, setProducts] = useState([
        { product: '', quantity: '', price: '' }
    ]);
    const [productModal, setProductModal] = useState([
        { product: '', warehouse: '',quantity:'', price: '' }
    ]);
    const [warehouses, setWarehouses] = useState([]);
    const [distributed, setDistributed] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');

    const [modalOpen, setModalOpen] = useState(false);


    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchproductItems = async () => {
            try {
                const res = await axios.get('/products');
                setProductItems(res.data.products);
                const resWarehouse = await axios.get('/warehouses');
                setWarehouses(resWarehouse.data.warehouses);
                // console.log(resWarehouse.data.warehouses);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchproductItems();
    }, []);
    const [parties, setParties] = useState([]);


    useEffect(() => {
        const fetchParties = async () => {
            try {
                if (type == 'purchaseOrder') {
                    const res = await axios.get('/vendors');
                    // console.log(res.data)
                    setParties(res.data.vendors);
                }
                else if (type == 'saleOrder') {
                    const res = await axios.get('/customers');
                    // console.log(res.data)
                    setParties(res.data);
                }

            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParties();
    }, []);

    const handleAddProduct = () => {
        setProducts([...products, { product: '', quantity: '', price: '' }]);
    };
    const handleAddProductModal = () => {
        setProductModal([...productModal, { product_id: '', warehouse_id: '', quantity: '',price:'' }]);
        console.log(productModal)
    };

    const handleRemoveProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };
    const handleRemoveProductModal = (index) => {
        const newProducts = [...productModal];
        newProducts.splice(index, 1);
        setProductModal(newProducts);
    };

    const handleChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };
    const handleChangeModal = (index, field, value) => {
        const updatedProducts = [...productModal];
        updatedProducts[index][field] = value;
        setProductModal(updatedProducts);
    };

    const handlePurchaseRequest = async () => {
        console.log("productModa");
console.log(productModal);
        const payload = {
            party_id: selectedParty,
            type: type,
            items: productModal.map(p => ({
                product_id: p.product_id,
                quantity: p.quantity,
                warehouse_id: p.warehouse_id,
                price: p.price,
            }))
        };
        const res = await axios.post('/purchaseRequest', payload);
        alert("Order submitted successfully!");
        navigate('/dashboard/purchases/orders');

    }
    const handleSubmit = async () => {
        if (!selectedParty) {
            alert("Please select a party.");
            return;
        }

        const payload = {
            party_id: selectedParty,
            type: type,
            items: products.map(p => ({
                product_id: p.product,
                quantity: p.quantity,
                price: p.price
            }))
        };

        try {
            if (type == 'saleOrder') {
                const res = await axios.post('/saleRequest', payload)
                    .then(() => {
                        alert("Order submitted successfully!");
                        navigate('/dashboard/sales/Orders');
                    })
                    .catch(err => {
                        alert(err.response?.data?.message);
                    });

            }
            else {
                setModalOpen(true);
                setProductModal([]);
                // console.log(payload)
                const res = await axios.post('/distribute', payload)
                    .then(res => setProductModal(res.data.distributed))
                    .catch(err => {
                        setModalOpen(false);
                        alert(err.response?.data?.message);
                    })

            }
            // optionally: redirect or reset state
        } catch (err) {
            console.error("Error submitting order:", err);
            alert("Failed to submit order.");
        }
    };

    return (
        <>
            {modalOpen &&
                <div className="h-svh bg-black bg-opacity-40 flex items-center justify-center fixed top-0 left-0 w-full" >
                    <div className="bg-white h-fit p-4 w-1/2 relative">
                        <FontAwesomeIcon icon={faTimes} onClick={() => setModalOpen(false)} className='absolute top-2 right-2' />
                        <h6 className='my-2 font-bold text-red-600'>The values below are recommended quantity distrubution & any changes are accepted</h6>
                        <div className="overflow-x-auto  w-full">
                            <table className="whitespace-nowrap w-full mb-5">
                                <thead>
                                    <tr className=''>
                                        <th className='py-2 border'>Product</th>
                                        <th className='py-2 border'>Warehouse</th>
                                        <th className='py-2 border'>Price</th>
                                        <th className='py-2 border'>Quantity</th>
                                        <th className='py-2 border'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productModal.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="p-2 border">
                                                <select
                                                    name="product"
                                                    value={item.product_id}
                                                    onChange={(e) => handleChangeModal(index, 'product_id', e.target.value)}
                                                    className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                                >
                                                    <option value="">Select Product</option>
                                                    {
                                                        productItems.map((product, ind) => (

                                                            <option value={product.id} key={ind}>{product.name}</option>

                                                        ))}
                                                </select>
                                            </td>

                                            <td className="p-2 border">
                                                <select
                                                    name="warehouse"
                                                    value={item.warehouse_id}
                                                    onChange={(e) => handleChangeModal(index, 'warehouse_id', e.target.value)}
                                                    className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                                >
                                                    <option value="">Select warehouses</option>
                                                    {
                                                        warehouses.map((warehouse, ind) => (

                                                            <option value={warehouse.id} key={ind}>{warehouse.name}</option>

                                                        ))}
                                                </select>
                                            </td>
                                            <td className="p-2 border">
                                                <input type='text'
                                                    name="warehouse"
                                                    value={item.price}
                                                    onChange={(e) => handleChangeModal(index, 'price', e.target.value)}
                                                    className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                               />
                                                   
                                                
                                            </td>
                                            <td className="p-2 border">
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => handleChangeModal(index, 'quantity', e.target.value)}
                                                    className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                                />
                                            </td>
                                            <td className="p-2 border">
                                                <div className="text-end gap-2">
                                                    {index !== 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveProductModal(index)}
                                                            className="py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <div className="flex justify-end w-full">
                                <button className='bg-blue-700 text-white rounded-md w-44 p-1 hover:bg-blue-800 transition-all' onClick={handleAddProductModal}>+Add Another</button>
                            </div>

                            <div className="text-center">

                                <button className='bg-darkgreen text-white rounded-md  p-2' onClick={handlePurchaseRequest}>Create Request</button>
                            </div>

                        </div>
                    </div>
                </div>

            }
            <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
                <div className="text-center">
                    <h3 className="font-bold text-xl">Orders Request</h3>

                </div>
                <div className="mt-5">
                    <div className="flex items-center gap-2 mb-2 w-1/4">
                        <h6>For: </h6>
                        <select
                            name="party"
                            value={selectedParty}
                            onChange={(e) => setSelectedParty(e.target.value)}
                            className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                        >
                            <option value="">Select party</option>
                            {parties.map((party, ind) => (
                                <option value={party.id} key={ind}>{party.name}</option>
                            ))}
                        </select>

                    </div>
                    <div className="overflow-x-auto  w-full">
                        <table className="whitespace-nowrap w-full mb-5">
                            <thead>
                                <tr className=''>
                                    <th className='py-2 border'>Product</th>
                                    <th className='py-2 border'>Quantity</th>
                                    <th className='py-2 border'>Price</th>
                                    {/* {type == 'purchaseOrder' &&
                                    (<th className='py-2 border'>Specification</th>
                                    )} */}
                                    <th className='py-2 border'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border">
                                            <select
                                                name="product"
                                                value={item.product}
                                                onChange={(e) => handleChange(index, 'product', e.target.value)}
                                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                            >
                                                <option value="">Select Product</option>
                                                {
                                                    productItems.map((product, ind) => (

                                                        <option value={product.id} key={ind}>{product.name}</option>

                                                    ))}
                                            </select>
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                            />
                                        </td>
                                        <td className="p-2 border">
                                            <input
                                                type="text"
                                                name="price"
                                                value={item.price}
                                                onChange={(e) => handleChange(index, 'price', e.target.value)}
                                                className="w-full rounded-lg border p-2 mt-1 bg-lightgreen"
                                            />
                                        </td>
                                        {/* {type == 'purchaseOrder' &&
                                    (<td className='py-2 border'>
                                        <textarea 
                                        name="specification"
                                                                                    value={item.sepcification}

                                         id=""></textarea>
                                    </td>
                                    )} */}

                                        <td className="p-2 border">
                                            <div className="text-end gap-2">
                                                {index !== 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProduct(index)}
                                                        className="py-1 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className="flex justify-end w-full">
                            <button className='bg-blue-700 text-white rounded-md w-44 p-1 hover:bg-blue-800 transition-all' onClick={handleAddProduct}>+Add Another Product</button>
                        </div>

                        <div className="text-center">

                            <button className='bg-darkgreen text-white rounded-md  p-2' onClick={handleSubmit}>Create Request</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestOrder