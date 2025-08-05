import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import { Navigate, useNavigate } from 'react-router-dom';

const RequestOrder = ({ type }) => {
    const [products, setProducts] = useState([
        { product: '', quantity: '', price: '' }
    ]);
    const [selectedParty, setSelectedParty] = useState('');

    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchproductItems = async () => {
            try {
                const res = await axios.get('/products');
                setProductItems(res.data.products);
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

    const handleRemoveProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    const handleChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const handleSubmit = async () => {
        if (!selectedParty) {
            alert("Please select a party.");
            return;
        }

        const payload = {
            party_id: selectedParty,
            type:type,
            items: products.map(p => ({
                product_id: p.product,
                quantity: p.quantity,
                price: p.price
            }))
        };

        try {
            if (type == 'saleOrder') {
                const res = await axios.post('/saleRequest', payload);
                alert("Order submitted successfully!");
                navigate('/dashboard/salesOrders');
            }
            else{
                const res = await axios.post('/purchaseRequest', payload);
                alert("Order submitted successfully!");
                navigate('/dashboard/purchasesorders');

            }
            // optionally: redirect or reset state
        } catch (err) {
            console.error("Error submitting order:", err);
            alert("Failed to submit order.");
        }
    };

    return (
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
    )
}

export default RequestOrder