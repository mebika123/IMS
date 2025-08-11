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
import ViewWarehousesProduct from "./routes/warehouses/ViewWarehouseProduct";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "login", element: <Login /> },
  // { path: "register", element: <Register /> },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },

      // Products
      { path: "products", element: <Product /> },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/edit/:id", element: <EditProduct /> },

      // Categories
      { path: "categories", element: <Categories /> },
      { path: "category/add", element: <AddCategory /> },
      { path: "category/edit/:id", element: <EditCategory /> },

      // Warehouses
      { path: "warehouses", element: <Warehouses /> },
      { path: "warehouse/add", element: <AddWarehouse /> },
      { path: "warehouse/edit/:id", element: <EditWarehouse /> },
      { path: "warehouse/view/product/:id", element: <ViewWarehousesProduct /> },

      // Customers
      { path: "customers", element: <Customers /> },
      { path: "customer/add", element: <AddCustomer /> },
      { path: "customer/edit/:id", element: <EditCustomer /> },

      // Vendors
      { path: "vendors", element: <Vendors /> },
      { path: "vendor/add", element: <AddVendor /> },
      { path: "vendor/edit/:id", element: <EditVendor /> },

      // Users
      { path: "users", element: <Users /> },
      { path: "user/add", element: <AddUser /> },
      { path: "user/edit/:id", element: <EditUser /> },

      // Orders
      { path: "sales/orders", element: <SellOrders /> },
      { path: "purchases/orders", element: <PurchaseOrders /> },
      { path: "sale/order/request", element: <RequestOrder type="saleOrder" /> },
      { path: "purchase/order/request", element: <RequestOrder type="purchaseOrder" /> }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
