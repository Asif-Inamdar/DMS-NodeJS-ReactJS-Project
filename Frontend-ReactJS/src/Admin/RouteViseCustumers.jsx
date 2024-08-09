import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getHeaders from '../globalScripst';

const RouteViseCustomers = () => {
  let navigate = useNavigate();
  let [customerList, setCustomerList] = useState([]);
  let [customers, setCustomers] = useState([]);
  let [routes, setRoutes] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch route-wise customers
    axios.get(process.env.REACT_APP_BASE_URL + "routewisecustomers", getHeaders())
      .then((result) => {
        if (result.data.status === "success") {
          setCustomerList(result.data.data);
        } else {
          alert(result.data.data);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });

    // Fetch all customers
    axios.get(process.env.REACT_APP_BASE_URL + "customers", getHeaders())
      .then((result) => {
        if (result.data.status === "success") {
          setCustomers(result.data.data);
        } else {
          alert(result.data.data);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });

    // Fetch all routes
    axios.get(process.env.REACT_APP_BASE_URL + "routes", getHeaders())
      .then((result) => {
        if (result.data.status === "success") {
          setRoutes(result.data.data);
        } else {
          alert(result.data.data);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  // Function to get customer name by ID
  const getCustomerName = (customerId) => {
    const customer = customers.find(cust => cust.id === customerId);
    return customer ? customer.name : 'N/A';
  };

  // Function to get route name by ID
  const getRouteName = (routeId) => {
    const route = routes.find(route => route.id === routeId);
    return route ? route.name : 'N/A';
  };

  // Filter customers based on search term
  const filteredCustomers = customerList.filter(item => {
    const customerName = getCustomerName(item.customerid).toLowerCase();
    const routeName = getRouteName(item.routeid).toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return customerName.includes(searchLower) || routeName.includes(searchLower);
  });

  return (
    <div className='mt-5'>
      <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
        <span><Link to={"/admin"}>Admin</Link></span> / <span>Route-Assign-Customers</span>
      </p><br />
      <div className="row">
        <div className="col-sm-5 mb-4 mb-xl-0">
          <h4 className="font-weight-bold text-dark">Route-wise Customers</h4>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-3">
          <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i> Go Back</button>
          <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i className="fa-solid fa-arrow-rotate-right"></i></button>
        </div>
      </div>

      {/* Search bar */}
      <div class="wrapper">
                <div class="search">
                    <input type="text" placeholder="Search..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <div class="icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div> 

      <div className="row mt-5">
        <div className="col-lg-12">
          <table className="table table-stripped">
            <thead>
              <tr className='bg-primary text-center border'>
                <th scope="col">Sr.No</th>
                <th scope="col">Route Name</th>
                <th scope="col">Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredCustomers.map((item, i) => {
                  return (
                    <tr className='text-center border' key={item.id}>
                      <td scope="row">{i + 1}</td>
                      <td>{getRouteName(item.routeid)}</td>
                      <td>{getCustomerName(item.customerid)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RouteViseCustomers;
