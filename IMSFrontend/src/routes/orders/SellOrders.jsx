import React, { useEffect, useState } from 'react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from '../../axios'

const SellOrders = () => {
    // table dropdrown
    const [openRows, setOpenRows] = useState({});


    const toggleRow = (id) => {
        setOpenRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    // orderlist
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('/sales');
                // console.log(res.data)
                setOrders(res.data.sales);

            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const grouped = [];
    orders?.map((order) => {

        order.order_items.forEach(item => {
            const existing = grouped.find(g => g.product.id === item.product.id);
            console.log(item);
            if (existing) {
                existing.quantity += item.quantity;
                existing.total += item.total;
                existing.warehouses.push({ name: item.warehouse.name, quantity: item.quantity });
            } else {
                grouped.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                    warehouses: [{ name: item.warehouse.name, quantity: item.quantity }]
                });
            }
        });
    });

    // console.log("group:" + grouped)

    // const totalAmount(){

    // }

    return (
        <>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : (
                <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-xl">Sales Orders List</h3>
                        <Link className='rounded-lg bg-darkgreen text-white py-2 px-5' to='/dashboard/purchaseorderrequest'>+ New Order Request</Link>
                    </div>
                    <div className="mt-5">
                        <div className="overflow-x-auto  w-full text-center">
                            <div className="grid grid-cols-6 bg-[#E5E7EB] text-sm text-[#6B7280]">

                                <div className='py-2 border-y border-l'>Order No</div>
                                <div className='py-2 border-y border-l'>Vendor</div>
                                <div className='py-2 border-y border-l'>Submission Date</div>
                                <div className='py-2 border-y border-l'>Total Amount</div>
                                <div className='py-2 border-y border-l'>Status</div>
                                <div className='py-2 border-y border-x'>Action</div>
                            </div>
                            {
                                orders?.map((order) => (

                                    <div className="">
                                        <div className="grid grid-cols-6">

                                            <div className='py-2 border-y border-l'>
                                                <div className="flex gap-10 items-center">
                                                    <div className="pl-2 cursor-pointer" onClick={() => toggleRow(order.id)}>
                                                        <FontAwesomeIcon icon={openRows[order.id] ? faAngleUp : faAngleDown} />
                                                    </div>
                                                    <p className="">{order.id}</p>
                                                </div>
                                            </div>
                                            <div className='py-2 border-y border-l'>{order.party.name}</div>
                                            <div className='py-2 border-y border-l'>{new Date(order.created_at).toLocaleDateString()}</div>
                                            <div className='py-2 border-y border-l'> {order.total_amount} </div>
                                            <div className='py-2 border-y border-l'>
                                                <span className='inline-flex items-center rounded-md  px-2 mr-2 py-1 text-xs font-medium  ring-inset ring-1
                         ring-red-600/10 text-red-600 bg-red-200 '>
                                                    status
                                                </span>
                                            </div>
                                            <div className='py-2 border-y border-x'>
                                                <div className="flex items-center justify-end gap-2">
                                                    <form action="">
                                                        <button className='py-1 mr-2 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Cancle</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        {openRows[order.id] &&

                                            <div className="mt-3 mb-4 w-full pt-4 pb-5 px-7 bg-[#f1f1f5] ">
                                                <h6 className="font-bold text-start mb-3">Product Quotations</h6>
                                                <table className='w-full border-b-2'>
                                                    <thead>
                                                        <tr className='bg-darkgreen text-sm text-[#ffffff]'>
                                                            <th className='py-2'>S.N</th>
                                                            <th className='py-2'>Product</th>
                                                            <th className='py-2'>Unit</th>
                                                            <th className='py-2'>Required Quantity</th>
                                                            <th className='py-2'>Unit Price Offered</th>
                                                            <th className='py-2'>Warehouse</th>
                                                            <th className='py-2'>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            grouped?.map((orderItem, index) => (
                                                                <tr key={index} className='border-b border-[#adadae]'>
                                                                    <td className='py-2'>{index + 1}</td>
                                                                    <td className='py-2'>{orderItem.product.name}</td>
                                                                    <td className='py-2'>{orderItem.product.unit}</td>
                                                                    <td className='py-2'>{orderItem.quantity}</td>
                                                                    <td className='py-2'>{orderItem.price}</td>
                                                                    <td className="p-2">
                                                                        {orderItem.warehouses.map((w, i) => (
                                                                            <span key={i}>
                                                                                {w.name}: {w.quantity}
                                                                                <br />
                                                                            </span>
                                                                        ))}
                                                                    </td>
                                                                    <td className='py-2'>{orderItem.total}</td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>

                                            </div>
                                        }
                                    </div>
                                ))}



                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SellOrders