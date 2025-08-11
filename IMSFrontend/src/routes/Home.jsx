import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faDollar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../axios';




const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('/dashboard');
        setData(res.data.dashboardData);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch warehouse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const uniqueProducts = [...(data.productsLowStock || [])]
    .reduce((map, product) => {
      const existing = map.get(product.product_name);
      if (existing) {
        existing.min_quantity += product.min_quantity; // add to total
      } else {
        map.set(product.product_name, { ...product }); // start with first
      }
      return map;
    }, new Map());

  console.log(data);
  return (
    <>
      <div className="flex gap-8 items-stretch">
        <div className='w-3/5'>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-xl">Overview</h3>
            <div className="flex flex-nowrap gap-4">
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Product</h5>
                    <p className="font-bold">{data['totalProduct']}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faDollar} />
                  <div>
                    <h5 className="">Total Stock Value</h5>
                    <p className="font-bold">Rs {data['totalStockValue']}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Sales</h5>
                    <p className="font-bold">{data['totalSale']}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 rounded-lg p-2 border">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faBox} />
                  <div>
                    <h5 className="">Total Purchase</h5>
                    <p className="font-bold">{data['totalPurchase']}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Today's Sell Orders</h3>
              <Link className='rounded-lg bg-darkgreen text-white py-2 px-5' to='/dashboard/sales/orders'>Purchase Order</Link>

            </div>
            <div className="mt-5">
              <div className="overflow-x-auto  w-full">
                <table className="whitespace-nowrap w-full">
                  <thead>
                    <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                      <th className='py-2'>Product</th>
                      <th className='py-2'>Quantity</th>
                      <th className='py-2'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.recentSellOrders?.flatMap(order =>
                        order.order_items.map(item => (
                          <tr key={item.id} className="text-center">
                            <td className="py-2">{item.product.name}</td>
                            <td className="py-2">{item.quantity}</td>
                            <td className="py-2">Rs {(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='w-2/5'>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-3xl">Welcome, {user.name} </h3>

          </div>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-xl mb-3">Total Warehouse Capacity</h3>

            <div className="w-full bg-gray-300 h-3 rounded-sm mb-3">
              <div
                className="bg-darkgreen h-3 rounded-sm"
                style={{
                  width: `${(data.usedCapacity / data.totalCapacity) * 100
                    }%`
                }}
              ></div>
            </div>
            <p>
              {data.usedCapacity} / {data.totalCapacity} units
            </p>
          </div>
          <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white border border-[#E5E7EB] rounded-sm p-3 w-full mb-4">
            <h3 className="font-bold text-xl mb-3">Low Stock Product</h3>

            <div className="mt-5">
              <div className="overflow-x-auto  w-full">
                <table className="whitespace-nowrap w-full">
                  <thead>
                    <tr className='bg-[#E5E7EB] text-sm text-[#6B7280]'>
                      <th className='py-2'>Product</th>
                      <th className='py-2'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...uniqueProducts.values()].map(product => (
                      <tr key={product.product_id} className="text-center">
                        <td className="py-2">{product.product_name}</td>
                        <td className="py-2">{product.min_quantity}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>


  )
}

export default Home