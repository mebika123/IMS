import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import AddProduct from "./routes/product/AddProduct";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Product from "./routes/product/Product";
import EditProduct from "./routes/product/EditProduct";
import Categories from "./routes/categories/Categories";
import AddCategory from "./routes/categories/AddCategory";
import EditCategory from "./routes/categories/EditCategory";
import Customers from "./routes/customers/Customers";
import AddUser from "./routes/users/AddUser";
import Users from "./routes/users/Users";
import EditUser from "./routes/users/EditUser";
import Vendors from "./routes/vendors/Vendors";
import AddVendor from "./routes/vendors/AddVendor";
import EditVendor from "./routes/vendors/EditVendor";
import SellOrders from "./routes/orders/SellOrders";
import PurchaseOrders from "./routes/orders/PurchaseOrders";
import RequestOrder from "./routes/orders/RequestOrder";
import { AuthProvider } from "./context/AuthContext";
import AddCustomer from "./routes/customers/AddCustomer";
import EditCustomer from "./routes/customers/EditCustomer";
import Warehouses from "./routes/warehouses/Warehouses";
import AddWarehouse from "./routes/warehouses/AddWarehouse";
import EditWarehouse from "./routes/warehouses/EditWarehouse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "login",
    element: <Login />
  },
  // {
  //   path: "register",
  //   element: <Register />
  // },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      // product pages
      {
        path: "products",
        element: <Product />
      },
      {
        path: "addproduct",
        element: <AddProduct />
      },
      {
        path: "editproduct/:id",
        element: <EditProduct />
      },
      // categories page
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "addcategory",
        element: <AddCategory />
      },
      {
        path: "editcategory/:id",
        element: <EditCategory />
      },
      // categories page
      {
        path: "warehouses",
        element: <Warehouses/>
      },
      {
        path: "addWarehouse",
        element: <AddWarehouse/>
      },
      {
        path: "editwarehouse/:id",
        element: <EditWarehouse />
      },
      // customers page
      {
        path: "customers",
        element: <Customers />
      },
      
      {
        path: "addcustomer",
        element: <AddCustomer/>
      },
      {
        path: "editCustomer/:id",
        element: <EditCustomer />
      },
      // vendors page
      {
        path: "vendors",
        element: <Vendors />
      },
      {
        path: "addvendor",
        element: <AddVendor />
      },
      {
        path: "editvendor/:id",
        element: <EditVendor />
      },
      // users page
      {
        path: "users",
        element: <Users />
      },
      {
        path: "adduser",
        element: <AddUser />
      },
      {
        path: "edituser/:id",
        element: <EditUser />
      },
      // orders page
      {
        path: "salesorders",
        element: <SellOrders />
      },
      {
        path: "purchasesorders",
        element: <PurchaseOrders />
      },
      {
        path: "saleorderrequest",
        element: <RequestOrder type="saleOrder" />
      },
      {
        path: "purchaseorderrequest",
        element: <RequestOrder type="purchaseOrder" />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
