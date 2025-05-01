import { faBoxOpen, faCartArrowDown, faCartPlus, faCircleUser, faDolly, faHandHoldingDollar, faHouse, faPaste, faUsers, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className="md:w-1/6 max-sm:w-3/5   fixed max-md:top-0 shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)] h-screen flex justify-between flex-col bg-darkgreen transition-all duration-300 ease-in-out ">
            <div>
                <div className='flex justify-between items-center px-5 py-4 border-b border-b-lightgreen'>
                    <Link to="" className="flex items-center gap-4 text-white ">
                        <FontAwesomeIcon icon={faWarehouse} />
                        <h4 className="text-lg font-bold">Inventory Management</h4>
                    </Link>

                </div>
                <ul className='px-5 mt-5 text-white'>
                    <li>
                        <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="/dashboard">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Dashboard</span>
                        </Link>

                    </li>
                    <li>
                        <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="product">
                            <FontAwesomeIcon icon={faBoxOpen} />
                            <span>Product</span>
                        </Link>

                    </li>
                    <li>
                        <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="categories" >
                            <FontAwesomeIcon icon={faPaste} />
                            <span>Categories</span>
                        </Link>

                    </li>
                   
                </ul>
                <div className="px-5 text-white">
                    <p className="mb-2 text-sm ">Orders</p>
                    <ul className=''>
                    <li>
                        <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="categories">
                            <FontAwesomeIcon icon={faCartArrowDown} />
                            <span>Sell Orders</span>
                        </Link>

                    </li>
                    <li>
                        <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="categories">
                        <FontAwesomeIcon icon={faCartPlus} />
                            <span>Purchase Orders</span>
                        </Link>

                    </li>

                    </ul>

                </div>
                <div className="px-5 text-white">
                    <p className="mb-2 text-sm ">Parties</p>
                    <ul className=''>
                        <li>
                            <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="vendors">
                                <FontAwesomeIcon icon={faDolly} />
                                <span>Vendor</span></Link>
                        </li>
                        <li>
                            <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="customers">
                                <FontAwesomeIcon icon={faHandHoldingDollar} />
                                <span>Customers</span></Link>
                        </li>

                    </ul>

                </div>
                <div className="px-5 text-white">
                    <p className="mb-2 text-sm ">Users</p>
                    <ul className=''>
                        <li>
                            <Link className="flex gap-2 items-center mb-2 hover:bg-lightgreen transition duration-300 ease-in-out hover:text-darkgreen p-2 rounded-md" to="users">
                                <FontAwesomeIcon icon={faUsers} />
                                <span>Users</span></Link>
                        </li>
                    </ul>

                </div>
            </div>
            <div>
                <Link to="" className="flex items-center gap-4 px-5 py-4 border-t border-b-lightgreen text-white">
                    <div>
                        <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                    <div>
                        <span className='font-semibold'>user</span>
                        <p>user@gmail.com</p>
                    </div>
                </Link>
            </div>
        </aside>)
}

export default Sidebar