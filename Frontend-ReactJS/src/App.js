
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Admin/Login";
import Register from "./Admin/Ragister";
import Sidebar from "./Admin/Sidebar";
import Index from "./components/Index";
import Products from "./components/Products";
import Main from "./Admin/Main";
import Users from "./Admin/Users";
import AdminProducts from "./Admin/AdminProducts";
import Units from "./Admin/Units";
import Categories from "./Admin/Categories";
import Customers from "./Admin/Customers";
import DUsers from "./Dashboard-btn-Page/DUsers";
import DCustomers from "./Dashboard-btn-Page/DCustomers";
import DProducts from "./Dashboard-btn-Page/DProducts";
import CRoutes from "./Admin/CRoutes";
import AssignCustomersRoutes from "./Admin/AssignCustomersRoutes";
import MyProfile from "./Admin/MyProfile";
import RouteCustomers from "./Admin/RoutesCustomers";
import RouteViseCustumers from "./Admin/RouteViseCustumers";


export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<Main />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<Customers />} />
          <Route path="units" element={<Units />} />
          <Route path="categories" element={<Categories />} />
          <Route path="routes" element={<CRoutes />} />
          <Route path="route-customers/:routeid" element={ <RouteCustomers /> }/>
          <Route path="assign-route-customers" element={ <AssignCustomersRoutes /> }/>
          <Route path="routes-vise-customers" element={ <RouteViseCustumers /> }/>
          <Route path="myprofile" element={<MyProfile/>}/>

          <Route path="user2" element={<DUsers />} />
          <Route path="customers2" element={<DCustomers />} />
          <Route path="products2" element={<DProducts />} />

        </Route>
      </Routes>
    </BrowserRouter>



  )
};


