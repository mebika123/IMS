import React, { useEffect, useState } from 'react'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from '../../axios'

const PurchaseOrders = () => {
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
                const res = await axios.get('/purchases');
                console.log(res.data)
                setOrders(res.data.purchases);

            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // const totalAmount(){

    // }

    return (
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
                                                <button className='py-1 mr-2 rounded-lg px-4 bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all ease-in-out'>Cancel</button>
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
                                                    <th className='py-2'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.order_items?.map((orderItem) => (
                                                        <tr className='border-b border-[#adadae]'>
                                                            <td className='py-2'>{orderItem.id}</td>
                                                            <td className='py-2'>{orderItem.product.name}</td>
                                                            <td className='py-2'>{orderItem.product.unit}</td>
                                                            <td className='py-2'>{orderItem.quantity}</td>
                                                            <td className='py-2'>{orderItem.price}</td>
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
    )
}

export default PurchaseOrders