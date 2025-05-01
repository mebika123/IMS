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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
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
        path: "product",
        element: <Product />
      },
      {
        path: "addproduct",
        element: <AddProduct />
      },
      {
        path: "editproduct",
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
      // customers page
      {
        path: "customers",
        element: <Customers />
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
        path: "editvendor",
        element: <EditVendor />
      },
      // users page
      {
        path: "Users",
        element: <Users />
      },
      {
        path: "adduser",
        element: <AddUser />
      },
      {
        path: "edituser",
        element: <EditUser />
      },
      // orders page
      {
        path: "sellorders",
        element: <SellOrders />
      },
      {
        path: "purchaseorder",
        element: <PurchaseOrders />
      },
      {
        path: "requestorder",
        element: <RequestOrder />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
